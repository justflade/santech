from config import SECRET_KEY

import jwt
import datetime


def create_token(user_id):
    expiration_time = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(
        seconds=604_800
    )  # week
    token = jwt.encode(
        {"user_id": user_id, "exp": expiration_time}, SECRET_KEY, algorithm="HS256"
    )
    return token


def verify_token(token):
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decoded["user_id"]
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None
