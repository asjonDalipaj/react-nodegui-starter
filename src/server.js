const express = require('express')
const { userInfo } = require('os')
const xlsx = require('xlsx')
const app = express()
const port = 9000
const sequelize = require('./database')
const Product = require('./db/Product')

sequelize.sync().then(() => console.log('db starteeeed'))

/* Load excel file */
var wb = xlsx.readFile('data/boq_data.xls')
var ws = wb.Sheets['Data']

var data = xlsx.utils.sheet_to_json(ws)

/* Write categories to the DB 
  Loop for every prod.name -> 
    extract the uom then ->
    loop for every uom -> extract the measurement -> match price
*/
//console.log(ws['A6'])

/* Todo: Build simple DB locally maybe hosted somewhere in the future */


/* API requests */

/* Middleware for letting the app read the json file */
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

/* Insert new product */
app.post('/products', async (req, res) => {
  await Product.create(req.body)
  res.send('Product is inserted')
})

/* Get all products */
app.get('/products', async (req, res) => {
  const products = await Product.findAll()
  res.send(products)
})

/* Get single product */
app.get('/products/:id', async (req, res) => {
  const requestId = req.params.id;
  const product = await Product.findOne({ where: { id: requestId}})
  res.send(product)
})

/* Update product */
app.put('/products/:id', async (req, res) => {
  const requestId = req.params.id;
  const product = await Product.findOne({ where: { id: requestId}})
  product.name = req.body.name
  await product.save()
  res.send(product)
})

/* Delete product */
app.delete('/products/:id', async (req, res) => {
  const requestId = req.params.id;
  await Product.destroy({ where: { id: requestId}})
  res.send("Product removed successfully")
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})