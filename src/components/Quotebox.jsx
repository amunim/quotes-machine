import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from 'react';

const quotes = [
    {
        author: "Aristotle",
        quote: "First, have a definite, clear practical ideal; a goal, an objective. Second, have the necessary means to achieve your ends; wisdom, money, materials, and methods. Third, adjust all your means to that end."
    },
    {
        author: "Oprah Winfrey",
        quote: "You become what you believe."
    },
    {
        author: "Audrey Hepburn",
        quote: "Nothing is impossible, the word itself says, “I’m possible!”"
    }
];
const colors = ["red", "grey", "green"];


const getRandomQuote = () => getRandom(quotes);
const getColor = () => getRandom(colors);
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

class QuoteBox extends React.Component
{
  constructor(props)
  {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      quote: getRandomQuote(),
      fadein: false,
      fadeout: false,
      color: getColor()
    };
  }

  handleChange()
  {
    const newColor = getRandom(colors.filter(x => x != this.state.color));
    this.setState({
      fadein: false,
      fadeout: true,
      color: this.state.color + newColor
    });    
    
    setTimeout(() => 
    {
      this.setState({
        quote: getRandomQuote(),
        fadeout: false,
        fadein: true,
        color: newColor
      })
    }, 1000)
  }

  render()
  {
    const fadeHandler = this.state.fadein ? "fadein": this.state.fadeout ? "fadeout" : "";
    return (
      <div className={"App " + this.state.color}>
      <div id="quote-box" className="shadow p-3 mb-5 bg-body rounded">
        <FontAwesomeIcon icon={faQuoteLeft} id="leftq" size="2x" className={fadeHandler}/>
        <span id="text" className={fadeHandler}>   {this.state.quote.quote}</span>
        <p id="author" className={fadeHandler}> - {this.state.quote.author}</p>
        <div className="buttons">
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(this.state.quote.quote)}`} target="_blank" className={this.state.color + ` btn` } id="tweet-quote">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <button onClick={this.handleChange} className={this.state.color + ` btn change` }>New Quote</button>
        </div>
      </div>
      </div>
    )
  }
}

export default QuoteBox;
