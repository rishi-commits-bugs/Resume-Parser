import pandas as pd
from model.extractors.text_extractor import TextExtractor
from model.helpers.gemini_client import GeminiClient
from model.analyzers.spell_checker import SpellChecker
from model.analyzers.job_matcher import JobMatcher


class ResumeParser:
    def __init__(self, gemini_api_key):
        """
        Initialize the ResumeParser with Gemini API integration
        
        Parameters:
        gemini_api_key (str): Your Gemini API key from Google AI Studio
        """
        self.gemini_client = GeminiClient(gemini_api_key)
        self.spell_checker = SpellChecker(self.gemini_client)
        self.job_matcher = JobMatcher(self.gemini_client)
        
        # Default structure for extracted data
        self.extracted_data = {
            'contact_info': {
                'name': None,
                'email': None,
                'phone': None,
                'location': None,
                'linkedin': None,
                'github': None,
                'portfolio': None
            },
            'education': [],
            'work_experience': [],
            'skills': {
                'technical': [],
                'soft': [],
                'languages': [],
                'tools': []
            },
            'projects': [],
            'certifications': [],
            'publications': [],
            'summary': None
        }
    
    def extract_text_from_file(self, file_path):
        """
        Extract text from file based on its extension
        
        Parameters:
        file_path (str): Path to the file
        
        Returns:
        str: Extracted text content
        """
        return TextExtractor.extract_text_from_file(file_path)

    def extract_text_from_uploaded_file(self, uploaded_file, filename=None):
        """
        Extract text from uploaded file
        
        Parameters:
        uploaded_file: The file content (could be bytes or file-like object)
        filename: Optional filename if not available in uploaded_file
        
        Returns:
        str: Extracted text content
        """
        return TextExtractor.extract_text_from_uploaded_file(uploaded_file, filename)

    def parse_resume(self, text, include_summary=True):
        """
        Parse resume text using Gemini API
        
        Parameters:
        text (str): The resume text content
        include_summary (bool): Whether to include summary in output
        
        Returns:
        dict: Structured resume data
        """
        try:
            # Customize prompt 
            prompt = f"""You are a professional resume parser that extracts detailed and accurate information from resumes. Focus especially on extracting contact information, education, and skills.

Extract the following information from this resume and provide it in JSON format:

1. contact_info:
   - name: Full name of the person (IMPORTANT)
   - email: Email address (IMPORTANT)
   - phone: Phone number (IMPORTANT)
   - location: City/state/country

2. education: List of dictionaries with (IMPORTANT SECTION):
   - institution: Name of university/college/school (REQUIRED)
   - degree: Degree name or program
   - dates: Date range or graduation date
   - gpa: GPA if available

3. skills (IMPORTANT SECTION):
   - technical: List of ALL programming languages, frameworks, software proficiencies, etc. 
   - soft: List of soft skills like leadership, communication
   - languages: List of spoken/written languages
   - tools: List of software tools and platforms

4. work_experience: List of dictionaries with:
   - company: Company name
   - job_title: Position title
   - dates: Employment period
   - responsibilities: List of job responsibilities/achievements

5. projects: List of dictionaries with:
   - name: Project name
   - technologies: List of technologies used
   - description: Brief description of the project

6. certifications: List of dictionaries with:
   - name: Certification name
   - issuer: Issuing organization
   - date: Date of certification

Ensure your data extraction is thorough and accurate. EVEN IF the resume is brief or limited, extract every piece of information available. The output should be ONLY a valid JSON object with the structure above.

Resume text:
{text}
"""

            # Get response from Gemini
            extracted_data = self.gemini_client.generate_response(prompt)
            
            # Update our standard structure with the extracted data
            self.extracted_data = {
                'contact_info': extracted_data.get('contact_info', {
                    'name': None,
                    'email': None,
                    'phone': None,
                    'location': None,
                    'linkedin': None,
                    'github': None,
                    'portfolio': None
                }),
                'education': extracted_data.get('education', []),
                'work_experience': extracted_data.get('work_experience', []),
                'skills': extracted_data.get('skills', {
                    'technical': [],
                    'soft': [],
                    'languages': [],
                    'tools': []
                }),
                'projects': extracted_data.get('projects', []),
                'certifications': extracted_data.get('certifications', []),
                'publications': extracted_data.get('publications', [])
            }
            
            # Only include summary if requested
            if include_summary:
                self.extracted_data['summary'] = extracted_data.get('summary', None)
            else:
                self.extracted_data.pop('summary', None)
            
            return self.extracted_data
            
        except Exception as e:
            print(f"Error parsing resume with Gemini: {str(e)}")
            
            # Return empty structure if parsing fails
            default_structure = {
                'contact_info': {
                    'name': None,
                    'email': None,
                    'phone': None,
                    'location': None,
                    'linkedin': None,
                    'github': None,
                    'portfolio': None
                },
                'education': [],
                'work_experience': [],
                'skills': {
                    'technical': [],
                    'soft': [],
                    'languages': [],
                    'tools': []
                },
                'projects': [],
                'certifications': [],
                'publications': []
            }
            
            if include_summary:
                default_structure['summary'] = None
                
            return default_structure

    def parse_resume_from_file(self, file_path, include_summary=True):
        """Parse resume from a file path"""
        text = self.extract_text_from_file(file_path)
        return self.parse_resume(text, include_summary)
        
    def parse_resume_from_uploaded_file(self, uploaded_file, filename=None, include_summary=True):
        """
        Parse resume from an uploaded file
        
        Parameters:
        uploaded_file: The file content (could be bytes or file-like object)
        filename: Optional filename if not available in uploaded_file
        include_summary: Whether to include summary in output (default: True)
        
        Returns:
        dict: Structured resume data
        """
        text = self.extract_text_from_uploaded_file(uploaded_file, filename)
        return self.parse_resume(text, include_summary)

    def to_dataframe(self, parsed_data):
        """
        Convert parsed resume data to pandas DataFrames for analysis
        
        Parameters:
        parsed_data (dict): The parsed resume data
        
        Returns:
        dict: Dictionary of DataFrames for different sections
        """
        dataframes = {}
        
        # Contact info DataFrame
        dataframes['contact_info'] = pd.DataFrame([parsed_data['contact_info']])
        
        # Education DataFrame
        if parsed_data['education']:
            dataframes['education'] = pd.DataFrame(parsed_data['education'])
        else:
            dataframes['education'] = pd.DataFrame(columns=['institution', 'degree', 'dates', 'gpa'])
        
        # Work experience DataFrame
        if parsed_data['work_experience']:
            dataframes['work_experience'] = pd.DataFrame(parsed_data['work_experience'])
        else:
            dataframes['work_experience'] = pd.DataFrame(columns=['company', 'job_title', 'dates', 'responsibilities'])
        
        # Skills DataFrame - flatten the skills dictionary
        skills_data = []
        for skill_type, skills in parsed_data['skills'].items():
            for skill in skills:
                skills_data.append({'type': skill_type, 'skill': skill})
        
        if skills_data:
            dataframes['skills'] = pd.DataFrame(skills_data)
        else:
            dataframes['skills'] = pd.DataFrame(columns=['type', 'skill'])
        
        # Projects DataFrame
        if parsed_data['projects']:
            dataframes['projects'] = pd.DataFrame(parsed_data['projects'])
        else:
            dataframes['projects'] = pd.DataFrame(columns=['name', 'technologies', 'description'])
        
        # Certifications DataFrame
        if parsed_data['certifications']:
            dataframes['certifications'] = pd.DataFrame(parsed_data['certifications'])
        else:
            dataframes['certifications'] = pd.DataFrame(columns=['name', 'issuer', 'date'])
        
        # Publications DataFrame
        if parsed_data['publications']:
            dataframes['publications'] = pd.DataFrame(parsed_data['publications'])
        else:
            dataframes['publications'] = pd.DataFrame(columns=['title', 'authors', 'venue', 'date', 'url'])
        
        return dataframes

    def spell_check_resume(self, resume_text):
        """
        Perform spell checking on resume text
        
        Parameters:
        resume_text (str): The raw resume text
        
        Returns:
        dict: Spell check results
        """
        return self.spell_checker.check_spelling(resume_text)
    
    def compare_resume_to_jd(self, resume_data, job_description):
        """
        Compare resume to job description
        
        Parameters:
        resume_data (dict): Parsed resume data
        job_description (str): Job description text
        
        Returns:
        dict: Comparison results with match score, matches, gaps, and recommendations
        """
        return self.job_matcher.compare_resume_to_job(resume_data, job_description)
        
    def calculate_resume_quality_score(self, resume_data, raw_text=None):
        """
        Calculate an overall quality score for a resume
        
        Parameters:
        resume_data (dict): The parsed resume data
        raw_text (str): Optional raw resume text for spell checking
        
        Returns:
        dict: Quality metrics and improvement suggestions
        """
        metrics = {}
        suggestions = []
        
        # Check completeness
        completeness_score = 0
        total_checks = 0
        
        # Contact info checks
        for field in ['name', 'email', 'phone']:
            total_checks += 1
            if resume_data['contact_info'].get(field):
                completeness_score += 1
            else:
                suggestions.append(f"Add your {field} to the contact information section")
        
        # Education check
        total_checks += 1
        if resume_data.get('education') and len(resume_data['education']) > 0:
            completeness_score += 1
        else:
            suggestions.append("Add your educational background to strengthen your resume")
        
        # Skills check
        total_checks += 1
        if resume_data.get('skills', {}).get('technical') and len(resume_data['skills']['technical']) > 0:
            completeness_score += 1
        else:
            suggestions.append("List your technical skills to showcase your capabilities")
        
        # Experience check
        total_checks += 1
        if resume_data.get('work_experience') and len(resume_data['work_experience']) > 0:
            completeness_score += 1
        else:
            suggestions.append("Include your work experience with detailed responsibilities")
        
        # Calculate completeness percentage
        completeness_percentage = round((completeness_score / total_checks) * 100)
        metrics['completeness'] = completeness_percentage
        
        # Spell check if raw text is provided
        if raw_text:
            spell_check_results = self.spell_check_resume(raw_text)
            metrics['spelling_errors'] = spell_check_results['summary']['total_errors']
            metrics['spelling_severity'] = spell_check_results['summary']['severity']
            
            # Store detailed spelling errors for display
            metrics['spelling_details'] = spell_check_results.get('errors', [])
            
            if spell_check_results['summary']['total_errors'] > 0:
                suggestions.append(spell_check_results['summary']['improvement_recommendation'])
        
        # AI-generated quality assessment
        try:
            prompt = f"""Analyze this resume data and provide a brief quality assessment with 2-3 specific improvement suggestions:

            Contact Info: {resume_data['contact_info']}
            Education: {resume_data['education']}
            Skills: {resume_data['skills']}
            Experience: {resume_data['work_experience']}
            Projects: {resume_data['projects']}

            Focus on structure, content completeness, and professional presentation.
            """
            
            response = self.gemini_client.model.generate_content(prompt)
            ai_assessment = response.text
            
            # Extract additional suggestions
            ai_suggestions = [line.strip() for line in ai_assessment.split('\n') if line.strip() and not line.strip().lower().startswith(('quality', 'assessment', 'analysis', 'overall'))]
            suggestions.extend(ai_suggestions[:3])  # Add up to 3 AI suggestions
            
            # Calculate overall score (weighted)
            overall_score = completeness_percentage
            if 'spelling_errors' in metrics:
                # Adjust score based on spelling errors
                spelling_penalty = min(30, metrics['spelling_errors'] * 3)  # Cap at 30% deduction
                overall_score = max(0, overall_score - spelling_penalty)
            
            metrics['overall_score'] = overall_score
            
            # Add quality rating
            if overall_score >= 90:
                metrics['quality_rating'] = "Excellent"
            elif overall_score >= 75:
                metrics['quality_rating'] = "Good"
            elif overall_score >= 60:
                metrics['quality_rating'] = "Average"
            else:
                metrics['quality_rating'] = "Needs Improvement"
            
            return {
                'metrics': metrics,
                'suggestions': suggestions,
                'assessment': ai_assessment
            }
            
        except Exception as e:
            metrics['overall_score'] = completeness_percentage
            return {
                'metrics': metrics,
                'suggestions': suggestions,
                'assessment': f"Error generating AI assessment: {str(e)}"
            } 