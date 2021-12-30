const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database')

class Product extends Model {}

Product.init({ 
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    size: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    measurement: DataTypes.STRING,
    price: DataTypes.FLOAT,
}, {
    sequelize,
    modelName: 'product'
})

module.exports = Product