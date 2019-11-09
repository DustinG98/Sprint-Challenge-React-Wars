import React from 'react';
import styled from 'styled-components'

export default function StarWarsCard(props) {

    const Card = styled.section`
        padding: 2em;
        background: #1d1f1d;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 5% 5%;
        width: 300px;
        opacity: 0.9;
        color: white;
    `;
    return (
        <Card>
            <h2>{props.name}</h2>
            <p>Gender: {props.gender}</p>
            <p>Eye Color: {props.eyeColor}</p>
            <p>Hair Color: {props.hairColor}</p>
            <p>Height: {props.height}</p>
            <p>Mass: {props.mass}</p>
        </Card>
    )
}