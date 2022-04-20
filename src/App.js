import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id='container'>
        <div>
        <input type="text" id="date-picker" name="date-picker"></input>
        <input type="text" id="search-term" name="search-term"></input>
        </div>
        <button onClick={()=>{console.log("search")}}>search</button>
        </div>
      </header>
    </div>
  );
}

export default App;
