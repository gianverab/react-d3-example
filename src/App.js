import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Chart from "./visualizations/chart";
import sfData from "./data/sf.json";
import nyData from "./data/ny.json";
import { DataContext } from "./context/DataContext";
import RadialChart from "./visualizations/radialChart";

const App = () => {
  const [temps, setTemps] = useState({});
  const [city, setCity] = useState("sf"); // city whose temperatures to show

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const getTemps = () => {
    const sf = sfData.sf;
    const ny = nyData.ny;
    sf.forEach((day) => (day.date = new Date(day.date)));
    ny.forEach((day) => (day.date = new Date(day.date)));

    setTemps({ sf, ny });
  };

  useEffect(() => {
    getTemps();
  }, []);

  const data = temps[city];
  return (
    <AppWrapper>
      <h1>
        2017 Temperatures for{" "}
        <SelectCity name="city" onChange={handleCity}>
          {[
            { label: "San Francisco", value: "sf" },
            { label: "New York", value: "ny" },
          ].map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </SelectCity>
      </h1>
      <p>
        *warning: these are <em>not</em> meant to be good examples of data
        visualizations, but just to show the possibility of using D3 and React*
      </p>
      <DataContext.Provider value={data}>
        <Chart />
        <RadialChart />
      </DataContext.Provider>
      <p>
        (Weather data from{" "}
        <a href="https://www.wunderground.com/" target="_new">
          wunderground.com
        </a>
        )
      </p>
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  display: grid;
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 16px;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr;
  grid-gap: 24px;

  h1 {
    margin: 0;
    text-align: center;
  }
  p {
    margin: 0;
  }
`;

const SelectCity = styled.select`
  font-size: 32px;
`;

export default App;
