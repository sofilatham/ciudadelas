import { React, useState } from 'react'
import '../../../assets/styles/Carousel.css'
import arrow_next_left from '../../../assets/images/arrow_next_left.png'
import arrow_next_right from '../../../assets/images/arrow_next_right.png'
import Div_1 from './divs/div_1.jsx'
import Div_2 from './divs/div_2.jsx'
import Div_3 from './divs/div_3.jsx'
import Div_4 from './divs/div_4.jsx'
import Div_5 from './divs/div_5.jsx'
import Div_6 from './divs/div_6.jsx'
import Div_7 from './divs/div_7.jsx'


const divs = []
divs.push(<Div_1/>)
divs.push(<Div_2/>)
divs.push(<Div_3/>)
divs.push(<Div_4/>)
divs.push(<Div_5/>)
divs.push(<Div_6/>)
divs.push(<Div_7/>)



export default function Carousel() {
  const [swipe, setSwipe] = useState(0);
 
  const actualizar_swipe_right = () => {
    if (swipe < divs.length -1){
      setSwipe(swipe => swipe + 1);
    }
  };

  const actualizar_swipe_left = () => {
    if (swipe > 0){
      setSwipe(swipe => swipe - 1);
    }
  };
 
  return (
    <div className='carousel'>
        <button onClick={actualizar_swipe_left}>
          <img src={arrow_next_left}></img>
        </button>
        <div className='div_container'>
            {divs[swipe]}
        </div>
        <button onClick={actualizar_swipe_right}>
          <img src={arrow_next_right}></img>
        </button>
    </div>
    
    
  );
}