import userEvent from '@testing-library/user-event';
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import styled from 'styled-components'
// import Details from './details'



const App = () => {
  const [friends, setFriends] = useState([])
  const [currentFriendId, setCurrentFriendId] = useState('')

  const openDetails = people => {
    setCurrentFriendId(people)
  }

  const closeDetails = () => {
    setCurrentFriendId(null)
  }

  useEffect(() => {
    axios.get('https://swapi.dev/api/people/')
      .then(res => {
        setFriends(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const StyledFriend = styled.div`
  
  font-weight: bold;
  width: 60%;
  justify-content: space-between;
  `
  function Friend({ info, action }) {
    return (
    <StyledFriend>
    {info.name}
      <button className="button" onClick={() => action(info.name)}>
        See Info
      </button>
    </StyledFriend>
  )
  }

  function Details(props) {
    const { friendId, close } = props
    const [details, setDetails] = useState([])

  useEffect(() => {
    axios.get('https://swapi.dev/api/people/')
      .then(res => { setDetails(res.data) })
      .catch(err => { debugger }) 
  }, [])
  

  return (
    <div className='container'>
      <h2>Details:</h2>
          <p>{details.results} idk i tried so many different things and just could not get the data to show up here, that is also why everything is in one file bc i got frustrated w it and wanted to see it all in front of me, i even literally took code from our guided project (i had my own code and this current setup prior to copying, i just wanted to see if it'd work, and it's now 8pm and i have to turn it in so it's just staying this way) and regardless, it still wouldn't work :(( {details.birth_year}</p>
          <p></p>
      <button onClick={close}>Close</button>
    </div>
  )
}

  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

  // Fetch characters from the API in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.

  return (
    <div className='container'>
      <h1 className="h1">STARSTUFF</h1>
      <div className="picDiv">

      {
        friends.map(fr => {
          return <Friend key={fr.name} info={fr} action={openDetails} />
        })
      }
      {
        currentFriendId && <Details friendId={currentFriendId} close={closeDetails} />
      }
      </div>
    </div>
  )
}

export default App;
