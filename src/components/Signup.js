import React from'react'
import axios from'axios'
import Container from 'react-bootstrap/Container'

class Signup extends React.Component{
  handleSignup = (e) => {
    e.preventDefault()
    axios({
      method: 'POST',
      url: 'https://events-react.herokuapp.com/auth',
      data: {
        email: this.email.value,
        password: this.password.value
      }
    })
.then(response => {
      localStorage.setItem('user',
        JSON.stringify({
          'access-token': response.headers['access-token'],
          'client': response.headers['client'],
          'uid': response.data.data.uid
}))
      window.location = '/'
    })
}

render () {
  return (
    <Container className="content-container">
      <div>
        <h2>Sign up</h2>
        <form onSubmit={this.handleSignup} >
       <input name="email" ref={(input) => this.email = input } />
       <input name="password" type="password" ref={(input) => this.password = input } />
      <input type="submit"/>
 </form>
</div>
 </Container>
  )
 }
}
export default Signup
