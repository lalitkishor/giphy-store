import React, {useEffect, useRef, useState} from 'react';
import './card.css';


function Card({url, index, link, gifList, ratio, setLoaderHeight, layoutWidth, layoutColumn}){
    const [top, setTop]= useState(0);
    const elementRef = useRef(null);
    const gifRef = useRef(null);
    const color = '#'+(Math.random().toString(16)+'00000').slice(2,8);

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

   return <a href={link} target="_blank" className="giphyLink" rel="noreferrer"
   style={{transform: `translate3d(${layoutWidth * (index % layoutColumn )}px, ${top}px, 0px)`}}>
       <div className="card" ref={elementRef} style={{background: color}}>
       <img ref={gifRef} src={url} width={layoutWidth}  height={layoutWidth/ratio} alt="gif" loading="lazy" className="gif"/>
   </div>
   </a>
}

export default Card;
