import './App.css';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [camera, setCamera] = useState('');
  const [rover, setRover] = useState('');
  const [date, setDate] = useState('');
  const [url, setURL] = useState('');
  
  // All of the errors, using states. No errors to begin with, so I set them to a falsy value
  const [errRover, setErrRover] = useState(null);
  const [errCamera, setErrCamera] = useState(null);
  const [errDate, setErrDate] = useState(null);

  
  let timer; // Timer for debouncing 
  clearTimeout(timer);

  // let images = <h3>search results will go here</h3>

  let constructURL = (camera, rover, date) => {
    let userURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?earth_date=" + date + "&camera=" + camera + "&api_key=DEMO_KEY";
    
    if(!camera){
      userURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?earth_date" + date + "&api_key=DEMO_KEY";
    }
    else if(!rover){
      userURL = "https://api.nasa.gov/mars-photos/api/v1/photos?earth_date=" + date + "&camera=" + camera + "&api_key=DEMO_KEY";
    }
    else if(!date){
      userURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?&camera=" + camera + "&api_key=DEMO_KEY";
    }
    else if(!camera && !rover){
      userURL = "https://api.nasa.gov/mars-photos/api/v1/photos?earth_date=" + date + "&api_key=DEMO_KEY";
    }
    else if(!camera && !date){
      userURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?" + "&api_key=DEMO_KEY";
    }
    else if(!rover && !date){
      userURL = "https://api.nasa.gov/mars-photos/api/v1/camera=" + camera + "&api_key=DEMO_KEY";
    }

    return userURL; 
  }
  
  const getDate = (d) => {
    const inputedDate = d.target.value;
    const parsedDate = Date.parse(d.target.value);
    clearTimeout(timer);
    
    timer = setTimeout(() => {
      setDate(d.target.value); 
    },100)
    setErrDate("")

    // Checking to make sure the date isn't a falsy value 
    try{
      if(!inputedDate){
        throw Error('Please arrange the date into a YYYY-MM-DD format');
      }
      if(!parsedDate){
        throw Error('Please arrange the date into a YYYY-MM-DD format');
      }
    }catch(err){
      setErrDate(err.message);
    }

  }

  const getRover = (r) => {
    const inputedRover = r.target.value;
    clearTimeout(timer);
    setErrRover("")

    timer = setTimeout(() => {
      setRover(r.target.value); 
    },100)
    
    try{
      const rover = inputedRover.toLowerCase()
      if(rover === 'curiosity' || rover === 'opportunity' || rover === 'spirit'){
        console.log(inputedRover);
      }
      else{
        throw Error("Rover does not exist"); 
      }
    }catch(err){
      setErrRover(err.message);
    }
  }

  const getCamera = (c) => {
    const inputedCamera = c.target.value;
    clearTimeout(timer);
    setErrCamera("")

    timer = setTimeout(() => {
      setCamera(c.target.value); 
    },100)

    try{
      const camera = inputedCamera.toUpperCase()
      if(camera === "FHAZ" || camera === "RHAZ")
      {
        console.log(camera); // Gives "Jump target cannot cross function boundary" error
        if(rover === "curiosity")
        {
          if(camera === "MAST" || camera === "CHEMCAM" || camera === "MAHLI" || camera === "MARDI"|| camera === "NAVICAM")
          {
            console.log(inputedCamera);
          }
        }
        else if(rover === "opportunity" || rover === "spirit") {
          if(camera === "NAVCAM" || camera === "PANCAM" || camera === "MINITES"){
            console.log(camera); 
          }
        }
      }
      else{
        throw Error(" Camera does not exist");
      }
    } catch(err){
      setErrCamera(err.message);
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
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
        <div id='container'>
          <div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
            <input type="text" id="camera" name="camera" placeholder="Enter a camera" onChange={getCamera}></input>  
            <input type="text" id="rover" name="rover" placeholder="Enter a rover" onChange={getRover}></input>
            <input type="text" id="date-picker" name="date-picker" placeholder="Enter a date" onChange={getDate}></input>
            
            <button id="search-button" type="button" class="btn btn-primary" onClick={gettingInfo}> Search </button>
            { errCamera && <div> { errCamera } </div> }
            { errRover && <div> { errRover } </div> }
            { errDate && <div> { errDate } </div> }
            
          </div>
          {photos? <div> {photos.map((item, index ) => {return <img key={index} src={item['img_src']}/>})} </div>: null}
        </div>
      </header>
      <body>
      </body>
    </div>
  );
}

export default App;