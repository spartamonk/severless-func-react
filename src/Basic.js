import { useEffect, useState } from 'react'
import axios from 'axios'
const url = 'https://temp-serverles-func-api.netlify.app/api/3-complete'

const Basic = () => {
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(url)
      setProducts(data)
    } catch (error) {
      console.log(error.response.data)
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    <section className='section-center'>
      <div className='title'>
        <h2>Basic setup</h2>
        <div className='title-underline'></div>
        <div className='products'>
          {products.map((i) => {
            const { id, name, url, price } = i

            return (
              <article className='product' key={id}>
                <img src={url} alt={name} />
                <div className='info'>
                  <h5>{name}</h5>
                  <h5 className='price'>${price}</h5>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default Basic
