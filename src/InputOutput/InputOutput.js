import React from "react";

function InputOutput(props){
    
   
    return (
        <>
        <div id='input_output'>
            <div id='box'>
              <h2>Input: </h2>
              <textarea  
               value={props.stdinput}
               onChange={props.updateInput}
               id="box_area"
               >
               </textarea>
            </div>
      
            <div id='box'>
              <h2>Output: </h2>
              <textarea 
               value={props.output}
               id="box_area"
               disabled
               style={{ color: props.color }}
              >
              </textarea>
            </div>
      </div>
        </>
    );
}

export default InputOutput;