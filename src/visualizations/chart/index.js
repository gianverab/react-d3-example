import React, { useState, useContext, useEffect } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import { DataContext } from "../../context/DataContext";

const width = 540;
const height = 540;

const Chart = () => {
  const [bars, setBars] = useState([]);
  const data = useContext(DataContext);

  useEffect(() => {
    if (data) {
      // 1. map date to x-position
      // get min/max of date
      const xExtent = d3.extent(data, (d) => d.date);
      const xScale = d3.scaleTime().domain(xExtent).range([0, width]);
      // console.log(xScale(new Date('2/1/2017')))

      // 2. map high temp to y-position
      // get min/max of high temp
      const [min, max] = d3.extent(data, (d) => d.high);
      const yScale = d3
        .scaleLinear()
        .domain([Math.min(min, 0), max])
        .range([height, 0]);
      // console.log(yScale(49))

      // 3. map avg temp to color
      // get min/max of avg
      const colorExtent = d3.extent(data, (d) => d.avg);
      const colorScale = d3
        .scaleSequential()
        .domain(colorExtent)
        .interpolator(d3.interpolateRdYlBu);

      // 4. return an array of objects: x, y and height
      const newBars = data.map((d) => {
        return {
          x: xScale(d.date),
          y: yScale(d.high),
          height: yScale(d.low) - yScale(d.high),
          fill: colorScale(d.avg),
        };
      });

      setBars(newBars);
    }
  }, [data]);
  return (
    <SvgBox width={width} height={height}>
      {bars &&
        bars.map((d) => (
          <rect
            key={d.x}
            x={d.x}
            y={d.y}
            width={2}
            height={d.height}
            fill={d.fill}
          />
        ))}
    </SvgBox>
  );
};

const SvgBox = styled.svg`
  border: 1px solid #666;
  margin: 0 auto;
`;

export default Chart;
