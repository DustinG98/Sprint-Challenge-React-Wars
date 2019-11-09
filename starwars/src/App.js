import React, { useState,useEffect } from 'react';
import './App.css';
import axios from 'axios';
import StarWarsCard from './components/starWarsCard'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Page1 from './imgdata/page1'


const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.
  const [cards, setCards] = useState([]);

  
  const Button = styled.button`
    border-radius: 10px;
    padding: 5px 20px;
    background-color: white;
    border: 2px solid #1d1f1d;
    opacity: 0.8;
    color: #1d1f1d;
    margin: 0 25px;
    font-weight: 700;

    &:hover {
      background-color: #1d1f1d;
      border: 2px solid white;
      color: white;
    }
  `;

  const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        justify:'center',
        margin: 'auto',
        flexDirection: 'column',
      },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
  }));


  // Fetch characters from the star wars api in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = event => {
    setSearchTerm(event.target.value)
  }

  if(page === 0){
    setPage(9);
  } else if(page > 9){
    setPage(1);
  }

  useEffect(() => {
    setCards([]);
    axios.get(`https://swapi.co/api/people/?page=${page}`)
    .then(resp => {
      setCards(resp.data.results)
    })
    .catch(err => {
      console.log(`There is no people. ${err}`)
    })
  }, [page])

  const classes = useStyles();
  

  let itemStr;
  let imgSrc;
  return (
    <div className="App">
      <h1 className="Header">React Wars</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <Grid container className={classes.root} spacing={0}>
        <Grid item xs={3}>
        {
        cards.map((cv, index) => {
          Page1.forEach((source, index2) => {
            return (index === index2) ? imgSrc = source.src : null;
          })
          for(var item in cv){
            itemStr = cv[item] + "";
            if(itemStr.toLowerCase().includes(searchTerm.toLowerCase())){
              return <StarWarsCard src={imgSrc} key={index} name={cv.name} gender={cv.gender} eyeColor={cv.eye_color} hairColor={cv.hair_color} height={cv.height} mass={cv.mass} />
            } else if(searchTerm === ''){
              return <StarWarsCard src={imgSrc} key={index} name={cv.name} gender={cv.gender} eyeColor={cv.eye_color} hairColor={cv.hair_color} height={cv.height} mass={cv.mass} />
            } 
          }
          return null;
        })}
        </Grid>
      </Grid>
      <div>
        <Button onMouseDown={() => setPage(page-1)} >{'<'}</Button>
        <Button onMouseDown={() => setPage(page+1)}>{'>'}</Button>
      </div>
    </div>
  );
}

export default App;

