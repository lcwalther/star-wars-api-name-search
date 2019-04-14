import React, { Component } from 'react'
import Starwars from '../assets/star-wars.png'
import axios from 'axios'
import './App.scss'

class App extends Component {
  state = { searchString: '', names: [] }

  onInputChange = event => {
    this.setState({ ...this.state, searchString: event.target.value })
  }

  onSubmitHandler = event => {
    event.preventDefault()
    event.target.reset()
    const apiUrl = `https://swapi.co/api/people/?search=${
      this.state.searchString
    }`
    axios
      .get(apiUrl)
      .then(response => {
        const names = response.data.results
        this.setState({ ...this.state, names })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className="container">
        <form className="form-grid" onSubmit={this.onSubmitHandler}>
          <img src={Starwars} alt="" />
          <div className="inputs">
            <input
              name="search"
              onChange={this.onInputChange}
              type="text"
              placeholder="Type in a character!"
              maxLength="20"
            />
            <button>Search</button>
          </div>
        </form>
        <div className="results-grid">
          {this.state.names.map((name, index) => {
            return (
              <div className="results-name" key={index}>
                {name.name}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default App
