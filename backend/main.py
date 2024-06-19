from typing import List
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from model import Clothes, CartItem, User, data, users  

app = FastAPI()

cart: List[CartItem] = []

Users = []
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI"}

@app.get("/clothes/", response_model=List[Clothes])
async def load_clothes():
    return data

@app.get("/clothes/{id}", response_model=Clothes)
async def load_clothes_by_id(id: int):
    for item in data:
        if item.id == id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")

@app.put('/clothes/{id}', response_model=Clothes)
async def save_catalogue(id: int, updated_clothes: Clothes):
    for item in data:
        if item.id == id:
            item.name = updated_clothes.name
            item.description = updated_clothes.description
            item.url = updated_clothes.url
            item.price = updated_clothes.price
            return item
    raise HTTPException(status_code=404, detail="Item not found")

@app.post('/clothes/', response_model=Clothes)
async def add_clothes(new_clothes: Clothes):
    new_id = max(item.id for item in data) + 1 if data else 0
    new_clothes.id = new_id
    data.append(new_clothes)
    return new_clothes

@app.post("/cart/add/{id}")
async def add_to_cart(id: int, cart_item: CartItem):
    found_item = next((item for item in data if item.id == id), None)
    if not found_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    for existing_item in cart:
        if existing_item.id == id and existing_item.size == cart_item.size:
            existing_item.quantity += cart_item.quantity
            return {"message": "Item quantity updated", "cart": cart}
    
    cart.append(cart_item)
    return {"message": "Item added to cart", "cart_item": cart_item}

@app.post("/cart/add-item/{id}")
async def add_item_to_cart(id: int, cart_item: CartItem):
    found_item = next((item for item in data if item.id == id), None)
    if not found_item:
        raise HTTPException(status_code=404, detail="Item not found")

    cart.append(cart_item)
    return {"message": "Item added to cart", "cart_item": cart_item}

@app.get("/cart/items", response_model=List[CartItem])
async def get_cart_items():
    return cart

@app.delete("/cart/remove/{id}/{size}")
async def remove_from_cart(id: int, size: str):
    for item in cart:
        if item.id == id and item.size == size:
            cart.remove(item)
            return {"message": "Item removed from cart"}
    raise HTTPException(status_code=404, detail="Item not found in cart")

@app.get("/users/", response_model=List[User])
async def get_users():
    return users

@app.get("/users/{id}", response_model=User)
async def get_user_by_id(id: int):
    for user in users:
        if user.id == id:
            return user
    raise HTTPException(status_code=404, detail="User not found")

@app.post("/users/register", response_model=User)
async def register_user(user: User):
    for existing_user in users:
        if existing_user.email == user.email:
            raise HTTPException(status_code=404, detail= "Email already registered")
        
    user.id = max(u.id for u in users) + 1 if users else 1
    users.append(user)
    return user

@app.post("/users/login", response_model=User)
async def login_user(email:str= Body(...), password:str = Body(...)):
    for user in users:
        if user.email == email and user.password == password:
            return user

    raise HTTPException(status_code=404, detail="Invalid credentials")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
