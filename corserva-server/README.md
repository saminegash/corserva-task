# Sale Order Item assignment

Basic RESTful api for sale order item where you can add/delete your item and add item to cart after authorization.

#### DESCRIPTION

- Built a REST Api in Node.js using MVC approch using express postgres sequelize.
- JWT for Authetication and Authorization.

#### BASIC REQUIREMENTS

- Node.js 16+
- PostgreSQL

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run dev

# Build
$ npm run build

# create tables
$ npm run db:migrate

# create records in database
$ npm run db:seed:all

```

App should now be running on **localhost:2000**

## Test

```bash
# unit tests
$ npm run test


# test coverage
$ npm run test:cov
```

## Available API Routes

### [Items Routes](#1-item-routes)

| Routes                                                      |            Description            |
| ----------------------------------------------------------- | :-------------------------------: |
| [`GET/items/`](#a-get-list-of-all-items)                    |       Get list of all items       |
| [`POST/items/`](#b-post-a-new-item)                         |          Post a new item          |
| [`GET/items/{itemId}`](#c-get-details-of-a-particular-item) | Get details of a particular item. |
| [`PATCH/items/{itemId}`](#d-update-a-particular-item)       |     Update a particular item      |
| [`DELETE/items/{itemId}`](#e-delete-a-particular-item)      |     Delete a particular item      |

### [User and Auth Routes](#2-user-routes)

| Routes                                         |    Description     |
| ---------------------------------------------- | :----------------: |
| [`POST/users/signUp`](#a-sign-up-a-new-user)   | Sign up a new user |
| [`POST/users/login`](#b-login-a-existing-user) |    Login a user    |

### [Cart Routes](#3-cart-routes)

| Routes                                                              |               Description               |
| ------------------------------------------------------------------- | :-------------------------------------: |
| [`GET/carts/{userId}`](#a-get-cart-of-a-user)                       |        Get cart detail of a user        |
| [`POST/carts/addItem`](#b-post-a-new-item-to-cart)                  |         Post a new item to cart         |
| [`POST/cart/removeItem/{itemId}`](#c-post-remove-a-particular-item) | Post remove a particular item from cart |

### [CartItem Routes](#3-cart-routes)

| Routes                                                              |               Description               |
| ------------------------------------------------------------------- | :-------------------------------------: |
| [`GET/carts/:orderId/items/:itemId`](#a-get-cart-of-a-user)         |        Get cart detail of a user        |
| [`POST/carts/addItem`](#b-post-a-new-item-to-cart)                  |         Post a new item to cart         |
| [`POST/cart/removeItem/{itemId}`](#c-post-remove-a-particular-item) | Post remove a particular item from cart |

Visit your browser in: `http://localhost:2000/`