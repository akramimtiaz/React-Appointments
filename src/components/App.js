import React, { Component } from 'react';
import '../css/App.css';

//components
import AddAppointments from './AddAppointments'
import SearchAppointments from './SearchAppointments'
import ListAppointments from './ListAppointments'

class App extends Component {

  state = {
    appointments: [],
    formDisplay: false,
    orderBy: 'petName',
    orderDir: 'asc',
    query: '',
    isLoading: null,
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

  changeOrder = (orderBy, orderDir) => {
    this.setState({
      orderBy: orderBy,
      orderDir: orderDir,
    })
  }

  updateQuery = query => this.setState({query})

  render() {
    const { appointments, isLoading, formDisplay, orderDir, orderBy } = this.state

    let order
    let filteredApts = appointments

    order = orderDir === 'asc' ? 1 : -1

    filteredApts = filteredApts.sort((a, b) => {
      if (a[orderBy].toLowerCase() < b[orderBy].toLowerCase()){
        return -1 * order
      } else {
        return order * 1
      }
    }).filter(appointment => 
      appointment.petName.toLowerCase().includes(this.state.query.toLowerCase()) ||
      appointment.ownerName.toLowerCase().includes(this.state.query.toLowerCase()) ||
      appointment.aptDate.toLowerCase().includes(this.state.query.toLowerCase())
    )

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
                  <SearchAppointments orderBy={orderBy} orderDir={orderDir} changeOrder={this.changeOrder} updateQuery={this.updateQuery}/>
                  <ListAppointments appointments={filteredApts} deleteAppointment={this.deleteAppointment}/>
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
