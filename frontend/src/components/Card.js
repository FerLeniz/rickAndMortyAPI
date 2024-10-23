import React from 'react'
import './Card.css'

export const Card = (props) => {
    const characters = props.characters

    return (
        <div className="character-grid">
            {characters.map((character) => (
                <div key={character.id} className="character-card">
                    <img src={character.image} alt={character.name} className="character-image" />
                    <h2>{character.name}</h2>
                    <p><strong>Status:</strong> {character.status}</p>
                    <p><strong>Species:</strong> {character.species}</p>
                    <p><strong>Gender:</strong> {character.gender}</p>
                    <p><strong>Origin:</strong> {character.origin.name}</p>
                    <p><strong>Location:</strong> {character.location.name}</p>
                    <p><strong>Appearances:</strong> {character.episode.length}</p>
                </div>
            ))}
        </div>
    )
}
