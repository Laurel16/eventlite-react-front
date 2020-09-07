
import React from'react'
import axios from 'axios'
import EventsList from'./EventsList'
import EventForm from'./EventForm'
import FormErrors from'./FormErrors'
import validations from'../validations'
import './Eventlite.css'


class Eventlite extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      title: {value: '', valid: false},
      start_datetime: {value: '', valid: false},
      location: {value: '', valid: false},
      formErrors: '',
      formValid: false
    }

  }

componentDidMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:3001/events'
    })
    .then(response => {
      this.setState({events: response.data})
    })
  }


static formValidations = {
  title: [
      (value) => { return(validations.checkMinLength(value, 3)) }
    ],
    start_datetime: [
      (value) => { return(validations.checkMinLength(value, 1)) },
      (value) => { return(validations.timeShouldBeInTheFuture(value)) }
    ],
    location: [
      (value) => { return(validations.checkMinLength(value, 1)) }
    ]
}

  handleInput = e => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    const newState = {}
    newState[name] = {...this.state[name], value: value}
    this.setState(newState, () => this.validateField(name, value, Eventlite.formValidations[name]))
}

  handleSubmit = e => {
    e.preventDefault()
    let newEvent = { title: this.state.title.value, start_datetime: this.state.start_datetime.value,location:this.state.location.value}
    axios({
      method: 'POST',
      url: 'http://localhost:3001/events',
      headers: JSON.parse(localStorage.user),
      data: { event: newEvent }
    })
    .then(response => {
      this.addNewEvent(response.data)
      this.resetFormErrors();
    })
    .catch(error => {
      console.log(error.response.data)
      this.setState({formErrors: error.response.data})
}) }

validateForm(){
let formErrors = {}
let formValid = true
if(this.state.title.value.length <= 2) {
  formErrors.title = ["is too short (minimum is 3 characters)"]
  formValid = false
}
if(this.state.location.value.length === 0) {
formErrors.location = ["can't be blank"]
formValid = false
}

if(this.state.start_datetime.value.length === 0) {
formErrors.start_datetime = ["can't be blank"]
formValid = false
}

else if(Date.parse(this.state.start_datetime.value) <= Date.now()) {
formErrors.start_datetime = ["can't be in the past"]
formValid = false
}
this.setState({formValid: this.state.title.valid && this.state.location.valid && this.state.start_datetime.valid})
 }

resetFormErrors () {
    this.setState({formErrors: {}})
  }


validateField(fieldName, fieldValue, fieldValidations) {
    let fieldValid = true
    let errors = fieldValidations.reduce((errors, validation) => {
      let [valid, fieldError] = validation(fieldValue)
      if(!valid) {
        errors = errors.concat([fieldError])
      }
      return(errors);
    }, []);

    fieldValid = errors.length === 0

    const newState = {formErrors: {...this.state.formErrors, [fieldName]: errors}}
    newState[fieldName] = {...this.state[fieldName], valid: fieldValid}
    this.setState(newState, this.validateForm)
  }



  addNewEvent = (event) => {
    const events = [...this.state.events, event].sort(function(a, b){
return new Date(a.start_datetime) - new Date(b.start_datetime) })
    this.setState({events: events}, this.changeLogoColour)
  }

render() {
  const currentUser = localStorage.getItem('user')
  return (
      <div>
      <FormErrors formErrors = {this.state.formErrors} />
      {currentUser &&
        <EventForm handleSubmit = {this.handleSubmit}
          handleInput = {this.handleInput}
          formValid={this.state.formValid}
          title = {this.state.title.value}
          start_datetime = {this.state.start_datetime.value}
          location = {this.state.location.value} />
      }
        <EventsList events={this.state.events} />

      </div>
  )
 }
}





export default Eventlite
