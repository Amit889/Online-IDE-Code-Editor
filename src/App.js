import React, { useState } from 'react';
import Navbar  from './Navbar/Navbar';
import Editor from './Editor/Editor';
import InputOutput from './InputOutput/InputOutput';
import  {cpp} from "./SampleCode/code.js"
import axios from "axios";
import qs from "qs";


import './App.css';

function App() {
  // store the code of the text area
  const [code, codefun] = useState(cpp);
  // store the language option
  const [language,languagefun] = useState("cpp");
  // store std input value
  const [stdinput,stdinputfun] = useState("");
  // store the output value
  const [output,outputfun] = useState("");
  // store code is running or not
  const [running,runfun] = useState(false);
 
  // function to update changes done in the text area
  const updateCode = (event)=>{
    codefun(event.target.value);
  }

  // function to update language
 const updatelanguage = (event)=>{
     console.log(event.target.value);
     languagefun(event.target.value);
 }

 // function to update stdinput value
 const updateInput = (event)=>{
   console.log(event.target.value);
   stdinputfun(event.target.value);
 }


	const handleSubmit = async () => {
    runfun(true);
    outputfun("")
    const data = qs.stringify({
      code:code,
      language: language,
      input: stdinput,
    });
    const config = {
      method: "post",
      url: "https://codex-api.herokuapp.com/",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    
    axios(config)
      .then(function (response) {
        console.log(response.data);
       if(response.data.success) outputfun(response.data.output);
       else outputfun(response.data.error);
        runfun(false);// set running false
      })
      .catch(function (error) {
        console.log(error);
        runfun(false);// set running false
      });

	};

  return (
    <div className="App" id='App'>
      <div id='container'>
          <Navbar
            handleSubmit = {handleSubmit}
            updatelanguage = {updatelanguage}
            run = {running}
          ></Navbar>
      <div id="container_boxes">
        <Editor
          code = {code}
          updateCode = {updateCode}
        ></Editor>
        <InputOutput
          output = {output}
          stdinput = {stdinput}
          updateInput = {updateInput}
        ></InputOutput>
      </div>
      
    </div>  
    </div>
  );
}

export default App;
