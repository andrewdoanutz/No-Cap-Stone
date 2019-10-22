import React, { Component } from "react";

export default class MeetingForm extends Component {

    //save state - track meeting name
    constructor(props){
      super(props);
      this.state = {
          meeting: ""
      };
    }
    onChange = e =>{
        let{name, value} = e.target;
        this.setState({[name]:value})
    };
    onSubmit =e =>{
      e.preventDefault();
      console.log("Submit", this.state.meeting);
      this.props.selectMeeting(this.state.meeting);
      this.setState({meeting:""});
    };


    render() {
        return (
            <div>
                <form>
                    <label>Meeting Name</label>
                    <input
                        placeholder="Meeting Name"
                        name = "meeting"
                        defaultValue = {this.state.meeting} // grab state
                    />
                    <input type="submit" value="Join Meeting" />
                </form>
            </div>
        );
    }
}
