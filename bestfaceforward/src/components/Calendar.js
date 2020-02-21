import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import bootstrap from '@fullcalendar/bootstrap';
import "@fullcalendar/core/main.css"
import "@fullcalendar/daygrid/main.css"
import "@fullcalendar/bootstrap/main.css"


export default class CalendarView extends React.Component {

  render() {
    return (
      <FullCalendar
        defaultView="dayGridMonth"
        themeSystem="standard"
        fixedWeekCount = {false}
        contentHeight = {500}
        weekends={false}
        events={[
            { title: 'Adjon Tahiraj', date: '2020-02-03T09:00:00' },
            { title: 'Bik Nandy', date: '2020-02-05T10:00:00' },
            {title: 'Tim Chang', date: '2020-02-19T13:00:00'},
            {title: 'Andrew Doan', date: '2020-02-13T11:00:00'},
            {title: 'Ryan Gormley', date: '2020-02-28T09:00:00'}
          ]}
        eventColor = '#007ed9'
        eventTextColor = "white"
        plugins={[ dayGridPlugin]}
      />
    )
  }

}
