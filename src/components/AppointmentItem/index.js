import './index.css'

const AppointmentItem = props => {
  const {Appointment, isFavoriteIcon} = props

  const {id, Title, date, isFavorite} = Appointment

  const makeFavoriteIcon = () => {
    isFavoriteIcon(id)
  }

  const starImage = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="list-container">
      <div className="Appointment-inside">
        <div>
          <p className="heading">{Title}</p>
          <p className="date-para">{date}</p>
        </div>
        <button
          type="button"
          onClick={makeFavoriteIcon}
          data-testid="star"
          className="star-btn"
        >
          <img src={starImage} alt="star" className="star-image" />
        </button>
      </div>
    </li>
  )
}
export default AppointmentItem
