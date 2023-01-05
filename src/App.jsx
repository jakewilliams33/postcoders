import { Card, CardContent } from "@mui/material";
import { useState } from "react";
import { getAreaData } from "./api";
import Grid from "@mui/material/Grid";
import { countries } from "./countries";

import "./App.css";

function App() {
  const [areas, setAreas] = useState([]);
  const [outCode, setOutCode] = useState("");
  const [countryCode, setCountryCode] = useState("GB");
  const [resultStr, setResultStr] = useState("Enter an outcode to begin!");

  const load = async (outCode) => {
    try {
      setResultStr("Searching…");
      const areaData = await getAreaData(outCode, countryCode);
      setAreas(areaData);
      setResultStr(`Areas for ${outCode}: ${areaData.length}`);
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        window.alert("Please enter a valid outcode");
      } else {
        window.alert(error.message);
      }
      setResultStr("Enter an outcode to begin!");
    }
  };

  const handleChangeText = (event) => {
    setOutCode(event.target.value.toUpperCase());
  };

  const handleChangeSelect = (event) => {
    setCountryCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    load(outCode);
    setOutCode("");
  };

  return (
    <div className="App">
      <h1>Postcoders</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={outCode}
          onChange={(event) => handleChangeText(event)}
          type="text"
          placeholder="Type outcode here…"
          required
        ></input>
        <select
          value={countryCode}
          onChange={(event) => handleChangeSelect(event)}
        >
          {countries.map((country) => {
            return (
              <option key={country} value={country}>
                {country}
              </option>
            );
          })}
        </select>
        <input type="submit" value="Search"></input>
      </form>
      <h2>{resultStr}</h2>
      <div>
        <Grid container spacing={0} direction="row" justifyContent="center">
          {areas.map((area) => {
            return (
              <Grid key={area["place name"]} className="item">
                <Card>
                  <CardContent>
                    <h3>{area["place name"]}</h3>
                    <p>
                      Latitude: {area.latitude} Longitude: {area.longitude}
                    </p>
                    <p>Country/State: {area.state}</p>
                    <p>Abbreviation: {area["state abbreviation"]}</p>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

export default App;
