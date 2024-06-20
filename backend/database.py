import sqlite3
from model import User, CartItem


DB_FILE = 'db.sqlite'

def get_connection():
    return sqlite3.connect(DB_FILE)


def create_tables():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users(
            id INTERGER PRIMARY KEY ,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        )

''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS cart_items(
            id INTERGER PRIMARY KEY,
            user_id INTERGER NOT NULL,
            clothes_id INTERGER NOT NULL,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            url TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTERGER NOT NULL,
            size TEXT,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )

''')
    
    conn.commit ()
    conn.close()


def register_user(user: User):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute('''
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        ''', (user.name, user.email, user.password))
        
        user_id = cursor.lastrowid
        conn.commit()
        return user_id
    
    except sqlite3.IntegrityError:
        conn.rollback()
        raise ValueError("Email already registered")
    
    finally:
        conn.close()

def add_to_cart(user_id: int, cart_item: CartItem):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute('''
        INSERT INTO cart_items (user_id, clothes_id, name, description, url, price, quantity, size)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (user_id, cart_item.clothes_id, cart_item.name, cart_item.description,
          cart_item.url, cart_item.price, cart_item.quantity, cart_item.size))

    cart_item_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return cart_item_id
if __name__ == "__main__":
    create_tables()