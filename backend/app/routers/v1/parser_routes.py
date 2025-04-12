"""Routes for resume parsing operations"""
import os
import sys
from fastapi import APIRouter, UploadFile, File, Form, BackgroundTasks
from fastapi.responses import JSONResponse
from typing import List, Optional
from dotenv import load_dotenv

sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from app.services.parser_service import ParserService
from app.utils.helpers import sanitize_response, format_match_score

load_dotenv()

router = APIRouter(
    prefix="/api/v1",
    tags=["parser"],
    responses={404: {"description": "Not found"}},
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables")

parser_service = ParserService(GEMINI_API_KEY)

@router.post("/parse-resume")
async def parse_resume(
    resume_file: UploadFile = File(...),
    include_summary: bool = Form(True)
):
    """
    Parse a resume file and extract structured information

    - **resume_file**: PDF, DOCX, or TXT file containing the resume
    - **include_summary**: Whether to include a summary in the response
    """
    result = await parser_service.parse_resume(resume_file, include_summary)

    sanitized_result = sanitize_response(result)

    return JSONResponse(content=sanitized_result)
