import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import {BsPlusSquare} from 'react-icons/bs'

import SimilarProductItem from '../SimilarProductItem'

const apiStatusContainer = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  inprogress: 'INPROGRESS',
}

class productItemDetails extends Component {
  state = {
    apiStatus: 'INITIAL',
    productsList: {},
    similarProduct: [],
    counter: 0,
  }

  componentDidMount() {
    this.gettingProducts()
  }

  getFormattedData = eachs => ({
    availability: eachs.availability,
    brand: eachs.brand,

    description: eachs.description,
    id: eachs.id,
    imageUrl: eachs.image_url,
    price: eachs.price,
    rating: eachs.rating,
    review: eachs.review,
    title: eachs.title,
  })

  gettingProducts = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')
    const productDetailsApiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: ` Bearer ${token}`,
      },
      method: 'GET',
    }

    const fetchingData = await fetch(productDetailsApiUrl, options)
    if (fetchingData.ok === true) {
      const parsedData = await fetchingData.json()
      const filteredData = {
        availability: parsedData.availability,
        brand: parsedData.brand,

        description: parsedData.description,
        id: parsedData.id,
        imageUrl: parsedData.image_url,
        price: parsedData.price,
        rating: parsedData.rating,
      }
      console.log(parsedData)
      const similarProductsData = parsedData.similar_products.map(eachs =>
        this.getFormattedData(eachs),
      )
      this.setState({
        apiStatus: 'SUCCESS',
        productsList: filteredData,
        similarProduct: similarProductsData,
      })
      console.log(similarProductsData)
    }

    if (fetchingData.status === 404) {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  renderingMainData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContainer.success:
        return this.rendersuccess()

      case apiStatusContainer.failure:
        return this.renderfailure()

      case apiStatusContainer.inprogress:
        return this.renderprogress()
      default:
        return null
    }
  }

  increment = () => {
    console.log('trigger')
    this.setState(prevState => ({
      counter: prevState.counter + 1,
    }))
  }

  decrement = () => {
    const {counter} = this.state
    if (counter > 1) {
      this.setState(prevState => ({
        counter: prevState.counter - 1,
      }))
    }
  }

  rendersuccess = () => {
    const {apiStatus, productsList, similarProduct, counter} = this.state
    const {
      availability,
      brand,

      description,
      id,
      imageUrl,
      price,
      rating,
      review,
      title,
    } = productsList
    return (
      <div>
        <div>
          <img src={imageUrl} alt="product" />
          <div>
            <h1>{title}</h1>
            <p>Rs {price}</p>
            <div className="row">
              <p>{rating}</p>
              <p>{review}</p>
              <p>{description}</p>
              <p>Avaialability : {availability}</p>
              <p>Brand : {brand}</p>
              <div className="rowing">
                <button
                  className="margin"
                  onClick={this.decrement}
                  type="button"
                >
                  +
                </button>
                <p className="margin">{counter}</p>
                <button onClick={this.increment} type="button">
                  -
                </button>
              </div>
              <button className="blue-button">Add To Cart</button>
            </div>
          </div>
        </div>
        <div>
          <h1>hjhj</h1>
        </div>
      </div>
    )
  }

  renderfailure = () => (
    <div>
      <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png" />
      <h1>Product Not Found</h1>
      <Link to="/product">
        <button>Continue Shopping</button>{' '}
      </Link>
    </div>
  )

  renderprogress = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {similarProduct} = this.state
    return (
      <div>
        <div className="super-image">
          <div>{this.renderingMainData()}</div>
        </div>
        <ul>
          {similarProduct.map(each => (
            <SimilarProductItem every={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }
}

export default productItemDetails
