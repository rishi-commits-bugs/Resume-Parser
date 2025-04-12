"""Resume to job description comparison functionality"""
import re


class JobMatcher:
    """
    Compare a resume to a job description to evaluate match quality
    """
    
    def __init__(self, gemini_client):
        """
        Initialize the JobMatcher
        
        Parameters:
        gemini_client (GeminiClient): Initialized Gemini client for AI operations
        """
        self.gemini_client = gemini_client
    
    def compare_resume_to_job(self, resume_data, job_description_text):
        """
        Compare a parsed resume to a job description and provide a match score with recommendations
        
        Parameters:
        resume_data (dict): The parsed resume data
        job_description_text (str): The job description text
        
        Returns:
        dict: Matching score, skill matches/gaps, and recommendations
        """
        # Extract skills from job description using Gemini
        prompt = f"""Extract ALL required skills and qualifications from this job description. 
        Categorize them as:
        1. Technical skills: Programming languages, frameworks, technologies
        2. Soft skills: Communication, teamwork, etc.
        3. Education requirements: Degrees, certifications
        4. Experience requirements: Years of experience, specific roles
        
        Output ONLY a valid JSON with this exact structure:
        {{
            "technical_skills": ["skill1", "skill2", ...],
            "soft_skills": ["skill1", "skill2", ...],
            "education_requirements": ["requirement1", "requirement2", ...],
            "experience_requirements": ["requirement1", "requirement2", ...]
        }}
        
        Be thorough and specific.
        
        Job Description:
        {job_description_text}
        """
        
        try:
            jd_requirements = self.gemini_client.generate_response(prompt)
            
            # Ensure all required keys exist
            for key in ["technical_skills", "soft_skills", "education_requirements", "experience_requirements"]:
                if key not in jd_requirements:
                    jd_requirements[key] = []
            
            # Compare resume skills to job requirements
            technical_matches = []
            technical_gaps = []
            soft_matches = []
            soft_gaps = []
            education_matches = []
            education_gaps = []
            experience_matches = []
            experience_gaps = []
            
            # Technical skills comparison - make case insensitive
            resume_technical = [skill.lower() for skill in resume_data['skills'].get('technical', [])]
            jd_technical = [skill.lower() for skill in jd_requirements.get('technical_skills', [])]
            
            for skill in jd_technical:
                if any(skill in rt.lower() for rt in resume_technical):
                    technical_matches.append(skill)
                else:
                    technical_gaps.append(skill)
            
            # Soft skills comparison - make case insensitive
            resume_soft = [skill.lower() for skill in resume_data['skills'].get('soft', [])]
            jd_soft = [skill.lower() for skill in jd_requirements.get('soft_skills', [])]
            
            for skill in jd_soft:
                if any(skill in rs.lower() for rs in resume_soft):
                    soft_matches.append(skill)
                else:
                    soft_gaps.append(skill)
            
            # Education comparison
            education_reqs = jd_requirements.get('education_requirements', [])
            
            for req in education_reqs:
                req_lower = req.lower()
                found = False
                for edu in resume_data.get('education', []):
                    degree = edu.get('degree', '').lower()
                    if req_lower in degree or any(word in degree for word in req_lower.split()):
                        education_matches.append(req)
                        found = True
                        break
                if not found:
                    education_gaps.append(req)
            
            # Experience comparison
            experience_reqs = jd_requirements.get('experience_requirements', [])
            
            for req in experience_reqs:
                req_lower = req.lower()
                found = False
                for exp in resume_data.get('work_experience', []):
                    title = exp.get('job_title', '').lower()
                    resp = ' '.join(exp.get('responsibilities', [])).lower() if isinstance(exp.get('responsibilities'), list) else ''
                    if req_lower in title or req_lower in resp:
                        experience_matches.append(req)
                        found = True
                        break
                if not found:
                    experience_gaps.append(req)
            
            # Calculate match score (weighted)
            total_req_skills = len(jd_technical) + len(jd_soft) + len(education_reqs) + len(experience_reqs)
            
            if total_req_skills == 0:
                match_score = 0
            else:
                total_matches = len(technical_matches) + len(soft_matches) + len(education_matches) + len(experience_matches)
                match_score = round((total_matches / total_req_skills) * 100)
            
            # Generate recommendations
            recommendations = []
            
            if technical_gaps:
                recommendations.append(f"Add these technical skills to your resume: {', '.join(technical_gaps)}")
            
            if soft_gaps:
                recommendations.append(f"Highlight these soft skills if you have them: {', '.join(soft_gaps)}")
            
            if education_gaps:
                recommendations.append(f"Consider addressing these education requirements: {', '.join(education_gaps)}")
            
            if experience_gaps:
                recommendations.append(f"Emphasize experience related to: {', '.join(experience_gaps)}")
            
            # Enhance recommendations with Gemini if there are gaps
            if technical_gaps or soft_gaps or education_gaps or experience_gaps:
                try:
                    ai_prompt = f"""Based on the following resume and job description gaps, provide 3 specific, actionable recommendations to improve the resume:

                    Job Description Gaps:
                    Technical Skills Gaps: {technical_gaps}
                    Soft Skills Gaps: {soft_gaps}
                    Education Gaps: {education_gaps}
                    Experience Gaps: {experience_gaps}
                    
                    Current Match Score: {match_score}%
                    
                    Give 3 specific suggestions to improve the resume for this job.
                    """
                    
                    ai_response = self.gemini_client.model.generate_content(ai_prompt)
                    enhanced_recommendations = [line.strip() for line in ai_response.text.split('\n') if line.strip() and not line.strip().startswith(('1.', '2.', '3.'))]
                    if enhanced_recommendations:
                        recommendations.extend(enhanced_recommendations[:3])
                except Exception as e:
                    pass
            
            # Return the results
            return {
                'match_score': match_score,
                'matches': {
                    'technical': technical_matches,
                    'soft': soft_matches,
                    'education': education_matches,
                    'experience': experience_matches
                },
                'gaps': {
                    'technical': technical_gaps,
                    'soft': soft_gaps,
                    'education': education_gaps,
                    'experience': experience_gaps
                },
                'recommendations': recommendations
            }
            
        except Exception as e:
            return {
                'match_score': 0,
                'matches': {'technical': [], 'soft': [], 'education': [], 'experience': []},
                'gaps': {'technical': [], 'soft': [], 'education': [], 'experience': []},
                'recommendations': [f"Error processing comparison: {str(e)}"]
            } 