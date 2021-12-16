import React, {useEffect, useRef, useState} from 'react';
import './card.css';


function Card({ index, gifList, gifObj, setLoaderHeight, layoutWidth, layoutColumn}){
    const [top, setTop]= useState(0);
    const [play, setPlay] = useState(true);
    const elementRef = useRef(null);
    const canvasRef = useRef(null);
    const color = '#'+(Math.random().toString(16)+'00000').slice(2,8);
    const {url, link, ratio, title} = gifObj;

    useEffect(()=>{
        let newTop = 0;
        let storeIndex = [];
        if(index >= layoutColumn) {
            for (let i = index;  i >= 0; i = i-layoutColumn){
                i!== index && storeIndex.push(i);
            }
            storeIndex.forEach(gifIndex=>{
                newTop = newTop + layoutWidth/gifList[gifIndex].ratio;
            });
            setTop(newTop);
        } 
        if(index === gifList.length - 1){
            setLoaderHeight(newTop + gifList[gifList.length - 1].height );
        }
   },[]);

   const toggle = (e)=>{
    e.preventDefault();
    setPlay(false);
    if(play == false) {
        setPlay(true);
        return;
    }
    
    setTimeout(()=>{
        let ctx = canvasRef.current.getContext('2d');
        let img = new Image();
        img.onload = function(e) {
        ctx.drawImage(img, 0, 0,layoutWidth,(layoutWidth/ratio));
        };
        img.src = url;
    },5)
    return false;
   }

   return <a  href={link} target="_blank" className="giphyLink" rel="noreferrer"
   style={{transform: `translate3d(${layoutWidth * (index % layoutColumn )}px, ${top}px, 0px)`}}>
       <div className="card" ref={elementRef} style={{background: color, width:layoutWidth, height:layoutWidth/ratio}}>
        {
            play ? <img src={url} width={layoutWidth}  height={layoutWidth/ratio} alt={title} loading="lazy" className="gif"/>
            : <canvas ref={canvasRef} id="meuCanvas" style={{height:'100%',width:'100%'}}></canvas>
        }
        <button onClick={toggle} className="button pauseButton">{play ? "pause" : "play"}</button>
    </div>
   </a>
}

export default Card;
