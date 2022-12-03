import React, { useState } from 'react';
import Navbar  from './Navbar/Navbar';
import Editor from './Editor/Editor';
import InputOutput from './InputOutput/InputOutput';
import  {cpp} from "./SampleCode/code.js"
import axios from "axios";

import './App.css';

function App() {
  // store the code of the text area
  const [code, codefun] = useState(cpp);
  // store the language option
  const [languageID,languageIDfun] = useState(54);
  // store std input value
  const [stdinput,stdinputfun] = useState("");
  // store the output value
  const [output,outputfun] = useState("");
  // store code is running or not
  const [running,runfun] = useState(false);
  //color code
  const [color,colorfun] = useState("black");

 
  // function to update changes done in the text area
  const updateCode = (event)=>{
    codefun(event.target.value);
  }

  // function to update language
 const updatelanguage = (event)=>{
    // console.log(event.target.value);
     languageIDfun(event.target.value);
 }

 // function to update stdinput value
 const updateInput = (event)=>{
  // console.log(event.target.value);
   stdinputfun(event.target.value);
 }

 

  const getTokenData = async (token) => {
	//	console.log("checking status")
    const options = {
      method: "GET",
      url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        'X-RapidAPI-Key':  process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST
      }
    };
    try {
      let response = await axios.request(options);
      const statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        //  processing --> so run again the same token after 2s
        setTimeout(() => {
          getTokenData(token)
        }, 2000)
        runfun(false);
        return
      } else {
        
          // console.log(response.data);

         if(statusId===6){

              outputfun(atob(response.data.compile_output));
              colorfun("#E74C3C");

         }else if(statusId===3){
  
              outputfun(atob(response.data.stdout));
              colorfun("black");
  
         }else if(statusId===5){
  
               outputfun("Time Limit Exceeded!");
               colorfun("#E74C3C");

         }else{
  
               outputfun(atob(response.data.stderr));
               colorfun("#E74C3C");

         }
        runfun(false);
        return
      }
    } catch (err) {
      console.log("err", err);
      runfun(false);
    }
  };


  // method to get data on submit
	const handleSubmit = async () => {
    runfun(true);
    outputfun("")
    const data = {
      language_id: languageID,
      source_code: btoa(code),
      stdin: btoa(stdinput),
    };
  //  console.log("data: ");
  //  console.log(data);
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key':  process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST
      },
      body: JSON.stringify(data)

    };
    
       fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*', options)
      .then(async(response) => {
        const val = await response.json();
       // console.log(val.token);
        getTokenData(val.token);
        //runfun(false);
      })
      .catch((err) => {
        console.error(err)
        runfun(false);
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
          color = {color}
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
