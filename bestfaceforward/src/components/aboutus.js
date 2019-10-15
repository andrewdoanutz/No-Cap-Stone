import React, { Component } from 'react'
import Profile from './profile'


import "../css/about.css";


export default class About extends Component {
  render() {
    return (
      
      <div className="profiles">
        <div className="andrew">
        <Profile image="https://media.licdn.com/dms/image/C5603AQHaYrsskcDsfw/profile-displayphoto-shrink_200_200/0?e=1558569600&v=beta&t=PQHxO0Y2VmoPHK3HrKDgG3R0eodNuMCuG0oxmN3rALQ" 
        name="Andrew Doan"
        yearMajor="UCSB 3rd Year Computer Engineer"
        linkedIn="https://www.linkedin.com/in/andrewadoan/"
        />
        </div>
        <div className="benson">
        <Profile image="https://media.licdn.com/dms/image/C5603AQHAufc89IlBMQ/profile-displayphoto-shrink_800_800/0?e=1556150400&v=beta&t=hDDhS5rTZ4ACCQW3Va-jv-WQrGzHkn7NiIsvqvVrbjc"
        name="Jeffrey Li"
        yearMajor="UCSB 3rd Year Electrical Engineer"
        linkedIn="https://www.linkedin.com/in/jeffreyli01/"
        />
        </div>
        <div className="tim">
        <Profile image="https://media.licdn.com/dms/image/C5603AQErNhvSGTGsDQ/profile-displayphoto-shrink_800_800/0?e=1556150400&v=beta&t=DBwgLo_GOEpOZbSm3O0YvXpS6HAzw3wTwcNIC7RmWio"
        name="Silas Collins"
        yearMajor="UCSB 3rd Year Electrical Engineer"
        linkedIn="https://www.linkedin.com/in/silas-collins-5b782016a/"
        />
        </div>
      </div>
    )
  }
}
