import React, { useEffect,useState } from "react";
import './App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const QuoteGenterator = () =>{
   const[quote,setQuote]=useState({text:"",author:""});
   const [backgroundColor, setBackgroundColor] = useState('lightblue');

   const fetchQuote = async () => {
    try {
      const response = await fetch('https://type.fit/api/quotes');
      const data = await response.json();
  
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No quotes found in the API response.');
      }
  
      // Randomly select a quote from the response
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex];
  
      setQuote({ text: randomQuote.text, author: randomQuote.author });
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  }; 
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
useEffect(()=>{
  fetchQuote(); 
},[]);

const handleNewquote =()=>{
  fetchQuote();
  const newColor = getRandomColor();
    setBackgroundColor(newColor);
}
return (
  <div id="body" className="d-flex align-items-center justify-content-center "  style={{ backgroundColor: backgroundColor }}>
  <div id="quote-box" className=" bg-secondary bg-gradient border border-primary  " >
    <div id="text" className="text-center text-wrap mt-5 " style={{color:backgroundColor}}>{quote.text}</div>
    <div id="author" className="text-end mt-1 text-white">{quote.author}</div>
    <div className=" mt-4 ms-3">
            <Button id="new-quote" onClick={handleNewquote} className="btn-primary ">
              New Quote
            </Button>
          
            <a href="https://twitter.com/intent/tweet" id="tweet-quote" className="ps-5">Tweet this quote</a>


    </div>
  </div>
  </div>
 

);
}
export default QuoteGenterator;