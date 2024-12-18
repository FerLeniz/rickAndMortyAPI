import React from 'react'
import './Button.css'

export const Button = (props) => {

    return (
        <button onClick={props.onClick}  disabled = {props.disabled} className ="pagination-button">
            {props.text}
        </button>
    )
}
