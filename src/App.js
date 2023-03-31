import React, { useState, useEffect } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import WindPowerIcon from "@mui/icons-material/WindPower";
import { Icon } from "@mui/material";

const apiKey = "5a32dde605721f1437d5908b546a5415";
const listIcon = [
  {
    type: "Clear",
    img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
  },
  {
    type: "Rain",
    img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
  },
  {
    type: "Snow",
    img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
  },
  {
    type: "Clouds",
    img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
  },
  {
    type: "Haze",
    img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
  },
  {
    type: "Smoke",
    img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
  },
  {
    type: "Mist",
    img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
  },
  {
    type: "Drizzle",
    img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
  },
];
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
        // console.log("data", data);
        setData(data);
      });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setCity(value);
  };
  const handleSearchCity = () => {
    getData(city);
  };

  const getIconWeather = (type) => {
    const item = listIcon.filter((item) => item.type === type);
    // console.log(type, item);
    return item && item[0].img;
  };
  // getIconWeather("Rain");
  // if (!data) return null;
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "max-content",
          margin: " 0 auto",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#1a1662",
            marginBottom: "5px",
          }}
        >
          Weather Search
        </Typography>
        <Box mb={3}>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="search-city">Enter City</InputLabel>
            <Input
              onChange={handleChange}
              name="city"
              id="search-city"
              type="text"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchCity} edge="end">
                    <SearchOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              }
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  ev.preventDefault();
                  handleSearchCity(ev);
                }
              }}
            />
          </FormControl>
        </Box>
        {data && data.cod < 400 && data.cod >= 200 ? (
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#555",
                marginBottom: "5px",
              }}
            >
              {data.name}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                color: "#555",
                marginBottom: "30px",
              }}
            >
              {data.sys.country}
            </Typography>
            <img src={getIconWeather(data.weather[0].main)} width={100} />
            <Typography
              variant="h2"
              sx={{
                fontSize: "18px",
                fontWeight: "500",
                color: "#000",
                marginBottom: "30px",
              }}
            >
              {data.weather[0].main}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <Icon sx={{ color: "#ea6969", marginRight: "10px" }}>
                  <DeviceThermostatOutlinedIcon />
                </Icon>
                <Typography>
                  {data.main.temp} <sup>o</sup>C
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon sx={{ color: "#78a0d9", marginRight: "10px" }}>
                  <WindPowerIcon />
                </Icon>
                <Typography mr={2} component="p">
                  <span style={{ marginRight: "5px" }}>Deg:</span>
                  {data.wind.deg || "unknown"}
                </Typography>

                <Typography mr={2} component="p">
                  <span style={{ marginRight: "5px" }}>Gust:</span>
                  {data.wind.gust || "unknown"}
                </Typography>
                <Typography component="p">
                  <span style={{ marginRight: "5px" }}>Speed:</span>
                  {data.wind.speed || "unknown"}
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box>
            {data === null ? (
              <Typography>Please enter the name of the city!</Typography>
            ) : (
              <Box textAlign={"center"}>
                <Typography>{data.message}</Typography>
                <img width={200} src={require("./images/404.2.png")} />
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App;
