"""Service for resume parsing operations"""
import os
import sys
import tempfile
import shutil
from fastapi import UploadFile, HTTPException

# Add the root directory to the path for proper imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

# Import model - use absolute import from root directory
try:
    from model.parsers.resume_parser import ResumeParser
except ImportError:
    parent_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    model_path = os.path.join(parent_dir, "..")
    sys.path.append(model_path)
    from model.parsers.resume_parser import ResumeParser

class ParserService:
    """
    Service for handling resume parsing operations
    """

    def __init__(self, api_key):
        """
        Initialize the parser service

        Parameters:
        api_key (str): Gemini API key
        """
        self.resume_parser = ResumeParser(api_key)

    def get_allowed_file_extensions(self):
        """
        Get list of allowed file extensions

        Returns:
        list: List of allowed file extensions
        """
        return [".pdf", ".docx", ".txt"]

    def validate_file_extension(self, filename):
        """
        Validate if the file extension is supported

        Parameters:
        filename (str): Name of the uploaded file

        Returns:
        str: File extension

        Raises:
        HTTPException: If file type is not supported
        """
        allowed_extensions = self.get_allowed_file_extensions()
        file_ext = os.path.splitext(filename)[1].lower()

        if file_ext not in allowed_extensions:
            raise HTTPException(
                status_code=400,
                detail=f"File type not supported. Must be one of: {', '.join(allowed_extensions)}"
            )

        return file_ext

    async def extract_text_from_upload(self, file: UploadFile):
        """
        Extract text from an uploaded file

        Parameters:
        file (UploadFile): Uploaded file

        Returns:
        tuple: (text content, temp file path)

        Raises:
        HTTPException: If there's an error processing the file
        """
        # Validate file extension
        file_ext = self.validate_file_extension(file.filename)

        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix=file_ext) as temp_file:
                shutil.copyfileobj(file.file, temp_file)
                temp_path = temp_file.name

            text = self.resume_parser.extract_text_from_file(temp_path)

            return text, temp_path

        except Exception as e:
            if 'temp_path' in locals():
                try:
                    os.unlink(temp_path)
                except:
                    pass

            raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

    async def parse_resume(self, file: UploadFile, include_summary=True):
        """
        Parse a resume from an uploaded file

        Parameters:
        file (UploadFile): Uploaded resume file
        include_summary (bool): Whether to include summary in response

        Returns:
        dict: Parsed resume data
        """
        text, temp_path = await self.extract_text_from_upload(file)

        try:
            parsed_data = self.resume_parser.parse_resume(text, include_summary=include_summary)
            os.unlink(temp_path)

            return parsed_data

        except Exception as e:
            try:
                os.unlink(temp_path)
            except:
                pass

            raise HTTPException(status_code=500, detail=f"Error parsing resume: {str(e)}")

    async def compare_resume_to_job(self, file: UploadFile, job_description: str):
        """
        Compare a resume to a job description

        Parameters:
        file (UploadFile): Uploaded resume file
        job_description (str): Job description text

        Returns:
        dict: Comparison results
        """
        text, temp_path = await self.extract_text_from_upload(file)

        try:
            parsed_data = self.resume_parser.parse_resume(text)
            comparison_result = self.resume_parser.compare_resume_to_jd(parsed_data, job_description)
            os.unlink(temp_path)

            return comparison_result

        except Exception as e:
            try:
                os.unlink(temp_path)
            except:
                pass

            raise HTTPException(status_code=500, detail=f"Error comparing resume: {str(e)}")

    async def spell_check_resume(self, file: UploadFile):
        """
        Spell check a resume

        Parameters:
        file (UploadFile): Uploaded resume file

        Returns:
        dict: Spell check results
        """
        text, temp_path = await self.extract_text_from_upload(file)

        try:
            spell_check_result = self.resume_parser.spell_check_resume(text)
            os.unlink(temp_path)

            return spell_check_result

        except Exception as e:
            try:
                os.unlink(temp_path)
            except:
                pass

            raise HTTPException(status_code=500, detail=f"Error spell checking resume: {str(e)}")
