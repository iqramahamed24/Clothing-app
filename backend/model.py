from pydantic import BaseModel
from typing import List

class Clothes(BaseModel):
    id: int
    name: str
    description: str
    url: str
    price: float
    quantity: int = 0


data = [
    Clothes(id= 0, name="Ruffled Abaya", description= "A baby pink Abaya that is perfect to stand out.", url="https://i.ibb.co/wrhZprQ/abaya1.jpg", price=2500),
    Clothes(id = 1,name="Linen Abaya", description="A flowy Abaya with the perfect material.", url="https://i.ibb.co/JqPwYSt/Linen.jpg",price=3000),
    Clothes(id = 2, name="Chiffon Abaya", description="The perfect Abaya for everyday fashion.", url="https://i.ibb.co/phQGGsp/Chiffon.jpg",price=1500),
    Clothes(id = 3,name="Bling Abaya", description="A bedazzling Abaya for celebrations.", url="https://i.ibb.co/DYv2rT9/abaya18.jpg",price=6000),
    Clothes(id = 4,name="Sequin Abaya", description="Open blue Abaya that is perfect for night outs.", url="https://i.ibb.co/C0pVGxQ/abaya11.jpg",price=5600),
    Clothes(id = 5,name="Lace Abaya", description="Detailed Abaya with lace and a belt.", url="https://i.ibb.co/bRqyH8h/abaya12.jpg",price=5500),
    Clothes(id = 6,name="Velvet Abaya", description="A velvet lush Abaya perfect for celebrations.", url="https://i.ibb.co/cJL374s/abaya13.jpg",price=6000),
    Clothes(id = 7,name="Glitter Abaya", description="An Abaya that has gemstones with glitter that makes a statement.", url="https://i.ibb.co/x1PRKgX/abaya14.jpg",price=2000),
    Clothes(id = 8,name="Dark-green Abaya", description="A dark-green flowy Abaya perfect for spring.", url="https://i.ibb.co/LnYP3Jn/Abaya6.jpg",price=2900),
    Clothes(id = 9,name="Dress Abaya", description="A dress Abaya for casual outings and comfortable.", url="https://i.ibb.co/VtPP78F/dress.jpg", price=3500),
    Clothes(id = 10,name="Floral Abaya", description="A floral Abaya that is the perfect for picnics in spring. .", url="https://i.ibb.co/pzD5zRK/floral.jpg",price=4500),
    Clothes(id = 11,name="Silk Abaya", description="A silky abaya that is luxurious and comfortable.", url="https://i.ibb.co/ZJGgb7r/silk.webp",price=5000),
]


class CartItem(BaseModel):
    id: int
    size: str
    quantity: int 
