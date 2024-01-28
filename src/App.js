import React, { Component } from 'react';
import './App.css';

const Quote = (props) => {
  return (
    <div>
      <p id="text">"{props.text}"</p>
      <p id="author">- <em>{props.author}</em></p>
    </div>
  )
};

const Button = ({ title, url, icon, target, handleFetch, handleStyle, href }) => (
  <a
    className="buttons"
    title={title}
    onClick={handleFetch && (() => handleFetch())}
    target={target}
    href={href}
  >
    <i className={icon} style={handleStyle}></i>
  </a>
);

const Buttons = (props) => {
  return (
    <div className="buttons-box">
      <Button
        title="Refresh quote!"
        url="new-quote"
        icon="fa-solid fa-rotate-right"
        handleFetch={props.handleFetch}
        handleStyle={props.handleStyle}
      />
      <Button
        title="Tweet quote!"
        url="tweet-quote"
        icon="fa-brands fa-x-twitter"
        target="_blank"
        handleStyle={props.handleStyle}
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${props.text} -- ${props.author}`)}`}
      />
    </div>
  );
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      quote: '',
      author: '',
      colorIndex: 0
    };
    this.colors = [
      "#2c3e50","#c0392b","#d35400","#e74c3c","#e67e22",
      "#f39c12","#2ecc71","#27ae60","#16a085","#1abc9c",
      "#3498db","#2980b9","#9b59b6","#8e44ad","#34495e"
    ];
    this.handleFetch = this.handleFetch.bind(this);
  }
  
  handleFetch() {
    const endpoint = 'https://api.quotable.io/random';
    fetch(endpoint)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
      .then(data => { 
        console.log(data);
        this.setState(prevState => ({
          quote: data.content,
          author: data.author,
          colorIndex: (prevState.colorIndex + 1) % this.colors.length
        }));
      })
      .catch(error => { console.error('There was a problem with the fetch operation:', error) }); 
  }
  
  componentDidMount() {
    this.handleFetch();
  }
  
  render() {
    const bodyStyle = {
      backgroundColor: this.colors[this.state.colorIndex],
      transition: 'background-color 0.5s ease'
    };
    const quoteStyle = {
      color: this.colors[this.state.colorIndex],
      transition: 'background-color 0.5s ease'
    };

    return (
      <div id="canvas" style={bodyStyle}>
        <div id="quote-box" style={quoteStyle}>
          <Quote text={this.state.quote} author={this.state.author} />
          <Buttons
            handleFetch={this.handleFetch} 
            handleStyle={quoteStyle} 
            text={this.state.quote} 
            author={this.state.author} />
        </div>
        <footer><p>by gitped</p></footer>
      </div>
    )
  }
};

export default App;
