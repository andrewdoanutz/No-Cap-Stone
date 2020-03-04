import React, { Component, useState, useCallback, useEffect} from 'react';
import {Container, Col, Row, Button, Card, ToggleButton} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faIdCard } from '@fortawesome/free-solid-svg-icons'
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
            currentUser.name = res["data"]["Items"][user]["username"]
            currentUser.id = res["data"]["Items"][user]["id"]
            currentUser.date = res["data"]["Items"][user]["date"]
            currentUser.position = res["data"]["Items"][user]["position"]
            console.log(currentUser)
            names.unshift(currentUser)
          }
        }
        setDBInfo(names)
    }

    getDBInfo()
  }, [])
  return [DBInfo]
}



const Userdash = (props) => {
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const DBInfo=useAsyncHook()
  var names = DBInfo[0]

  // var names = [{name: 'Adjon Tahiraj', date: 'Mon, Feb 3 - 9:00am', id: 'A576W'},
  //             {name: 'Bik Nandy', date: 'Wed, Feb 5 - 10:00am', id: 'A87K2'},
  //             {name: 'Andrew Doan', date: 'Thurs, Feb 13- 11:00am', id: 'OV3KZ'},
  //             {name: 'Tim Chang', date: 'Wed, Feb 19 - 1:00pm', id: '4TKLZ'},
  //             {name: 'Ryan Gormley', date: 'Fri, Feb 28 - 9:00am', id: '10ZIA'}]




    return (
      <div>
        <div className = "scroll">
          <Container fluid="true">
            <Row>{ names.map(function(candidate){
              return <Container fluid ="true"><Row><Col key = {candidate.name}> <h3> {candidate.date} </h3>
                <Card className = "shadow" style={{marginBottom: "10%", "border-color": "#08AEEA"}}>
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title><h4>{candidate.name}</h4></Card.Title>
                      <Card.Text>
                        <h5>{candidate.position}</h5>
                      </Card.Text>
                    </Col>
                    <Col className="my-auto text-right">
                        <Button variant="red" value = {true} onClick = {()=> {setName(candidate.name);
                          setID(candidate.id);
                          props.parentCallback({name: candidate.name, position: candidate.position, id: candidate.id, isClicked: !props.clicked})}}><FontAwesomeIcon icon={faIdCard} size='3x'/></Button>

                    </Col>
                  </Row>
                </Card.Body>
              </Card></Col></Row></Container>;
            }) }</Row>
          </Container>
        </div>
      </div>
    );


}

export default Userdash;
