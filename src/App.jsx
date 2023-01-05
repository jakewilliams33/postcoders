import { useEffect, useState } from "react";
import { getAreaData } from "./api";
import "./App.css";
import { countries } from "./countries";

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
    </div>
  );
}

export default App;
