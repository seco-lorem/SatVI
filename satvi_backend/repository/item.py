from sqlalchemy.orm import Session
import models, schemas


# Returns a boolean returning function that searches the given key, for filter()
def return_contains(search):
    def contains(s):
        return search.casefold() in s.title.casefold()
    return contains

# Will help resolve the query explained in main.Query.resolve_get_items
def get_items(db: Session, is_book, brand_new, free_delivery, search, max_price, min_price):

    queries = [models.Item.is_book == is_book, models.Item.price >= min_price]
    if brand_new:
        queries.append(models.Item.brand_new == brand_new)
    if free_delivery:
        queries.append(models.Item.free_delivery == free_delivery)
    if max_price > 0:
        queries.append(models.Item.price <= max_price)
    
    items = db.query(models.Item).filter(*queries).all()
    
    if search != "":
        return list(filter(return_contains(search), items))
    return items


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                             T O D O                             #
# Update and Delete functions                                     #
# For all those functions and create(),                           #
#   take token as an argument and verify it                       #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

def create(request: schemas.ItemModel, db: Session):
    print(request.image_link)
    new_item = models.Item(
        title=request.title,
        image_link=request.image_link,
        user_id=request.user_id,
        price=request.price,
        is_book=request.is_book,
        brand_new=request.brand_new,
        free_delivery=request.free_delivery)
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item
