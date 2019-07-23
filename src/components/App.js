import React, { Component } from 'react';
import '../css/App.css';

//components
import AddAppointments from './AddAppointments'
import SearchAppointments from './SearchAppointments'
import ListAppointments from './ListAppointments'

class App extends Component {

  state = {
    appointments: [],
    isLoading: null,
    formDisplay: false,
  }

  componentDidMount() {

    this.setState({ isLoading: true })

    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
      const appointmentsData = data.map((item, index) => ({...item, id: index}))
      this.setState({ appointments:appointmentsData, isLoading: false })
    })
    .catch(error => console.error(error))

  }


  deleteAppointment = (selectedAppointment) => {
    this.setState(prevState => {
      return {
        appointments: prevState.appointments.filter(appointment => appointment.id !== selectedAppointment.id)
      }
    })
  }

  toggleAppointmentForm = (e) => {
    this.setState(prevState => ({ formDisplay: !prevState.formDisplay })) //invert the value, e.g. true->false | false->true
  }

  addAppointment = newAppointment => {
    this.setState(prevState => {
      return {
        appointments: [...prevState.appointments, {...newAppointment, id: prevState.appointments.length }]
      }
    })
  }

  render() {
    const { appointments, isLoading, formDisplay } = this.state
    return (
      <React.Fragment>
      {
        isLoading ? 
        <div className="d-flex justify-content-center bg-white py-4">
          <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        :
        <main className="page bg-white" id="petratings">
          <div className="container">
            <div className="row">
              <div className="col-md-12 bg-white">
                <div className="container">
                  <AddAppointments formDisplay={formDisplay} toggleForm={this.toggleAppointmentForm} addAppointment={this.addAppointment}/>
                  <SearchAppointments />
                  <ListAppointments appointments={appointments} deleteAppointment={this.deleteAppointment}/>
                </div>
              </div>
            </div>
          </div>
        </main>
      }
      </React.Fragment>
    )
  }
}

export default App;
