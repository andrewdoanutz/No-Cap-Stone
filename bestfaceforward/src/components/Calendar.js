import React, {useState, useEffect} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import bootstrap from '@fullcalendar/bootstrap';
import "@fullcalendar/core/main.css"
import "@fullcalendar/daygrid/main.css"
import "@fullcalendar/bootstrap/main.css"
import axios from 'axios'

function useAsyncHook(){
  const [DBInfo,setDBInfo]=useState([])
  useEffect(() => {
    async function getDBInfo(){
      const res = await axios.post('http://localhost:3001/db/getTable')
        var names = [];

        for (const user in res["data"]["Items"]){
          if (res["data"]["Items"][user]["username"]!="practice"){
            var currentUser = {};
            currentUser.title = res["data"]["Items"][user]["username"]
            currentUser.date = res["data"]["Items"][user]["time"]
            names.unshift(currentUser)
          }
        }
        setDBInfo(names)
    }

    getDBInfo()
  }, [])
  return [DBInfo]
}


const CalendarView = (props) => {
  const DBInfo=useAsyncHook()
  var events = DBInfo[0]

  return (
    <FullCalendar
      defaultView="dayGridMonth"
      themeSystem="standard"
      fixedWeekCount = {false}
      contentHeight = {500}
      weekends={false}
      events={events}
      eventColor = '#08AEEA'
      eventTextColor = "white"
      plugins={[ dayGridPlugin]}
    />
  )

}

export default CalendarView;
