import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const rangeX = 800;
const rangeY = 480;

const kelvinToCelsius = (kelvin) => kelvin - 273.15;

const Graph = styled.svg`
  height: 30rem;
  width: 50rem;
  overflow: visible;

  .y-axis {
    grid-column: 1;
    transform: translateX(-30px);

    .tick {
      font-size: 0.875rem;
      font-family: "Lato";
      stroke: ${(props) => props.theme.tickleMePink};

      line {
        display: none;
      }
    }

    path {
      display: none;
    }
  }

  .grid {
    .tick {
      line {
        opacity: 0.6;
        stroke-dasharray: 5;
        stroke: ${(props) => props.theme.tickleMePink};
      }
    }

    path {
      display: none;
    }
  }

  .line {
    stroke: ${(props) => props.theme.tickleMePink};
  }
`;

const RerollButton = styled.button`
  color: #297099;
  width: 80%;
  height: 30px;
  border-radius: 0.125rem;
  border: none;
  margin-top: 1rem;
  outline: none;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const WeatherGraph = () => {
  const [temperature, setTemperature] = useState(null);

  const graphRef = useRef();

  useEffect(() => {
    // not a super clean solution here... but we can add in error handling and environment config in a real project!
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=-33.865143&lon=151.2093&exclude=current,minutely,daily,alerts&appid=861f2fb94f1c3b0a53ad18f3be530270"
    )
      .then((res) => res.json())
      .then((data) => {
        setTemperature(
          data.hourly.map((hourData) => kelvinToCelsius(hourData.temp))
        );
      });
  }, []);

  useEffect(() => {
    if (!temperature) return;

    const xScale = d3
      .scaleLinear()
      .domain([0, temperature.length - 1])
      .range([0, rangeX]);

    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(...temperature) + 1])
      .range([rangeY, 0]);

    const svg = d3.select(graphRef.current);

    const line = d3
      .line()
      .x((value, index) => xScale(index))
      .y(yScale);
    svg
      .selectAll(".line")
      .data([temperature])
      .join("path")
      .attr("class", "line")
      .attr("d", (value) => line(value))
      .attr("fill", "none");

    const yAxis = d3.axisRight(yScale);
    svg.append("g").attr("class", "y-axis").call(yAxis);

    svg
      .append("g")
      .attr("class", "grid")
      .call(yAxis.tickSize(rangeX).tickFormat(""));

    return () => {
      svg.selectAll(".grid").remove();
      svg.selectAll(".y-axis").remove();
    };
  }, [temperature]);

  return (
    <Wrapper>
      <h1>Sydney's temperature over the past week</h1>
      <Graph ref={graphRef} />
    </Wrapper>
  );
};

export default WeatherGraph;
