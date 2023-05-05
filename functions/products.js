require('dotenv').config()
const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('app6OuRDJ2WtDmQfN')
  .table('New Products')

exports.handler = async (event, context, cb) => {
  const { id } = event.queryStringParameters
  console.log(id)
  if (id) {
    try {
      const product = await airtable.retrieve(id)
      if (product.error) {
        return {
          headers: { 'Access-Control-Allow-Origin': '*' },
          statusCode: 404,
          body: `No product with id: ${id}`,
        }
      }
      return {
        headers: { 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        body: JSON.stringify(product),
      }
    } catch (error) {
      return {
        headers: { 'Access-Control-Allow-Origin': '*' },
        statusCode: 500,
        body: `Server Error`,
      }
    }
  }
  try {
    const { records } = await airtable.list()
    const products = records.map((i) => {
      const { id } = i
      const { name, image, price } = i.fields
      const url = image[0].url
      return {
        id,
        name,
        url,
        price,
      }
    })
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 200,
      body: JSON.stringify(products),
    }
  } catch (error) {
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 500,
      body: 'Server Error',
    }
  }
}
