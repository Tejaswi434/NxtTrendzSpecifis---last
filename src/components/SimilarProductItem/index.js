// Write your code here

import './index.css'

const SimilarProductItem = props => {
  const {every} = props

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
  } = every
  return (
    <li>
      <img src={imageUrl} alt="product" />
      <p>{title}</p>
      <p>by {brand}</p>
      <p>RS{price}/-</p>
      <div>
        <p>
          {rating}{' '}
          <span>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
            />
          </span>
        </p>
      </div>
    </li>
  )
}

export default SimilarProductItem
