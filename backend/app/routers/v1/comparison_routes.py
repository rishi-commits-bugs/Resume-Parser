"""Routes for resume-job comparison operations"""
import os
import sys
from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse
from typing import List, Optional
from dotenv import load_dotenv

sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from app.services.parser_service import ParserService
from app.utils.helpers import format_match_score

load_dotenv()

router = APIRouter(
    prefix="/api/v1",
    tags=["comparison"],
    responses={404: {"description": "Not found"}},
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables")

parser_service = ParserService(GEMINI_API_KEY)

@router.post("/compare-resume-to-job")
async def compare_resume_to_job(
    resume_file: UploadFile = File(...),
    job_description: str = Form(...)
):
    """
    Compare a resume to a job description and provide match analysis

    - **resume_file**: PDF, DOCX, or TXT file containing the resume
    - **job_description**: Text of the job description
    """
    # Compare resume to job description
    comparison_result = await parser_service.compare_resume_to_job(resume_file, job_description)

    # Format the match score for display
    comparison_result['match_score'] = format_match_score(comparison_result['match_score'] / 100)

    return JSONResponse(content=comparison_result)
