import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
const url = '/api/products'
const Product = () => {
  const { productID } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState({})
  const fetchProduct = async () => {
    try {
      const {
        data: { fields },
      } = await axios.get(`${url}?id=${productID}
      `)
      setProduct(fields)
    } catch (error) {
      console.log(error.response)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    fetchProduct()
  }, [])
  if (isLoading) {
    return (
      <section className='section section-center'>
        <h2>Loading...</h2>
      </section>
    )
  }
  const { name, description, price, image } = product
  return (
    <section className='section-center section'>
      <Link to='/' className='link'>
        Back Home
      </Link>
      <div>
        <div className='title'>
          <h2>{name}</h2>
          <div className='title-underline'></div>
        </div>
        <article className='single-product'>
          <img className='single-product-img' src={image[0].url} alt={name} />
          <div >
            <h5>{name}</h5>
            <h5 className='price'>${price}</h5>
            <p>{description}</p>
          </div>
        </article>
      </div>
    </section>
  )
}
export default Product
