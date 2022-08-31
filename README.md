# inventory-service

run below commands inside /inventory-service directory to test the application:

npm install --force
npm start

Send curl requests or use Postman
Get all products:
http://localhost:3000/api/getAllProducts

Get all inventory:
http://localhost:3000/api/getAllInventory

Sell product:
http://localhost:3000/api/sell/:id

Stock Calculation logic:
| products.art_id | products.amount_of | inventory.stock | productsStock = min(inventory.stock / products.amount_of) |
|-----------------|--------------------|-----------------|-----------------------------------------------------------|
| 1               | 4                  | 12              | 3                                                         |
| 2               | 8                  | 17              | 2 = actual chairs in stock                                |
| 3               | 1                  | 2               | 2                                                         |

