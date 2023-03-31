import React, { useState, useEffect } from "react";
import "./App.css";

const apiKey = "5a32dde605721f1437d5908b546a5415";

function App() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState(null);

  const getData = (city) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log("data", data);
        setData(data);
      });
  };
  // useEffect(() => {
  //   getData();

  // }, []);
  const handleChange = (e) => {
    const { value } = e.target;
    setCity(value);
  };
  const handleSearchCity = () => {
    console.log("onclick");
    getData(city);
  };
  return (
    <div className="App">
      <>
        <div>
          <input
            name="city"
            type="text"
            placeholder="Enter City"
            onChange={handleChange}
          />
          <button type="button" onClick={handleSearchCity}>
            Search
          </button>
        </div>
        <div className="card-contaier">
          <h2></h2>
        </div>
      </>
    </div>
  );
}

export default App;
