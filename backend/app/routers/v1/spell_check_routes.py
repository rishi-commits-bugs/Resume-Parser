"""Routes for resume spell checking operations"""
import os
import sys
from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse
from typing import List, Optional
from dotenv import load_dotenv

sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from app.services.parser_service import ParserService

load_dotenv()

router = APIRouter(
    prefix="/api/v1",
    tags=["spell-check"],
    responses={404: {"description": "Not found"}},
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables")

parser_service = ParserService(GEMINI_API_KEY)

@router.post("/spell-check-resume")
async def spell_check_resume(
    resume_file: UploadFile = File(...)
):
    """
    Perform spell checking on a resume file and provide corrections and suggestions

    - **resume_file**: PDF, DOCX, or TXT file containing the resume
    """
    spell_check_result = await parser_service.spell_check_resume(resume_file)

    return JSONResponse(content=spell_check_result)
