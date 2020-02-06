import React, { Component} from 'react';
import ScrollspyNav from "react-scrollspy-nav";

export default class Userlist extends Component {

      render() {
        return (
            <div>
                <div>
                    <ScrollspyNav
                        scrollTargetIds={["section_1", "section_2", "section_3"]}
                        offset={100}
                        activeNavClass="is-active"
                        scrollDuration="1000"
                        headerBackground="true"
                    >
                        <ul>
                            <li><a href="/"><span>Home</span></a></li>
                            <li><a href="#section_1"><span>Adjon</span></a></li>
                            <li><a href="#section_2"><span>Bik</span></a></li>
                            <li><a href="#section_3"><span>Ryan</span></a></li>
                        </ul>
                    </ScrollspyNav>
                </div>

                <div>
                    <div style={{"height": "400px"}}><span>Welcome!</span></div>
                    <div id="section_1" style={{"height": "500px"}}><span>Adjon</span></div>
                    <div id="section_2" style={{"height": "500px"}}><span>Bik</span></div>
                    <div id="section_3" style={{"height": "500px"}}><span>Ryan</span></div>
                </div>
            </div>
          );
      }

}
