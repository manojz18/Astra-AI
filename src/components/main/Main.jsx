import React, { useContext } from 'react'
import {assets} from '../../assets/assets'
import StartButton from '../StartButton'
import {Context} from '../../context/Context'

const Main = () => {
  const {onSent, showResult, userInput, setUserInput, loading,
     currentPrompt, resultData} = useContext(Context);
  return (
    <div className='main'>
      <nav className="nav">
        <p>Astra</p>
        <img src={assets.user_icon} alt='user-icon' className='user-icon' />
      </nav>


      <div className="main-container">
        
        <div className="greet">
          {
          !showResult ?
          
            <>
              <p className='hello'>Hello, </p>
              <p>How can I assist you today?</p>
            </>
            :
            <div className="result">

              <div className="result-title">
                <img src={assets.user_icon} className='user-icon' alt='user-icon'/>
                <p className='currentPrompt-text'>{currentPrompt}</p>
              </div>

              <div className="resData">
                {
                  loading ? 
                  <div className='loader'>
                    <hr />
                    <hr />
                    <hr />

                  </div>
                  :
                  <p className='result-response' dangerouslySetInnerHTML={{__html:resultData}}></p>
                }
                
              </div>

            </div>
         
          }
        </div>

        <StartButton />
      </div>
      
    </div>
  )
}

export default Main