import React from 'react'
import './Card.css'

export const Card = (props) => {
    const characters = props.characters

    return (
        <div className="character-grid">
            {characters.map((character) => (
                <div key={character.id} className="character-card">
                    <img src={character.image} alt={character.name} className="character-image" />
                    <div className="character-details">
                        <h2>{character.name}</h2>
                        <p>{character.gender}</p>
                        <p className={`status-text ${character.status.toLowerCase()}`}>{character.status}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
