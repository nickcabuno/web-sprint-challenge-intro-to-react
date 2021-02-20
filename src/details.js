import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Details(props) {
  const { friendId, close } = props
  const [details, setDetails] = useState(null)

  useEffect(() => {
    axios.get('https://swapi.dev/api/people/')
      .then(res => { setDetails(res.data) })
      .catch(err => { debugger })
  }, [])

  

  return (
    <div className='detContainer'>
      <h2>Info:</h2>
      {
        details &&
        <>
          <p>{details.name} is {details.height}</p>
          <p>email is {details.gender}</p>
          {} likes:
          
        </>
      }
      <button onClick={close}>Close</button>
    </div>
  )
}
