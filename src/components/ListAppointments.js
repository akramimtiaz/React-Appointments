import React, { Component } from 'react'
import { FaTimes } from 'react-icons/fa'
import Moment from 'react-moment'

class ListAppointments extends Component {
    render() {

        const appointmentItems = this.props.appointments.map(appointment => {
            return (
                <div className="pet-item col media py-3" key={appointment.id}>
                    <div className="mr-3">
                        <button className="pet-delete btn btn-sm btn-danger pt-0"
                        onClick={() => this.props.deleteAppointment(appointment)}>
                            <FaTimes />
                        </button>
                    </div>
        
                    <div className="pet-info media-body">
                        <div className="pet-head d-flex">
                            <span className="pet-name" contentEditable suppressContentEditableWarning onBlur={ e => this.props.updateAppointment('petName', e.target.innerText, appointment.id)}>{appointment.petName}</span>
                            <span className="apt-date ml-auto">
                                <Moment 
                                    date={appointment.aptDate}
                                    parse="YYYY-MM-dd hh:mm"
                                    format="MMM-D h:mma"
                                />
                            </span>
                        </div>
        
                        <div className="owner-name">
                            <span className="label-item">Owner:</span>
                            <span contentEditable suppressContentEditableWarning onBlur={ e => this.props.updateAppointment('ownerName', e.target.innerText, appointment.id)}>{appointment.ownerName}</span>
                        </div>
                        <div className="apt-notes" contentEditable suppressContentEditableWarning onBlur={ e => this.props.updateAppointment('aptNotes', e.target.innerText, appointment.id)}>{appointment.aptNotes}</div>
                    </div>
                </div>
            )
        })

        return (
            <div className="appointment-list item-list mb-3">
                {appointmentItems}
            </div>
        )
    }
}

export default ListAppointments