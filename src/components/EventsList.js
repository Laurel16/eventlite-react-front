import React from 'react'
import EventSummary from './EventSummary'
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row'

const EventsList = props => (
  <Row>
    {props.events.map(function(event) {
      return(
        <EventSummary key={event.id} event={event}/>

        )
    })}

  </Row>

  )

  EventsList.propTypes = {
  events: PropTypes.array.isRequired
}

  export default EventsList
