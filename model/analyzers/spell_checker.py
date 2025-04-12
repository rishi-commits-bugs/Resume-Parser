"""Resume spell checking functionality"""


class SpellChecker:
    """
    Perform spell checking on resume text
    """
    
    def __init__(self, gemini_client):
        """
        Initialize the SpellChecker
        
        Parameters:
        gemini_client (GeminiClient): Initialized Gemini client for AI operations
        """
        self.gemini_client = gemini_client
    
    def check_spelling(self, resume_text):
        """
        Perform spell checking on resume text and suggest corrections
        
        Parameters:
        resume_text (str): The raw resume text
        
        Returns:
        dict: Dictionary containing spelling errors and suggestions
        """
        try:
            prompt = f"""Perform a detailed spell check on the following resume text. 
            Identify any spelling errors, grammatical mistakes, or awkward phrasing.
            For each identified issue:
            1. Provide the incorrect text
            2. Suggest the correct version
            3. Explain why it's incorrect (briefly)
            
            Format your response as a JSON with this structure:
            {{
                "errors": [
                    {{
                        "error_text": "incorrect word or phrase",
                        "suggestion": "corrected version",
                        "explanation": "brief explanation"
                    }}
                ]
            }}
            
            Only include actual errors - ignore formatting issues or style preferences.
            Output ONLY the JSON.
            
            Resume Text:
            {resume_text}
            """
            
            spelling_results = self.gemini_client.generate_response(prompt)
            
            # Add a summary section
            if spelling_results.get('errors'):
                num_errors = len(spelling_results['errors'])
                severity = "high" if num_errors > 10 else "medium" if num_errors > 5 else "low"
                spelling_results['summary'] = {
                    'total_errors': num_errors,
                    'severity': severity,
                    'improvement_recommendation': f"Correcting these {num_errors} issues will improve your resume's professionalism."
                }
            else:
                spelling_results['summary'] = {
                    'total_errors': 0,
                    'severity': "none",
                    'improvement_recommendation': "No spelling or grammar issues detected. Your resume appears well-written."
                }
            
            return spelling_results
            
        except Exception as e:
            return {
                'errors': [],
                'summary': {
                    'total_errors': 0,
                    'severity': "unknown",
                    'improvement_recommendation': f"Error performing spell check: {str(e)}"
                }
            }
    
    def format_results(self, spell_check_results):
        """
        Format spell check results in a readable format
        
        Parameters:
        spell_check_results (dict): The results from check_spelling method
        
        Returns:
        str: Formatted string of spelling errors and corrections
        """
        if not spell_check_results.get('errors'):
            return "No spelling or grammar issues detected. Your resume appears well-written."
        
        output = f"Found {spell_check_results['summary']['total_errors']} spelling/grammar issues:\n\n"
        
        for i, error in enumerate(spell_check_results['errors'], 1):
            output += f"{i}. Error: \"{error['error_text']}\"\n"
            output += f"   Suggestion: \"{error['suggestion']}\"\n"
            output += f"   Explanation: {error['explanation']}\n\n"
        
        output += f"Severity: {spell_check_results['summary']['severity'].title()}\n"
        output += f"Recommendation: {spell_check_results['summary']['improvement_recommendation']}"
        
        return output 