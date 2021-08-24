from fastapi import FastAPI
import graphene
from graphql import GraphQLError
from starlette.graphql import GraphQLApp
from fastapi.middleware.cors import CORSMiddleware
import models, database, schemas
from repository import user, item


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                          Q U E R I E S                          #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

class Query(graphene.ObjectType):
    get_items = graphene.List(schemas.ItemModel,
        is_book=graphene.Boolean(default_value=True),       # Will filter out trues if false, falses if true
        brand_new=graphene.Boolean(default_value=False),    # Will not filter out trues if false, will filter out falses if true
        free_delivery=graphene.Boolean(default_value=False),
        search=graphene.String(default_value=""),
        max_price=graphene.Int(default_value=-1),           # self exp.
        min_price=graphene.Int(default_value=-1)            # Will not be taken into account if negative
    )

    # Returns all items in the db that satisfy criterion. Arguments are explained above
    def resolve_get_items(self, info, is_book, brand_new, free_delivery, search, max_price, min_price):
        return item.get_items(next(database.get_db()), is_book, brand_new, free_delivery, search, max_price, min_price)


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                        M U T A T I O N S                        #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# Creates a user from given credentials in the database.
# Will save name as first section of email if not provided.
class CreateUser(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=False)
        email = graphene.String(required=True)
        password = graphene.String(required=True)
    
    success = graphene.Boolean(default_value=False)

    @staticmethod
    def mutate(root, info, name, email, password):
        if not name:
            name = ""
            for x in email:
                if x == '@':
                    break
                name += x
        input = schemas.CreateUserInput(
            name=name,
            email=email,
            password=password
        )
        user.create(request=input, db=next(database.get_db()))
        return CreateUser(success=True)


# Returns the token as a string according to the credentials
# Raises a GraphQL error if invalid credentials
class TokenAuth(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)
    
    token = graphene.String()

    @staticmethod
    def mutate(root, info, email, password):
        try:
            token = user.login(email=email, password=password, db=next(database.get_db()))
        except Exception as e:
            raise GraphQLError(e.detail)
        return TokenAuth(token=token)


# Creates an item for sale in the database.
# an example png_link: https://i.hizliresim.com/rcd2lr8.png
# Rest of the arguments are self explanatory
class CreateItem(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        png_link = graphene.String(required=False)
        user_id = graphene.Int(required=False)
        price = graphene.Int(required=False)
        is_book = graphene.Boolean(required=False)
        brand_new = graphene.Boolean(required=False)
        free_delivery = graphene.Boolean(required=False)
    
    success = graphene.Boolean(default_value=False)

    @staticmethod
    def mutate(root, info, title, png_link = "https://i.hizliresim.com/rcd2lr8.png", user_id = 1, price = 0, is_book = False, brand_new = False, free_delivery = False):
        item.create(schemas.ItemModel(
            title=title,
            image_link=png_link,
            user_id=user_id,
            price=price,
            is_book=is_book,
            brand_new=brand_new,
            free_delivery=free_delivery
        ), db=next(database.get_db()))
        return CreateItem(success=True)

class Mutation(graphene.ObjectType):
    tokenAuth = TokenAuth.Field()
    createUser = CreateUser.Field()
    createItem = CreateItem.Field()


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                          R U N   A P P                          #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

app = FastAPI()

origins = [
    "https://satvi.yektaseckinsatir.com",
    "https://satvi-frontend.web.app",
    "https://satvi-frontend.firebaseapp.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_route("/graphql", GraphQLApp(schema=graphene.Schema(query=Query, mutation=Mutation)))

models.Base.metadata.create_all(database.engine)
