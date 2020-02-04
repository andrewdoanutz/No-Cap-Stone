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
        contentHeight = {600}
        weekends={false}
        events={[
            { title: 'Adjon', date: '2020-02-05' },
            { title: 'Bik Nandy', date: '2020-02-03' }
          ]}
        plugins={[ dayGridPlugin]}
      />
    )
  }

}
