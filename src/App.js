import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {useSelector, useDispatch} from 'react-redux';
import { getQuote, getListItems } from './redux';
import { useEffect } from 'react';


//React:
const App = () => {
  
  const dispatch = useDispatch();
  const {quote, author} = useSelector((store) => store.newQuote)

  useEffect(() => {
    dispatch(getListItems());
    setTimeout(function() {
      dispatch(getQuote());
  }, 300);

  }, []);

  
  
  
  return (
    <div className="wrapper">
      <div id="quote-box">
        
        <div id= "textDiv">
          <h1 id ="text"> {quote}</h1>
        </div>


        <div id="textAuthor">
          <h1 id ="author"> -{author} </h1>
        </div>
        <button className='button btn' onClick = {() => {
          dispatch(getQuote());
        }}id= "new-quote">Change</button>
        <a className='button btn' id= "tweet-quote" target= "_blank" href= "https://twitter.com/intent/tweet">tweet</a>
        
      </div>
  </div>
  );
}

export default App;



