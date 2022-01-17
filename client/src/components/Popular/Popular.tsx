import { useState } from 'react'
import './popular.css'

const perfumes = [
  { 
    id: 0,
    title:"Fleur de Bonita No. II", 
    price: 135,
    size: "50ml",
    image: "assets/fleur-de-bonita-no-ii.png",
    category:"feminine",
    type: "Sensual, Warm",
    description:"Perfume for women. release year is 2018. It is being marketed by ars Parfum."
  },
  {
    id: 1,
    title:"Bonita Deluxe No. II", 
    price: 100,
    size: "100ml",
    image: "assets/bonita_deluxe_no_ii.png",
    category:"feminine",
    type: "Citrus/Fresh",
    description:"perfume for women. release year is 2016. It was last marketed by ars Parfum."
  },
  { 
    id: 2,
    title:"Bonita Men Le Bleu", 
    price: 22,
    size: "150ml",
    image: "assets/bonita-Men-Le-Bleu.png",
    category:"masculine",
    type: "Warm, spicy",
    description:"Bonita Men was released in 2015. It is being marketed by ars Parfum."
  },
];
   export const Popular = () => {
   
const [current, setCurrent] = useState(0)
const [name, setName] = useState(perfumes[current].title)
 const [text, setText] = useState(perfumes[current].description)
 const [image, setImage] = useState(perfumes[current].image)



    const update = () => {
      setName(perfumes[current].title);
      setText(perfumes[current].description);
      setImage(perfumes[current].image)
    }
    const handelClick = () => {
      setCurrent(current+1);

      if (current === 2) {
        setCurrent(0);
      }
      update();

    };

     return (
       <div>
         <svg
           onClick={handelClick}
           width="80%"
           height="80%"
           viewBox="0 0 100 60"
           id="carousel"
         >
           <defs>
             <mask id="Mask">
               <linearGradient id="boxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" style={{stopColor: "#333", stopOpacity: .5}} />
                 <stop offset="30%" style={{stopColor: "white", stopOpacity: .5}} />
                 <stop offset="60%" style={{stopColor: "white", stopOpacity: .5}} />
                 <stop offset="100%" style={{stopColor: "#233", stopOpacity: .5}} />
               </linearGradient>
               <rect
                 x="2.5"
                 y="2.5"
                 width="95"
                 height="50"
                 rx="2"
                 style={{fill: "url(#boxGradient)"}}
               />  
               <rect
                 x="5"
                 y="5"
                 width="90"
                 height="34"
                 rx="2"
                 style={{fill: "black"}}
               />  
               <text
                 id="prod-name"
                 name={name}
                 x="6"
                 y="50"
                 style={{
                   fontFamily: "Impact, Arial, Helvetica, sans-serif",
                   fontSize: "7pt",
                   fontWeight: "bold",
                   fill: "black"
                  }}
               >
                 {name}
                 </text>
               </mask>
           </defs>
              <image 
                   id="img0"
                   x="30"
                   y="5"
                   href={image}
                   width="46"
                   className="slider-image"
               />
           <rect
             mask="url(#Mask)"
             x="2.5"
             y="2.5"
             width="95"
             height="60"
             rx="2"
             style={{fill: "hsla(203, 93%, 25%, 95%)", pointerEvents: "none"}}
           />
           <text
             id="prod-text"
             x="3"
             y="57"
             style={{
               fontFamily: "Arial, Helvetica, sans-serif",
               fontSize: "2pt",
               maxWidth: "70ch",
               fontWeight: "bold",
               fill: "gray",
               pointerEvents: "none",
              }}
           >
             {text}
             </text>
         </svg>
       </div>
     )
   }
   
   