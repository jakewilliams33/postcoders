import { useEffect, useState } from "react";
import { getAreaData } from "./api";

import "./App.css";

function App() {
  const [areas, setAreas] = useState([]);

  const load = async () => {
    try {
      const areaData = await getAreaData();

      setAreas(areaData);
    } catch (error) {
      window.alert(error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="App">
      <h1>Postcoders</h1>
      <h2>{`Areas for BB10: ${areas.length}`}</h2>
    </div>
  );
}

export default App;
