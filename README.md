# Abaya Store
 - Presentation Link : https://www.loom.com/looms/videos 
# Overview 
The Abaya app is designed to provide users with a user-friendly and interactive platform to browse, purchase and preview abaya products. This application is built using React with Vite for the frontend and Python FatAPI for the backend.

# Features
 # Frontend
- Product catalogue: Browse through a collection of abayas with detailed descriptions, images and prices.
- Shopping Cart: When the user deccides to view the product it gives them an option to add to cart and choose a size and quantity.
- Cart: This lets the user add or remove items, or go back to catalogue if they wish to.
- Contact: This page offers more details about the app,shipping information and contact details.

 # Backend
- Clothing Catalog Managment: CRUD operations for managing the clothing item.
- Shopping Cart: Ability to add, update and remove items from the shopping cart.
- CORS Support: Configured to allow cross-origin requests for frontend intergration.
- Error Handling: Utilizes FASTAPI's HTTPException for error responses.

# Technology Stack
- Frontend: React.js with vite and React Bootsrap
- Backend: Python FastAPI


# Installation
 - Prerequisites
Node.js and npm
Python 3.8+



# Setup Instructions

    Clone the repository:

    bash

git clone https://github.com/iqramahamed24/Clothing-app.git
cd Clothing-app

Backend (FastAPI):

    Navigate to the backend directory and install dependencies:

    bash

cd backend
pip install -r requirements.txt

Run the FastAPI server:

bash

    uvicorn main:app --reload

Frontend (React with Vite):

    Navigate to the frontend directory and install dependencies:

    bash

cd frontend
npm install

Start the Vite development server:

bash

        npm run dev

        Open your browser and visit http://localhost:5173 to view the application.

# Contributing

We welcome contributions to the Abaya Store app. Please fork the repository, create a new branch, and submit a pull request for any features, bug fixes, or improvements.
 
# License

This project is licensed under the MIT License. See the LICENSE file for more details.

# Contact
- For any inquiries , please contact iqra.mahamed64@gmail.com 

For any inquiries or support, please contact us at support@abayaapp.com.
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
