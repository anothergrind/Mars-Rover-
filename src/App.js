import './App.css';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [camera, setCamera] = useState('');
  const [rover, setRover] = useState('');
  const [date, setDate] = useState('');
  const [url, setURL] = useState('');

 /* 
  let images = <h3>search results will go here</h3>

  I changed it from const to let because let allows you to adjust the value after setting it initially.

  
  For the error handling, I used try and catch, because that was one of the options that I found on the 
  documentation and it was still viable. For the catch blocks I called an alert function and passed the 
  error in it, but this would result in the user getting an error message before they even had the chance to 
  input anything. To solve the problem that I was running into, I just changed all the alert() to console.log() 
*/
  let constructURL = (camera, rover, date) => {
    let userURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?earth_date=" + date + "&camera=" + camera + "&api_key=DEMO_KEY";
    
    if(camera === ''){
      userURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?earth_date" + date + "&api_key=DEMO_KEY";
    }
    else if(rover === ''){
      userURL = "https://api.nasa.gov/mars-photos/api/v1/photos?earth_date=" + date + "&camera=" + camera + "&api_key=DEMO_KEY";
    }
    else if(date === ''){
      userURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?&camera=" + camera + "&api_key=DEMO_KEY";
    }
    else if(camera === '' && rover === ''){
      userURL = "https://api.nasa.gov/mars-photos/api/v1/photos?earth_date=" + date + "&api_key=DEMO_KEY";
    }
    else if(camera === '' && date === ''){
      userURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?" + "&api_key=DEMO_KEY";
    }
    else if(rover === '' && date === ''){
      userURL = "https://api.nasa.gov/mars-photos/api/v1/camera=" + camera + "&api_key=DEMO_KEY";
    }
    else{
      console.log(userURL);
    }

    try{
      if(camera === ''){
        throw Error('Please input a camera');
      }
      else if(rover === ''){
        throw Error('Please input a rover');
      }
      else if(date === ''){
        throw Error('Please input a date in the YYYY-MM-DD format');
      }
    }catch(err){
      console.log(err.message);
    }
    return userURL

  }
  
  const getDate = (d) => {
    const inputedDate = d.target.value;
    setDate(d.target.value);
    console.log(date); 
    // Format is YYYY-MM-DD 
    try{
      for(let i = 0; i < inputedDate.length; i++){
        if(i === 5){
          if(inputedDate[i] < 3){
            break; 
          }
          else{
            throw Error("Please format the date in a YYYY-MM-DD standard");
          }
        }
      }
    }catch(err){
      console.log(err.message);
    }
  }

  const getRover = (r) => {
    const inputedRover = r.target.value;
    setRover(r.target.value);
    console.log(inputedRover);
    try{
      if(inputedRover === 'Curiosity' || inputedRover === 'Opportunity' || inputedRover === 'Spirit'){
        console.log(setRover);
      }
      else{
        throw Error("This rover doesn't exist"); 
      }
    }catch(err){
      console.log(err.message);
    }
  }

  const getCamera = (c) => {
    const inputedCamera = c.target.value;
    setCamera(c.target.value);
    console.log(inputedCamera);
    try{
      if(inputedCamera === 'FHAZ' || inputedCamera === 'RHAZ')
      {
        console.log(inputedCamera); // Gives "Jump target cannot cross function boundary" error
        if(setRover === 'Curiosity')
        {
          if(inputedCamera === 'MAST' || inputedCamera === 'CHEMCAM' || inputedCamera === 'MAHLI' || inputedCamera === 'MARDI' || inputedCamera === 'NAVCAM')
          {
            console.log(inputedCamera);
          }
        }
        else if(setRover === 'Opportunity' || setRover === 'Spirit') {
          if(inputedCamera === 'NAVCAM' || inputedCamera === 'PANCAM' || inputedCamera === 'MINITES'){
            console.log(inputedCamera); 
          }
        }
      }
      else{
        throw Error("The camera you inputted is either wrong or doesn't exist with the rover that you inputted")
      }
    } catch(err){
      console.log(err.message);
    }
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
            <input type="text" id="camera" name="camera" placeholder="Enter a camera" onChange={getCamera}></input>  
            <input type="text" id="rover" name="rover" placeholder="Enter a rover" onChange={getRover}></input>
            <input type="text" id="date-picker" name="date-picker" placeholder="Enter a date" onChange={getDate}></input>
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