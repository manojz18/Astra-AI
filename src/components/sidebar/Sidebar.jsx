import React, {useState, useContext} from 'react'
import {assets} from '../../assets/assets'
import { Context } from '../../context/Context';

const Sidebar = () => {

  const {onSent, previousPrompts, newChat,
    setCurrentPrompt, resultData} = useContext(Context);

  const [extended, setExtended] = useState(false);

  const loadPrompt = async(prompt) => {
      setCurrentPrompt(prompt)
      await onSent(prompt)
  }

  return (
    <div className='sidebar'>

      <div className="top-part">

        {/* Expand Image Icon */}
        <img alt='expand-icon' className='expand-icon' src = {assets.menu_icon}
        onClick = {() => setExtended(prev => !prev)} />

        {/* NewChat */}
        <div onClick={() => newChat()} className="newChat" >
            <img alt='plus-icon' className='plus-icon' src={assets.plus_icon}/>
            {extended ? <p>New Chat</p> : null} 
        </div>

        {/* Previous Prompts History */}
        {extended ? <div className="previousPrompts">
          
          <p className='prevPrompt-title'>Previous Prompts</p>
          {
            previousPrompts.map((item, index) => {
              return(
                <div onClick={() => loadPrompt(item)} className='prompt-entry recent-entry'>
                  <img alt='message-icon' src={assets.message_icon}/>
                  <p>{item.slice(0, 15)}...</p>
                </div>
              )
            })
          }
          

        </div>
        :
        null }
        

      </div>

      {/* bottom part of menu bar */}
      <div className="bottom-part">

        <div className="bottom-item recent-entry">
          <img alt='help-icon' src={assets.question_icon} />
          {extended ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img alt='activity-icon' src={assets.history_icon} />
          {extended ? <p>Activity</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img alt='setting-icon' src={assets.setting_icon} />
          {extended ? <p>Setting</p> : null}
        </div>

      </div>

    </div>
  )
}

export default Sidebar