import React from "react";


function Editor(props){
    return (
        <>
        <div id='code_editor'>
          <textarea
            value={props.code}
            onChange={props.updateCode}
            id="code_area"
          >
          </textarea>  
       </div>
        </>
    );
}

export default Editor;