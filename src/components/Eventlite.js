
import React from'react'
import Container from 'react-bootstrap/Container'

import axios from 'axios'
import EventsList from'./EventsList'
import EventForm from'./EventForm'

import './Eventlite.css'


class Eventlite extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      events: []
    }

  }

componentDidMount() {
    axios({
      method: 'GET',
      url: 'https://events-react.herokuapp.com/events'
    })
    .then(response => {
      this.setState({events: response.data})
    })
  }


  addNewEvent = (event) => {
    const events = [...this.state.events, event].sort(function(a, b){
return new Date(a.start_datetime) - new Date(b.start_datetime) })
    this.setState({events: events})
  }

render() {
const currentUser = localStorage.getItem('user')
return (
      <Container className="pt-5">
        {currentUser &&
          <div className="mb-5 pt-5 event-form-homepage-container">
            <EventForm onSuccess={this.addNewEvent} />
      </div>
    }
        <h1 className="h4">Latest events</h1>
        <EventsList events={this.state.events} />
      </Container>
 )
}
}
export default Eventlite
