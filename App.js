import './App.css';

/* I copied and pasted all the code from react, gave me an error, and I was really confused.
  I'm not even sure about how I should go about the fetch element and how it should really work.


'use strict';
const e = React.createElement; 
const domContainer = document.querySelector('#like_button_container');const root = ReactDOM.createRoot(domContainer);root.render(e(LikeButton));

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}



function fetch() {
  fetch('https://api.nasa.gov/index.html')
  
}

 <button onClick={()=>{console.log("Search for your NASA pictures")}}>Search for your NASA pictures</button>
*/

function App() {
  return (

    <div className="App">
      <header className="App-header">
        <div id='container'>
          <div>
            <input type="text" id="date-picker" name="date-picker" placeholder="Enter a date"></input>
            <input type="text" id="search-term" name="search-term" placeholder="Enter a search term"></input>
          </div>
        </div>
      </header>

      <body>
        <div id='body-container'>
          
        </div>
      </body>
    </div>
  );
}

export default App;

/*
  Mars Rover Project Directions. 

  Who doesn't love space? Using NASA's  public Mars Rover Photo API, allow the user to search for different Mars Rover pictures. Allow the user to search by date and search for 
  images from a particular rover and from a particular rover camera.
Nod

  Step 5: Using fetch request data from these APIs 
  Step 6: Use the data you've requested to build out the basic functionality of the site 
  Step 7: Add tests using Jest & React/Angular testing library to make sure your site always appears correctly
  Step 8: Make it pretty with CSS!  

*/ 