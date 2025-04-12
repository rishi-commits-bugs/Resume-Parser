import os
import sys
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.routers.v1 import parser_routes, comparison_routes, spell_check_routes

load_dotenv()

app = FastAPI(
    title="Resume Parser API",
    description="API for parsing and analyzing resumes using AI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(parser_routes.router)
app.include_router(comparison_routes.router)
app.include_router(spell_check_routes.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Resume Parser API. Go to /docs for API documentation."}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    # Use 0.0.0.0 to bind to all network interfaces, making it accessible on the network
    host = os.getenv("API_HOST", "0.0.0.0")
    port = int(os.getenv("API_PORT", 8000))
    print(f"Server running on http://{host}:{port}")
    print(f"API documentation available at http://{host}:{port}/docs")
    uvicorn.run("app.main:app", host=host, port=port, reload=True)
