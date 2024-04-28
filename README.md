# Prerequisites

Before running the application, ensure you have the following installed:

- Node.js
- PostgreSQL
- Prisma CLI

# Install dependencies:

npm install

# Set up the PostgreSQL database:

- Create a PostgreSQL database named myDatabase.
- Update the url field in prisma/schema.prisma with your PostgreSQL connection URL.

# Set up Prisma:

- npx prisma generate
- npx prisma migrate dev --name init

# Start the application:
- npm start



# Database Models

### Admin
id: Unique identifier for the admin.
email: Email address of the admin.
password: Password for admin authentication.
token: Optional token for admin authentication.

### User
id: Unique identifier for the user.
email: Email address of the user.
password: Password for user authentication.
phone: Phone number of the user.
name: Name of the user.
token: Optional token for user authentication.
otp: Optional one-time password for user authentication.
role: Role of the user (e.g., admin, customer).
createdAt: Timestamp for user creation.

### Movie
id: Unique identifier for the movie.
title: Title of the movie.
genre: Genre of the movie.
year: Year of release.
leadActor: Lead actor in the movie.
director: Director of the movie.
quantity: Quantity of the movie available in stock.
price: Price of the movie.
isDeleted: Indicates if the movie is marked as deleted.
createdAt: Timestamp for movie creation.

### Order
id: Unique identifier for the order.
userId: Identifier of the user who placed the order.
quantity: Quantity of movies in the order.
totalPrice: Total price of the order.
status: Status of the order (e.g., Initiated, In Process, Shipped).
createdAt: Timestamp for order creation.
movieId: Identifier of the movie associated with the order.

### CartItem
id: Unique identifier for the cart item.
userId: Identifier of the user who added the item to the cart.
quantity: Quantity of the movie in the cart.
price: Price of the movie.
createdAt: Timestamp for cart item creation.
movieId: Identifier of the movie associated with the cart item.


