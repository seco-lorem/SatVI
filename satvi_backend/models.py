from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#   Models for the Database.                                      #
#   Each class is a table and their properties are columns        #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

class Item(Base):
    __tablename__ = 'items'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    image_link = Column(String)                             # Should be stored as .png link
    price = Column(Integer)
    is_book = Column(Boolean)
    brand_new = Column(Boolean)
    free_delivery = Column(Boolean)

    user_id = Column(Integer, ForeignKey('users.id'))       # Each Item should be created&moderated by a user
    time_created = Column(DateTime(timezone=True), server_default=func.now())

    creator = relationship("User", back_populates="items")


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    password = Column(String)   # Will be stored in hashed form

    items = relationship('Item', back_populates="creator")
