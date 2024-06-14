from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import Clothes, data  

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
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

@app.put('/catalogue/{id}', response_model=Clothes)
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
