from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

import uvicorn

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)


