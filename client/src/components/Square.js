import React from "react";
import Board from "./Board";
function Square({chooseSquare,val}){

    return(
        <div className="square" onClick={chooseSquare}>
           {val}

        </div>
    )

}

export default Square