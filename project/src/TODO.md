# Part 1 - Browsing

## Task 1

### Startup page (index.html)

- [x] List categories -> redirect to plantlist page
- [x] Search field with button -> show plants in plantlist page
- [x] Go to cart button (part 3)

## Task 2

### Plantlist page (plants.html)

- [x] List plants based on category or search. Show picture, name and price of plant
- [x] If no matches on the search, display a message "Your search did not match any plants"
- [x] On plant click to to details page
- [x] Go to cart button (part 3)
- [x] Back button/text/image to go back to home page

## Task 3

### Details page (plant-details.html)

- [x] Show big picture, name, category, description, height, price
- [x] Show discount if applicable in percentage
- [x] Number of plants in stock, if not in stock show estimate delivery time
- [x] Customer rating if available, 1-5 stars
- [x] Buy button -> add to cart (part 3)
- [x] Go to cart button (part 3)
- [x] Back button/text/image to go back to home page

# Part 2 - Administration

## Task 4

### Admin login page (admin/login.html)

- [x] Username and password field
- [x] After login show "Plants", "Orders", "Users" and "Reviews" buttons
- [x] Logout button

## Task 5

### Plants page (admin/plants.html)

- [x] List all plants
- [x] Add plant button -> add plant page
- [x] Edit plant button -> edit plant page
- [x] Delete plant button -> delete plant

# Part 3 – Shopping and ordering

## Task 6

### Shoppingcart page (cart.html)

- [x] List all plants in cart (id number, name, number of items, price per plant, total price for that plant)
- [x] If plant not in stock: show expected shipping date
- [x] Total price for all plants
- [x] Change number of items of a plant (default: 1)
- [x] Delete button to remove a plant from the cart
- [x] Empty shopping cart button to remove all plants from the cart
- [x] Back to startup page (home button)
- [~] Proceed to checkout button -> checkout page (task 7)
- [x] Store the shopping cart in localStage

## Task 7

### Checkout page (checkout.html)

Divided in 3 parts/steps:

- [ ] 1 - Type in customer info (name, email, address (street, city, zip, country), phone)
- [ ] 2 - Select shipping method (retrieve from API)
- [ ] 3 - Show total price including shipping
- [ ] 3 - Place order button -> order confirmation page (task 8)
- [ ] Back to startup page (home button)

## Task 8

### Order confirmation page (order-confirmation.html)

- [ ] Send order to API
- [ ] Display the confirmation info from API
  - [ ] Order number
  - [ ] Customer info (name, email, phone, delivery address)
  - [ ] List of the ordered plants (id number, name, number of items, price per plant, total price for that plant)
  - [ ] Shipping method
  - [ ] Estimated shipping date
  - [ ] Total price for the order, including shipping
- [ ] Back to startup page (home button)

## Task 9

### Orders admin page (admin/orders.html)

- [ ] List all orders
- [ ] Delete orders

# Part 4 – Users and comments/plant reviews

## Task 10

- [x] Create user button on homepage -> register page
- [x] Form to enter info (name, username, password, picture, email, address (street, city, zip, country), phone)

## Task 11

- [x] Login button on homepage -> login page
- [~] Form to login with username and password
- [ ] When user logged in: display his thumb picture on all pages (header) but not in the admin pages

## Task 12

- [ ] Update plants page + details pages to display plants only available if you are logged in

## Task 13

- [ ] Change checkout page so the customer info are automatically filled in if you are logged in

## Task 14

- [ ] Change the plant details page to be able to add a comment when you are logged in

## Task 15

- [ ] Add a show comments button on plant details page -> plant comments page
- [ ] On this page you can see all comments and ratings for the selected plant
- [ ] This comments page should also be available for non-logged in users

## Task 16

- [ ] When you click on the user pictures (in header) -> settings page
- [ ] Form to change user information
- [ ] Button to delete the logged in user
- [ ] Logout button (delete authorization token in localStorage/sessionStorage), redirect to homepage
