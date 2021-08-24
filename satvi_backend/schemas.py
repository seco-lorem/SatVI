from graphene_sqlalchemy import SQLAlchemyObjectType
from models import Item, User


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#   Are used for defining types in GraphQL                        #
#   see: https://github.com/graphql-python/graphene-sqlalchemy    #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

class ItemModel(SQLAlchemyObjectType):
    class Meta:
        model = Item


class CreateUserInput(SQLAlchemyObjectType):
    class Meta:
        model = User
