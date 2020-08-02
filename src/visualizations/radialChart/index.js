import React, { useState, useContext, useEffect } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import { DataContext } from "../../context/DataContext";

const width = 540;
const height = 540;

const RadialChart = () => {
  const [slices, setSlices] = useState([]);
  const data = useContext(DataContext);

  useEffect(() => {
    if (data) {
      // map temp to radius
      const radiusScale = d3
        .scaleLinear()
        .domain([d3.min(data, (d) => d.low), d3.max(data, (d) => d.high)])
        .range([0, width / 2]);

      const colorScale = d3
        .scaleSequential()
        .domain(d3.extent(data, (d) => d.avg))
        .interpolator(d3.interpolateRdYlBu);

      // get the angle for each slice
      // 2PI / 365
      const perSliceAngle = (2 * Math.PI) / data.length;

      const arcGenerator = d3.arc();
      const newSlices = data.map((d, i) => {
        const path = arcGenerator({
          startAngle: i * perSliceAngle,
          endAngle: (i + 1) * perSliceAngle,
          innerRadius: radiusScale(d.low),
          outerRadius: radiusScale(d.high),
        });
        return { path, fill: colorScale(d.avg) };
      });

      setSlices(newSlices);
    }
  }, [data]);
  return (
    <SvgBox width={width} height={height}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {slices &&
          slices.map((d) => <path key={d.path} d={d.path} fill={d.fill} />)}
      </g>
    </SvgBox>
  );
};

const SvgBox = styled.svg`
  border: 1px solid #666;
  margin: 0 auto;
`;

export default RadialChart;
