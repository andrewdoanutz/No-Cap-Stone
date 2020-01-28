import React from "react";

import "../css/profile.css";

const Profile=(props)=>{

    return (
      <div className="cont">
     
        <img className="image"
          id="profileImage"
          src={props.image}
          alt="profileimage"
        />
        
        <div className="info">
          <div className="category">Name: </div> <div >{props.name}</div><div/>
          <div className="category">Year/Major: </div> <div >{props.yearMajor}</div><div/>
          <div className="category">LinkedIn: </div> <div ><a href={props.linkedIn}>Click Here</a></div><div/>
        </div>
      </div>
    );
  
}

export default Profile;
