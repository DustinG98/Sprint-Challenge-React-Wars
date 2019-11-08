import React, { useState,useEffect,useCallback, useRef } from 'react';
import './App.css';
import axios from 'axios';
import StarWarsCard from './components/starWarsCard'
import styled from 'styled-components'
import Paginate from './components/Pagination'



const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [isSending, setIsSending] = useState(false)
  const isMounted = useRef(true)


  const CardCont = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  `;

  // Fetch characters from the star wars api in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.
  useEffect(() => {
    axios.get(`https://swapi.co/api/people/?page=${page}`)
    .then(resp => {
      setCards(resp.data.results)
      console.log(resp.data)
    })
    .catch(err => {
      console.log(`There is no people. ${err}`)
    })
  }, [page])

  const nextPage = useCallback(() => {
    if(isSending) return
    setIsSending(true);
    setCards([]);
    axios.get(`https://swapi.co/api/people/?page=${page}`)
    .then(resp => {
      axios.get(`${resp.data.next}`)
      .then(response => {
        setCards(response.data.results)
      })
    })
    .catch(err => {
      console.log(`There is no people. ${err}`)
    })
    if(isMounted.current)
      setIsSending(false)
  }, [isSending, page])

  const previousPage = useCallback(() => {
    if(isSending) return
    setIsSending(true);
    setCards([]);
    axios.get(`https://swapi.co/api/people/?page=${page}`)
    .then(resp => {
        setCards(resp.data.results)
    })
    .catch(err => {
      console.log(`There is no people. ${err}`)
    })
    if(isMounted.current)
      setIsSending(false)
  }, [isSending, page])


  function handleClickNext(e, index) {
    e.preventDefault();
    setTimeout(() => {
      nextPage();
    }, 400)
  };
  function handleClickPrevious(e, index) {
    e.preventDefault();
    setTimeout(() => {
      previousPage();
    }, 400);
  }
  return (
    <div className="App">
      <h1 className="Header">React Wars</h1>
      <CardCont>
      {cards.map((cv, index) => {
        return <StarWarsCard key={index} name={cv.name} gender={cv.gender} eyeColor={cv.eye_color} hairColor={cv.hair_color} height={cv.height} mass={cv.mass} />
      })}
      </CardCont>
      <div>
        <button onClick={e => {
          handleClickNext(e, 2)
          }}>Next Page</button>
        <button onClick={e => {
          handleClickPrevious(e, 2)
          }}>Previous Page</button>
      </div>
    </div>
  );
}

export default App;

