import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import styled from "styled-components";

const width = 540;
const height = 540;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

const Chart = ({ data }) => {
  const [slices, setSlices] = useState([]);

  const getData = () => {
    const { data } = data;
    if (!data) return {};

    return {};
  };

  useEffect(() => {
    getData();
  }, [data]);
  return <SvgBox width={width} height={height}></SvgBox>;
};

const SvgBox = styled.svg`
  border: 1px solid #666;
  margin: 0 auto;
`;

export default Chart;
