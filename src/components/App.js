import React, { Component } from 'react';
import '../css/App.css';

//components
import AddAppointments from './AddAppointments'
import SearchAppointments from './SearchAppointments'
import ListAppointments from './ListAppointments'

class App extends Component {

  state = {
    appointments: [],
    isLoading: false,
  }

  async componentDidMount() {

    this.setState({ isLoading: true })

    try {

      const response = await fetch('./data.json')
      const data = response.json()
      this.setState({ appointments: data, isLoading: false })

    } catch (error) {
      console.error(error)
    }

  }

  render() {
    const { appointments } = this.state
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments />
                <SearchAppointments />
                <ListAppointments appointments={appointments}/>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default App;
