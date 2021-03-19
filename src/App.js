import userEvent from '@testing-library/user-event';
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import styled from 'styled-components'
// import Details from './details'



const App = () => {
  const [starFriends, setStarFriends] = useState([])
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
        setStarFriends(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const StyledFriend = styled.div`
  
  font-weight: bold;
  width: 60%;
  justify-content: space-between;
  margin: 5%;
  `
  function Friend({ info, action }) {
    return (
    <StyledFriend>
    {info.name}
      {/* <button className="button" onClick={() => action(info.name)}>
        See Info
      </button> */}
      <p>Birth Year: {info.birth_year}</p>
      <p>Height: {info.height}</p>
      <p>Mass: {info.mass}</p>
      <p>Gender: {info.gender}</p>
      <p>Hair Color: {info.hair_color}</p>
    </StyledFriend>
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
        starFriends.map(fr => {
          return <Friend key={fr.name} info={fr} action={openDetails} />
        })
      }
      {/* {
        currentFriendId && <Details friendId={currentFriendId} close={closeDetails} />
      } */}
      </div>
    </div>
  )
}

export default App;
