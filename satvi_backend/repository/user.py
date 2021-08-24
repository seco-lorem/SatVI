from sqlalchemy.orm import Session
from jose import jwt
from fastapi import HTTPException, status
from passlib.context import CryptContext
from datetime import datetime, timedelta
import models, schemas


SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_cxt = CryptContext(schemes=["bcrypt"], deprecated="auto")


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#            Handles the user part of the application.            #
#   Assembled from various parts of one of this 4 hour tutorial   #
#   I followed, which I(seco) highly recommend:                   #
#                   https://www.youtube.com/watch?v=7t2alSnE2-I   #
#   Each function's name is explanatory                           #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


class Hash():
    def bcrypt(password: str):
        return pwd_cxt.hash(password)

    def verify(hashed_password,plain_password):
        return pwd_cxt.verify(plain_password,hashed_password)


def create(request: schemas.CreateUserInput, db: Session):
    new_user = models.User( name=request.name, email=request.email, password=Hash.bcrypt(request.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def login(email: str, password: str, db: Session):
    user = db.query(models.User).filter(models.User.email == email).first()
    if (not user) or (not Hash.verify(user.password, password)):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Invalid Credentials")

    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}