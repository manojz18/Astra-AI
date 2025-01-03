import React, { useState } from 'react'
import { createContext } from 'react';
import run from '../sourceCode'
export const Context = createContext();

const ContextProvider = (props) => {
    const [previousPrompts, setPreviousPrompts] = useState([]);
    const [currentPrompt, setCurrentPrompt] = useState('');
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');
    const [showResult, setShowResult] = useState(false);

    const delayPara = (index, nextWord) => {
        setTimeout(function(){
            setResultData(prev => prev + nextWord)
        },75*index)
    }

    const newChat = () =>{
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt !== undefined){
            response = await run(prompt);
            setCurrentPrompt(response)
        }
        else{
            setPreviousPrompts(prev => [...prev, userInput]);
            setCurrentPrompt(userInput);
            response = await run(userInput);
        }
        
           
        let responseArray = response.split("**")
        let newResponse = "" ;

        for (let i = 0; i < responseArray.length; i++){
            if(i === 0 || i % 2 === 0){
                newResponse += responseArray[i]
            }
            else{
                newResponse += "<b><i>" +responseArray[i] + "</i></b>"
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>")

        setLoading(false);

        // setResultData(newResponse2);
        let newResponseArray = newResponse2.split(" ")

        for(let i = 0; i < newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord+" ");
        }

        setUserInput("")
    }


    const contextValues = {
        previousPrompts,
        setPreviousPrompts,
        currentPrompt,
        setCurrentPrompt,
        userInput,
        setUserInput,
        loading,
        setLoading,
        resultData,
        setResultData,
        showResult,
        setShowResult,
        onSent, 
        newChat
    }
    return (
        <Context.Provider value={contextValues}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider