import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  useEffect(() => {
    //여기서 데이터베이스에 있는 값을 가져온다.
    axios.get('/api/values')
      .then(response => {
        console.log('response', response)
        setLists(response.data)
      })
  }, [])
  
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  const ChangeHandler = (Event) => {
    setValue(Event.currentTarget.value)
  } 

  const submitHandler = (Event) => {
    Event.preventDefault();

    axios.post('/api/value', { value: value })
      .then(response => {
        if(response.data.success) {
          console.log('response', response)
          setLists([...lists, response.data])
          setValue("");
        } else {
          alert('값을 DB에 넣는데 실패했습니다.')
        }
      })
      
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력해주세요..."
              onChange={ChangeHandler}
              value={value}
              />
            <button type="submit">확인</button>
          </form>
          {lists && lists.reverse().map((list, index) => (
            <li key={index}>{list.value}</li>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
