import React, { Component,useState, useCallback } from 'react';
import Cookies from 'universal-cookie';
// import Card from "react-bootstrap/Card";
import {Button} from 'react-bootstrap';
import
  Card, {CardImg, CardText, CardBody,
  CardTitle, CardSubtitle}
 from 'react-bootstrap/Card';
 import { Container, Row, Col } from 'reactstrap';
 import Room from './Room';
 import VideoComponent from './VideoComponent'


 const Meetings = () => {
   const [token, setToken] = useState(null);


   const handleClick = useCallback(
     async event => {
       event.preventDefault()
       const data = await fetch('/video/token', {
         method: 'POST',
         body: JSON.stringify({
           identity: "ryan",
           room: "1"
         }),
         headers: {
           'Content-Type': 'application/json'
         }
       }).then(res => res.json());
       setToken(data.token);
     },
     []
   );


   const handleLogout = useCallback(event => {
    setToken(null);
   }, []);



   var names = ['Jake', 'Jon', 'Thruster'];
   var namesList = names.map(function(name){
     return <Col><Card style={{ width: '18rem' }}>
       <Card.Body>
         <Card.Title>{name}</Card.Title>
         <Card.Text>
           Coding interview with intern {name}
         </Card.Text>
         <Button variant="primary" onClick={handleClick}>Join Meeting</Button>
       </Card.Body>
     </Card></Col>;
   })

   let render;
   if(token){
     render = (
       <div>
         <Row>
           <Col>
             <div className = "py-3">
               <header>
                 <h1 className = "text-center">Meeting</h1>
               </header>
             </div>
             <Room roomName={"1"} token={token} handleLogout={handleLogout} />
             <VideoComponent/>
           </Col>
         </Row>
       </div>
     );
   }

   else{
     render =(
       <Container>
       <Row>{ namesList }</Row>
       </Container>
     );
   }



   return render;
 };
 export default Meetings;
