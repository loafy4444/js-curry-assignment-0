'use strict'

const entries =
  obj =>
    Object.keys(obj)
      .map(key => [key, obj[key]])

const listing =
  (name, price) => ({
    name,
    price
  })

const customer =
  (name, shoppingList) => ({
    name,
    shoppingList
  })

const cart =
  (customer, ...items) => ({
    customer,
    items
  })

/**
 * should return an array with the `itemName` repeated `count` number of times
 */
const itemRepeater =
  itemName =>
    count => {
      const arr = []
      for (let i = 0; i < count; i++) {
        arr.push(itemName)
      }
      return arr
    }

/**
 * should return an array of carts with each given customer's shopping list
 * as an array of items
 */
const constructCarts =
  listings =>
    customers =>
      customers
        .map(customer => ({customer: customer.name, items:
          entries(customer.shoppingList)
            .reduce((key, arr) => [arr, ...key], [])
            .reduce((cartArr, arr) => [...cartArr, ...itemRepeater(arr[0])(arr[1])], [])
            .reduce((prev, item) => [...prev, ...listings
              .filter(list => list.name === item)], [])
          }))

module.exports = {
  listing,
  customer,
  constructCarts
}
