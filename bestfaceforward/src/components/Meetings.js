import React, { Component,useState, useCallback } from 'react';
import Cookies from 'universal-cookie';
// import Card from "react-bootstrap/Card";
import {Button} from 'react-bootstrap';
import
  Card, {CardImg, CardText, CardBody,
  CardTitle, CardSubtitle}
 from 'react-bootstrap/Card';
 import { Container, Row, Col } from 'react-bootstrap';
 import Room from './Room';
 import VideoComponent from './VideoComponent'
import "../css/cards.css";
import exampleResume from "../images/exampleResume.png"
import facialAnalysis1 from "../images/facialAnalysis1.png"
import facialAnalysis2 from "../images/facialAnalysis2.png"
import speachAnalysis1 from "../images/speachAnalysis1.png"
import speachAnalysis2 from "../images/speachAnalysis2.png"

 const Meetings = ({username}) => {
   const [token, setToken] = useState(null);
   const [previewToken, setPreviewToken] = useState(false);
   const [postviewToken, setPostviewToken] = useState(false);


   const handleClick = useCallback(
     async event => {
       event.preventDefault()
       const data = await fetch('/video/token', {
         method: 'POST',
         body: JSON.stringify({
           identity: username,
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

   const preMeeting = useCallback(
     async event => {
       event.preventDefault()
       setPreviewToken(true)
     },
     []
   );
   const postMeeting = useCallback(
     async event => {
       event.preventDefault()
       setPostviewToken(true)
     },
     []
   );


   const handleLogout = useCallback(event => {
    setToken(null);
   }, []);



   var names = ['Adjon', 'Bik', 'Andrew', 'Tim'];
   var namesList = names.map(function(name){
     return <Col><Card style={{ width: '18rem' }}>
       <Card.Body>
         <Card.Title>{name}</Card.Title>
         <Card.Text>
           Coding interview with intern {name}
         </Card.Text>
         <Button variant="primary" onClick={handleClick}>Join Meeting</Button>
         <Button variant = "secondary" onClick={preMeeting}>View Candidate</Button>
         <Button variant = "info" onClick={postMeeting}>Post-interview analysis</Button>
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
     if(previewToken){
       render=(
         <Container>

         <Col>
         <img
         alt=""
         src={exampleResume}
         width="35%"
         height="35%"
         className="resume"
       />
       </Col>
         <Col className="cards"><Card style={{ width: '60rem' , height: '60rem'}}>
           <Card.Body>
             <Card.Title>Adjon: Generic Software Internship</Card.Title>
             <Card.Subtitle>
             <br/>
             <br/>
               WhiteBoard interview with intern Adjon<br /> <br/>
               Monday 1/27 10:30am<br/> <br/>
               UCSB Career Services Center
             </Card.Subtitle>
             <br/> <br/> <br/>
             <Card.Text>
             My Notes: <br/>
              • Good prior work experience <br/>
              • Relevant Courseworm <br/>
              • Low GPA -- ask why <br/>
             </Card.Text>
             <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
             <br/><br/><br/><br/>
             <Button variant="primary">Join Meeting</Button>
             <br/><br/>
             <Button variant="success">Back</Button>

           </Card.Body>
         </Card></Col></Container>


       )
     }

     else if(postviewToken){
       render = (
         <Container>
           <Col>
             <img
               alt=""
               src={facialAnalysis1}
               width="35%"
               height="35%"
               className="resume"
             />
           </Col>

           <Col className="cards"><Card style={{ width: '40rem' , height: '20rem'}}>
             <Card.Body>
               <Card.Title>Adjon's Post interview Analysis</Card.Title>
               <Card.Subtitle>
                 Position: Generic Software Intern
               </Card.Subtitle>
               <br/> <br/> <br/>
               <Card.Text>
                 My Notes: <br/>
                 • Good prior work experience <br/>
                 • Relevant Courseworm <br/>
                 • Low GPA -- ask why <br/>
               </Card.Text>
               <Button variant="success">Back</Button>

             </Card.Body>
           </Card></Col>

         </Container>
       )
     }
     else{
       render =(
         <Container>
         <Row>{ namesList }</Row>
         </Container>
       );
     }
   }



   return render;
 };
 export default Meetings;
