import React from "react"
import buttonImage from "../../public/images/button-image.png"

export default function Meme(){

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
        })

    const [allMemes, setAllMemes] = React.useState([])
    
    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])

    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    let canvas, ctx, img, link;

    function initElements() {
      canvas = document.createElement('canvas');
      ctx = canvas.getContext('2d');
      img = new Image();
      link = document.createElement("a");
    }

    function downloadMeme() {
      img.crossOrigin = "anonymous";
      img.src = meme.randomImage;
      img.onload = () => {
    let maxCanvasWidth = 500;
    let maxCanvasHeight = 500;
    let ratio = Math.min(maxCanvasWidth / img.width, maxCanvasHeight / img.height);
    canvas.width = img.width * ratio;
    canvas.height = img.height * ratio;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.font = "30px Impact";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(meme.topText, canvas.width / 2, 40);
    ctx.fillText(meme.bottomText, canvas.width / 2, canvas.height - 20);

    let dataURL = canvas.toDataURL();
    link.download = "meme-generator";
    link.href = dataURL;
    link.click();
    };
    img.onerror = () => {
    console.error("Error loading image");
  }
}
    initElements();

    return(
        <main>
            <div className="form">
                <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Top text" 
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Bottom text" 
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form-button" 
                    onClick={getMemeImage}>
                    <img className="button-image"src={buttonImage}/>
                </button>
            </div>
            <div className="meme">
                <img className="meme-image" src={meme.randomImage}/>   
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
            <button className="download-button" 
            onClick={() => downloadMeme(meme.randomImage)}
            >
            Download Meme
            </button>
             
        </main>
    )
}