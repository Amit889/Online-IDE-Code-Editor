import React, { useState } from "react";
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import LANGUAGES from "../language/language";

function Navbar(props){
  const [lan,lanfun] = useState(LANGUAGES);
    return (
        <>
      <div id='navbar'>
        <div id="navbar_select">
        <Button variant="outlined" onClick={props.handleSubmit} id="button_run">Run<PlayArrowIcon></PlayArrowIcon></Button>
        <select name="language" id="language_select" onChange={props.updatelanguage}>
          {
            lan.map((elem)=>{
              return (<option key={elem.id} value={elem.id}>{elem.name}</option>)
            })
          }
            {/* <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="py">Python</option>
            <option value="c">C</option>
            <option value="cs">C#</option>
            <option value="js">NodeJS</option> */}
        </select>
        </div>
        

        {props.run?<Button id="button_running">Running.....</Button>:""}
      </div>
        </>
    );
}

export default Navbar;