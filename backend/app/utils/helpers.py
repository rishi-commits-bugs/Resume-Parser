import json
import os
from typing import Dict, Any, List

def sanitize_response(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Sanitize and validate the response from the resume parser
    to ensure it matches the expected structure
    """
    expected_structure = {
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

    result = json.loads(json.dumps(expected_structure))

    for key in expected_structure:
        if key in data:
            if isinstance(expected_structure[key], dict):
                if isinstance(data[key], dict):
                    for subkey in expected_structure[key]:
                        if subkey in data[key]:
                            result[key][subkey] = data[key][subkey]
            else:
                result[key] = data[key]

    return result

def format_match_score(score: float) -> str:
    """
    Format a match score (0-1) as a percentage with color indicator
    """
    percentage = round(score * 100)

    if percentage >= 80:
        return f"{percentage}% match"
    elif percentage >= 60:
        return f"{percentage}% match"
    else:
        return f"{percentage}% match"

def get_allowed_extensions() -> List[str]:
    """
    Get list of allowed file extensions for resume uploads
    """
    return [".pdf", ".docx", ".txt"]
