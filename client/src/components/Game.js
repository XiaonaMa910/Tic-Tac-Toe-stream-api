import React, { useState } from "react";
import Board from "./Board";
import {Window,MessageList,MessageInput} from 'stream-chat-react'

function Game({channel, setChannel}){
    const [result,setResult]=useState({winner:'none',state:'none'})
    const [playersJoined,setPllayersJoined]=useState(
        channel.state.watcher_count===2
    )
    channel.on('user.watching.start',event=>{
        setPllayersJoined(event.watcher_count===2)
    })
    if (!playersJoined){
        return <div>Waiting for other player to join</div>
    }

    return <div className="gameContainer">

            <Board result={result} setResult={setResult} channel={channel}/>
            <Window>
                <MessageList
                    disableDateSeparator
                    closeReactionSelectorOnClick
                    hideDeletedMessages
                    messageActions={['react']}
                />
                <MessageInput noFiles />
            </Window>
            <button onClick={ async ()=>{
                await channel.stopWatching()
                setChannel(null)

            }}>Leave Game</button>
        </div>
}

export default Game