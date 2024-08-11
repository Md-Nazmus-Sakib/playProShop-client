<div align="center">
  <h1>Sporting Goods E-Commerce Platform</h1>
</div>

---

# Project Name: 🏅 🏅PlayProShop 🏅 🏅

## Live URL

Live URL is https://play-pro-shop-client.vercel.app/

## Overview Video URL

Project Overview Video link:https://drive.google.com/file/d/1FbXumVJj2_GGZyuTal6XUB0AAd3ArBZa/view?usp=sharing

## Git Server URL

Git Server Link is https://github.com/Md-Nazmus-Sakib/playProShop-server

## Server Live Link

Server Live Link is https://play-pro-shop-server.vercel.app/

## Git Frontend URL

Git Frontend Link is https://github.com/Md-Nazmus-Sakib/playProShop-client

## Introduction

A comprehensive e-commerce platform for a sporting goods business, designed to provide customers with an excellent shopping experience and easy management of products and orders.

## Project Description

This project aims to build a user-friendly and efficient e-commerce website where users can browse, filter, and purchase a wide range of sports equipment and accessories. The platform combines functionalities into a single user role, simplifying the management and shopping process.

## Features

- **Responsive Navbar & Footer**: Easy navigation with a well-structured menu and footer containing quick links and social media icons.
- **Homepage with Hero Section**: Dynamic carousel displaying promotional content.
- **Featured Products Section**: Latest products with detailed information and quick access to product pages.
- **Category-Based Product Filtering**: Users can filter products by categories.
- **Contact Us Form**: A form for customer inquiries.
- **All Products Page**: Comprehensive listing with search, filter, and sorting functionalities.
- **Single Product Page**: Detailed product information with Add to Cart functionality.
- **Cart Management**: View and manage items in the cart with quantity adjustments.
- **Checkout Process**: Buyers information with multiple payment options. View and manage items in with quantity adjustments and a total price summary including VAT and discount.
- **Manage Products Page**: Any User Can capabilities to add, update, and delete products.
- **Backend Integration**: Robust backend with Node.js, Express.js, Mongoose, and TypeScript for managing inventory and orders.

## Technology Stack

- **Frontend**:

  - React ⚛️
  - Redux 🌀
  - TypeScript
  - React-slider
  - React-rating
  - React-rating-stars-component
  - Stripe
    etc

- **Backend**:

  - Node.js 🟢
  - Express.js 🌐
  - Mongoose 🍃
  - TypeScript

- **Database**:

  - MongoDB

- **Other Tools**:

  - React-Rating

  - RTK Query
  - Stripe

## Installation Guideline For Backend

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Md-Nazmus-Sakib/playProShop-server
   cd playProShop-server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=your mongodb connection/playProShop?...
   STRIPE_SECRET_KEY=your stripe secret key
   ```

   Replace `your_mongodb_connection_string` with your actual MongoDB connection string and `stripe-secret-key` with a secure secret key for Stripe.

### Running the Application

1. **Start the server:**

   ```bash
   npm run start:dev
   ```

   The server should be running on `http://localhost:5000`.

## Installation Guideline For Frontend

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Md-Nazmus-Sakib/playProShop-client
   cd playProShop-client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   VITE_payment_gateway_pk=Your Stripe Payment Gateway
   ```

   Replace ` Stripe Payment Gateway` with a secure secret key for Stripe.

### Running the Application

1. **Start the frontend:**

   ```bash
   npm run dev
   ```
