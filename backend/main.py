from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

import uvicorn
from typing import Optional

from contextlib import asynccontextmanager
from db.db_manager import DatabaseManager
from auth.auth_utils import *


@asynccontextmanager
async def lifespan(app: FastAPI):
    await db_manager.connect()
    print("Database connected")
    yield
    await db_manager.close()
    print("Database disconnected")


app = FastAPI(lifespan=lifespan)
db_manager = DatabaseManager()


@app.get("/api/check-token")
async def check_token(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    scheme, _, token = authorization.partition(" ")
    
    if scheme.lower() != "bearer" or not token:
        raise HTTPException(status_code=401, detail="Invalid authentication scheme")

    user_id = verify_token(token)
    
    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    return {
        "data": "okay", 
        "user_id": user_id,
        "message": f"Welcome back, user {user_id}"
    }

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Твой фронт
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], # Важно для Authorization
)


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
