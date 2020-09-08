import React from 'react'
import './App.css'
import AppHeader from './components/AppHeader'
import Login from './components/Login'
import Eventlite from './components/Eventlite'
import Event from './components/Event'
import Signup from './components/Signup'
import EventForm from './components/EventForm'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"


const currentUser = function() {
    const user = localStorage.getItem('user')
    console.log(user)
    return(user)
  }


function App() {
  const currentUser = localStorage.getItem('user')
  return (
    <Router>
      <Route path="/">
        <AppHeader />
      </Route>
      <Route exact path="/">
        <Eventlite />
      </Route>
      <Route exact path="/events/:id">
        <Event/>
      </Route>
      <Route exact path="/events/:id" render={routeProps => (
      <Event {...routeProps} />
        )}/>
      <Route exact path="/events/:id/edit" render={routeProps=>(
        currentUser ?
       <EventForm {...routeProps} /> :
       <Redirect to='/login' />
       )}/>

      <Route exact path="/login">
        {currentUser ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route exact path="/signup">
        {currentUser ? <Redirect to="/" /> : <Signup />}
      </Route>
    </Router>
  )
}

export default App
