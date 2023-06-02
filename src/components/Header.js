import React from "react"
import faceImage from "../../public/images/face.png"

export default function Header(){
    return(
        <header className="header">
            <img className="faceImage" src={faceImage}/>
            <h2 className="header-title">Meme Generator</h2>
            <p className="paragraph-course">React Course - Project 3</p>
        </header>
    )
}