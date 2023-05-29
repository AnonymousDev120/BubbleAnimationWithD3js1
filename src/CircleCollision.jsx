import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

function CircleCollision() {
  const svgRef = useRef();

  useEffect(() => {
    // set up SVG
    const svg = d3.select(svgRef.current);

    // create the circles and their data objects
    const circleData = [
      { x: 50, y: 50, r: 20, color: "red" },
      { x: 150, y: 50, r: 20, color: "blue" },
    ];

    const circles = svg
      .selectAll("circle")
      .data(circleData)
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", (d) => d.r)
      .style("fill", (d) => d.color);

    // set up simulation
    const simulation = d3
      .forceSimulation(circleData)
      .force(
        "collision",
        d3.forceCollide().radius((d) => d.r)
      )
      .force("x", d3.forceX(100))
      .force("y", d3.forceY(50))
      .alpha(0.5)
      .alphaDecay(0);

    // move the first circle towards the second circle
    setTimeout(() => {
      simulation.force("x", d3.forceX(150)).alpha(0.5).alphaDecay(0.05);
    }, 1000);

    // set up collision detection
    simulation.on("tick", () => {
      circles.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      // check for collision between circles
      const circle1 = circleData[0];
      const circle2 = circleData[1];
      const distance = Math.sqrt(
        Math.pow(circle1.x - circle2.x, 2) + Math.pow(circle1.y - circle2.y, 2)
      );

      if (distance < circle1.r + circle2.r) {
        // if circles are colliding, push the second circle away
        const angle = Math.atan2(circle2.y - circle1.y, circle2.x - circle1.x);
        const displacement = (circle1.r + circle2.r - distance) / 2;

        circle2.x += displacement * Math.cos(angle);
        circle2.y += displacement * Math.sin(angle);
      }
    });
  }, []);

  return <svg ref={svgRef} width={200} height={100}></svg>;
}

export default CircleCollision;
