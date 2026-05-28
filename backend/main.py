from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse # Важно для кастомных ошибок
from pydantic import BaseModel, Field
import uvicorn
from typing import Optional, Any
from contextlib import asynccontextmanager

from db.db_manager import DatabaseManager
from auth.auth_utils import *


db_manager = DatabaseManager()

@asynccontextmanager
async def lifespan(app: FastAPI):
    await db_manager.connect()
    print("Database connected")
    yield
    await db_manager.close()
    print("Database disconnected")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    name: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=3, max_length=72)

class RegisterRequest(LoginRequest):
    pass

class ApiResponse(BaseModel):
    data: Optional[Any] = None
    message: Optional[str] = None

class ProductResponse(BaseModel):
    id: int
    name: str
    description: str
    price: int

class ProductsListResponse(BaseModel):
    data: list[ProductResponse]
    message: Optional[str] = None




@app.post("/api/register", response_model=ApiResponse)
async def register(user: RegisterRequest):
    hashed_password = get_password_hash(user.password)
    
    try:
        user_id = await db_manager.insert(
            query="INSERT INTO users (name, password) VALUES (?, ?)",
            parameters=(user.name, hashed_password)
        )
    except Exception:
        raise HTTPException(status_code=409, detail="Username already taken")

    access_token = create_access_token(user_id=user_id)


    return {
        "data": {
            "access_token": access_token, 
            "token_type": "bearer",
            "user_id": user_id
        },
        "message": "Registration successful"
    }


@app.post("/api/login", response_model=ApiResponse)
async def login(user: LoginRequest):
    db_user = await db_manager.fetch_one(
        query="SELECT id, name, password FROM users WHERE name = ?",
        parameters=(user.name,),
    )

    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Incorrect username or password")

    access_token = create_access_token(user_id=db_user["id"])

    return {
        "data": {
            "access_token": access_token, 
            "token_type": "bearer"
        },
        "message": "Login successful"
    }


@app.get("/api/check-token", response_model=ApiResponse)
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
        "data": {
            "user_id": user_id,
            "is_valid": True
        },
        "message": f"Welcome back, user {user_id}"
    }

@app.get("/api/products", response_model=ProductsListResponse)
async def get_products():
    """Получить список всех товаров"""
    products = await db_manager.fetch_all(
        query="SELECT id, name, description, price FROM goods ORDER BY id"
    )
    
    return ProductsListResponse(
        data=[ProductResponse(**p) for p in products],
        message="Products retrieved successfully"
    )


@app.get("/api/products/{product_id}", response_model=ApiResponse)
async def get_product(product_id: int):
    """Получить товар по ID"""
    product = await db_manager.fetch_one(
        query="SELECT id, name, description, price FROM goods WHERE id = ?",
        parameters=(product_id,)
    )
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return ApiResponse(
        data=ProductResponse(**product),
        message="Product retrieved successfully"
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail}
    )

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
