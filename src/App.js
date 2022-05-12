import './App.css';
import React, { useEffect, useState } from 'react';


const App = () => {

  const [photos, setPhotos] = useState([]);
  const [camera, setCamera] = useState('');
  const [rover, setRover] = useState('');
  const [date, setDate] = useState('');
  const [url, setURL] = useState('');

  //let images = <h3>search results will go here</h3>
  const constructURL = (camera, rover, date) => {
    const userURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?earth_date=" + date + "&camera=" + camera + "&api_key=DEMO_KEY";
    return userURL
    // Adjust the URL to make sure if the user hasn't inputted a camera, rover or date;
  
  }
  
  const getDate = (d) => {
    const inputedDate = d.target.value;
    setDate(d.target.value);
    console.log(date);
  }

  const getRover = (r) => {
    const inputedRover = r.target.value;
    setRover(r.target.value);
    console.log(inputedRover);
  }

  const getCamera = (c) => {
    const inputedCamera = c.target.value;
    setCamera(c.target.value);
    console.log(inputedCamera);
  }
  const gettingInfo = () => {
    fetch(url)
    .then((response) => {return response.json()
  }).then((result) => {setPhotos(result['photos'])})
    .catch(() => console.log("Fetch Failed")) 
  }; 
  
  useEffect(() => {
    const newUrl = constructURL(camera, rover, date)
    setURL(newUrl)
  },[date, camera, rover])


  return (
    <div className="App">
      <header className="App-header">
        <div id='container'>
          <div>
            <input type="text" id="date-picker" name="date-picker" placeholder="Enter a date" onChange={getDate}></input>
            <input type="text" id="rover" name="rover" placeholder="Enter a rover" onChange={getRover}></input>
            <input type="text" id="camera" name="camera" placeholder="Enter a camera" onChange={getCamera}></input>
          </div>
          <button onClick={gettingInfo}> Search </button>
          {photos? <div> {photos.map((item, index ) => {return <img key={index} src={item['img_src']}/>})} </div>: null}
        </div>
      </header>
      <body>
      </body>
    </div>
  );
}

export default App;
