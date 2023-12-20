import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    AppointmentsList: [],
    Title: '',
    date: '',
    dateValue: '',
    StarredFilter: true,
    StarAppointmentsList: [],
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {Title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      Title,
      date,
      isFavorite: false,
    }
    this.setState(prevState => ({
      AppointmentsList: [...prevState.AppointmentsList, newAppointment],
      Title: '',
      date: '',
      dateValue: '',
    }))
  }

  onTypeTitle = event => {
    this.setState({Title: event.target.value})
  }

  onTypeDate = event => {
    const newDate = format(new Date(event.target.value), 'dd MMMM yyyy, EEEE')
    this.setState({date: newDate, dateValue: event.target.value})
  }

  isFavoriteIcon = id => {
    this.setState(prevState => ({
      AppointmentsList: prevState.AppointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  starAppointments = () => {
    const {StarredFilter, StarAppointmentsList, AppointmentsList} = this.state
    this.setState({StarAppointmentsList: AppointmentsList})
    if (StarredFilter === true) {
      this.setState({
        AppointmentsList: AppointmentsList.filter(
          eachitem => eachitem.isFavorite === true,
        ),
      })
    } else {
      this.setState({
        AppointmentsList: StarAppointmentsList,
      })
    }

    this.setState(prevState => ({StarredFilter: !prevState.StarredFilter}))
  }

  render() {
    const {AppointmentsList, Title, dateValue} = this.state
    return (
      <div className="bg-container">
        <div className="card-container ">
          <div className="card-container1 ">
            <div>
              <h1 className="main-heading">Add Appointment</h1>
              <form className="form-container" onSubmit={this.onAddAppointment}>
                <div className="text-container">
                  <label htmlFor="title" className="title-label">
                    TITLE
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="text-El"
                    placeholder="Title"
                    value={Title}
                    onChange={this.onTypeTitle}
                  />
                </div>
                <div className="date-container">
                  <label htmlFor="date" className="date-label">
                    DATE
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={dateValue}
                    className="date-El"
                    onChange={this.onTypeDate}
                  />
                </div>
                <button type="submit" className="Add-Btn">
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="main-image"
              />
            </div>
          </div>

          <hr className="horizontal-line" />
          <div className="top-container ">
            <h1 className="heading">Appointments</h1>
            <button
              type="button"
              className="Starred-btn"
              onClick={this.starAppointments}
            >
              Starred
            </button>
          </div>

          <ul className="ul-container">
            {AppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                Appointment={eachAppointment}
                isFavoriteIcon={this.isFavoriteIcon}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
