import React, { useEffect, useState } from "react";
import Square from "./Square";
import { useChatContext,useChannelStateContext } from "stream-chat-react";
import { Patterns } from "./WinningPatterns";

function Board({result, setResult, channel}){
    const [board,setBoard]=useState(['','','','','','','','',''])
    const [player,setPlayer]=useState('X')
    const [turn,setTurn]=useState('X')
    const {client}=useChatContext()
    const [gameOver, setGameOver] = useState(false);
    useEffect(()=>{
        checkWin()
        checkIfTie()
    },[board])
    const chooseSquare=async (square)=>{
        if (gameOver) return
        if(turn===player && board[square]===''){
            setTurn(player==='X' ? 'O' : "X")
            await channel.sendEvent({
                type:'game-move',
                data:{square,player}
            })

       
            setBoard(board.map((val,index)=>{

                if (index===square && val===''){
                   return player
            }
            return val
        }))
        }
    }
    channel.on((event)=>{
        if (event.type==='game-move' && event.user.id!==client.userID){
            const currentPlayer=event.data.player==='X'? 'O': "X"
            setPlayer(currentPlayer)
            setTurn(currentPlayer)
            setBoard(
                board.map((val,index)=>{
                    if (index===event.data.square && val===''){
                       return event.data.player
                }
                return val
            })
            )
        }
    })
    const checkWin=()=>{
        Patterns.forEach((currPattern)=>{
            const firstPlayer=board[currPattern[0]]
            
            if (firstPlayer=='') return
            
            let foundWinningPattern=true
            currPattern.forEach((idx)=>{
                if (board[idx]!=firstPlayer){
                    
                    foundWinningPattern=false
                }
            })
            if (foundWinningPattern){
                alert(`${firstPlayer} Win!`)
                setResult({winner:firstPlayer,state:"win"})
                setGameOver(true)
            }
        })

    }
    const checkIfTie=()=>{
        if (gameOver) return
        let filled=true
        board.forEach((square)=>{
            if (square==''){
                filled=false
            }
        })
        if (filled){
            alert('Game Tied')
            setResult({winner:'none',state:'tie'})
            setGameOver(true)
        }
    }

    return(

            <div className="board" >
                <div className="row">
                    <Square val={board[0]}
                    chooseSquare={()=>chooseSquare(0)}/>
                    <Square val={board[1]}
                    chooseSquare={()=>chooseSquare(1)}/>
                    <Square val={board[2]}
                    chooseSquare={()=>chooseSquare(2)}/>

                </div>

                <div className="row">
                    <Square val={board[3]}
                    chooseSquare={()=>chooseSquare(3)}/>
                    <Square val={board[4]}
                    chooseSquare={()=>chooseSquare(4)}/>
                    <Square val={board[5]}
                    chooseSquare={()=>chooseSquare(5)}/>

                </div>

                <div className="row">
                    <Square val={board[6]}
                    chooseSquare={()=>chooseSquare(6)}/>
                    <Square val={board[7]}
                    chooseSquare={()=>chooseSquare(7)}/>
                    <Square val={board[8]}
                    chooseSquare={()=>chooseSquare(8)}/>

                </div>

            </div>

      

        
    )

}

export default Board