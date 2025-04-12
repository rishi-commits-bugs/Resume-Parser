"""Gemini API client wrapper for the resume parser"""
import re
import json
import google.generativeai as genai


class GeminiClient:
    """
    Client for the Google Gemini API
    """
    
    def __init__(self, api_key):
        """
        Initialize the Gemini client with API key
        
        Parameters:
        api_key (str): Your Gemini API key from Google AI Studio
        """
        self.api_key = api_key
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel(model_name="gemini-2.0-flash")
    
    def generate_response(self, prompt):
        """
        Generate a response from the Gemini model
        
        Parameters:
        prompt (str): Prompt to send to the model
        
        Returns:
        dict: Extracted data as a dictionary
        """
        try:
            response = self.model.generate_content(prompt)
            response_text = response.text
            
            # Clean response if needed
            if "```json" in response_text:
                match = re.search(r"```json\n(.*?)\n```", response_text, re.DOTALL)
                if match:
                    response_text = match.group(1)
            elif "```" in response_text:
                match = re.search(r"```\n(.*?)\n```", response_text, re.DOTALL)
                if match:
                    response_text = match.group(1)
            
            # Parse JSON
            return json.loads(response_text)
        except Exception as e:
            raise Exception(f"Error generating response from Gemini: {str(e)}") 