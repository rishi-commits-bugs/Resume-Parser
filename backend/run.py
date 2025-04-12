import os
import uvicorn
from dotenv import load_dotenv

load_dotenv()

if __name__ == "__main__":
    host = os.getenv("API_HOST", "0.0.0.0")
    port = int(os.getenv("API_PORT", 8000))

    print(f"Starting Resume Parser API on {host}:{port}")
    uvicorn.run("app.main:app", host=host, port=port, reload=True)
