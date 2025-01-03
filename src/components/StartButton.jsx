import React, {useState, useContext} from "react"
import { assets } from "../assets/assets";
import {Context} from '../context/Context'

const StartButton = () => {
    const [isStarted, setIsStarted] = useState(false);

    const {onSent, showResult, userInput, setUserInput, loading,
        currentPrompt, resultData} = useContext(Context);

    function startClickHandler(){
        setIsStarted(true);
    }

    function changeHandler(event){
        event.preventDefault();
        setUserInput(event.target.value);
    }

    return(
        <div className="button-container">
            {!isStarted &&(
                <div>
                    <button className="strt-btn" onClick={startClickHandler}>
                        Start Exploring
                    </button>
                </div>
            )}

            {isStarted && (
                <div className="userInput">
                    <div className="input-container">
                        <input type="text" onChange={changeHandler} 
                        className="input-field" placeholder="Enter a prompt here"
                        value = {userInput}/>

                        {
                            userInput ? 

                            <img src={assets.send_icon} className="send-btn" alt="send-icon" 
                            onClick={() => onSent()}/> 

                            : 
                            null
                        }

                        
                    </div>
                    <p className="warning-text">Astra can make mistakes. Check important info.</p>
                </div>
            )}

        </div>
    )
}

export default StartButton