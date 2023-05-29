import React from "react";
import { useEffect } from "react";
import "./ConceptBubble2.css";
import * as d3 from "d3";
import { useRef } from "react";
import { zoom } from "d3-zoom";

export default function Bubble({ data }) {
  function wrap(text, width) {
    text.each(function () {
      var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        extraLines = 0,
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text
          .text(null)
          .append("tspan")
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", dy + "em");
      while ((word = words.pop())) {
        //eslint-disable-line
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          extraLines += 1;
          tspan = text
            .append("tspan")
            .attr("x", 0)
            .attr("y", y)
            .attr("dy", "1.1em")
            .text(word);
        }
      }
      if (extraLines) {
        text.attr("transform", `translate(0, ${-extraLines * 6})`);
      }
    });
  }
  const findLongestWord = (str) => {
    var longestWord = str.split(" ").sort(function (a, b) {
      return b.length - a.length;
    });
    return longestWord[0].length;
  };
  const nodeSize = (d) => {
    let radius;
    var name = d.name;
    if (name != null) {
      var spaceCount = name.split(" ").length - 1;
      if (spaceCount === 0) {
        if (name.length === 1) {
          radius = name.length * 10 + 10;
        } else if (name.length === 3) {
          radius = name.length * 5 + 10;
        } else radius = name.length * 5;
      } else if (spaceCount === 1) {
        radius = findLongestWord(name) * 4 + 10;
      } else {
        if (spaceCount < 5) radius = findLongestWord(name) * 5 + 15;
        else {
          radius = findLongestWord(name) * 10 + 5;
        }
      }
    } else radius = 0;
    return radius;
  };

  var data = [];
  var centerData = [];
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = svg.node().getBoundingClientRect().width;
    const height = svg.node().getBoundingClientRect().height;
    svg.select(".bubbleContainer").remove();
    data = [
      { name: "Not Center", value: "2" },
      { name: "Not", value: "2" },
      { name: "NotCenter", value: "2" },
      { name: "NotCenter", value: "2" },
      { name: "Not Center", value: "2" },
      { name: "NotCenter", value: "2" },
      { name: "ok", value: "2" },
      { name: "NotCenter", value: "2" },
      { name: "harry", value: "2" },
      { name: "NotCenter", value: "2" },
      { name: "react", value: "2" },
      { name: "Not Center", value: "2" },
      { name: "NotCenter", value: "2" },
      { name: "NotCenter", value: "2" },
      { name: "Not Center", value: "2" },
      { name: "Not", value: "2" },
      { name: "NotCenter", value: "2" },
      { name: "NotCenter", value: "2" },
      { name: "Not Center", value: "2" },
      { name: "NotCenter", value: "2" },
      { name: "ok", value: "2" },
      { name: "NotCenter", value: "2" },
      { name: "harry", value: "2" },
      { name: "NotCenter", value: "2" },
      { name: "react", value: "2" },
      { name: "Not Center", value: "2" },
      { name: "NotCenter", value: "2" },
      { name: "NotCenter", value: "2" },
    ];
    centerData = [{ name: "center", x: width / 2, y: height / 2 }];

    // console.log(location);
    console.log(centerData);

    const centerX = (width * 3) / 2; // replace width with your canvas width
    const centerY = height / 2; // replace height with your canvas height
    const radius = Math.min(centerX, centerY) * 1.5; // adjust to control the radius of the circle
    function getRandomColor() {
      const values = ["#c1c5a4", "#9fb800", "#b5c085"];
      const randomIndex = Math.floor(Math.random() * values.length);
      return values[randomIndex];
    }
    data.forEach((d, i) => {
      const percentage = i / data.length; // calculate the percentage of data iterated through
      const angle = percentage * Math.PI * 2; // calculate the angle based on the percentage
      const x = centerX + Math.cos(angle) * radius; // calculate x position using trigonometry
      const y = centerY + Math.sin(angle) * radius; // calculate y position using trigonometry
      d.x = x;
      d.y = y;
      d.opacity = 0 - i / (data.length - 1); // calculate the opacity based on the index and the length of the array
    });

    centerData.forEach((d) => {
      d.x = (width * 3) / 4;
      d.y = height / 2;
      d.opacity = 0.5;
    });
    var g = svg.append("g").attr("class", "bubbleContainer");

    var group = g
      .selectAll("g")
      .data(centerData)
      .enter()
      .append("g")
      .attr("class", "bubbles center")
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y);

    group
      .append("circle")
      .attr("r", (d) => nodeSize(d) + 5)
      .style("fill", "#1678c8")
      .attr("class", "centerBubble")
      .style("outline", "1px solid white  !important")
      .style("border-radius", "50%");
    group
      .append("circle")
      .attr("class", "circle1")
      .attr("r", (d) => nodeSize(d) + 5)
      .style("fill", "transparent");
    group
      .append("circle")
      .attr("class", "circle2")
      .attr("r", (d) => nodeSize(d) + 5)
      .style("fill", "transparent");
    group
      .append("circle")
      .attr("class", "circle3")
      .attr("r", (d) => nodeSize(d) + 5)
      .style("fill", "transparent");

    var nodeTitles = group.append("g").attr("class", "node__title");

    var nodeTitleText = nodeTitles
      .append("text")
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "400")
      // .attr("dy", "0.6em")
      // .attr("dx", "0.1em")
      .text((d) => d.name)
      .attr("class", "node__name")
      .call(wrap, 10);
    nodeTitleText.filter((d) => d.depth);

    // group
    //   .append("text")
    //   .text((d) => d.name)
    //   .attr("dy", 5)
    //   .style("font-size", "10px")
    //   .style("text-anchor", "middle")
    //   .style("fill", "white");

    group = g
      .selectAll(".otherBubbles")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", (d) => {
        return `translate(${d.x},${d.y})`;
      })
      .attr("class", "bubbles")
      .on("click", (d, i) => {
        console.log(i.name);
        console.log(i.value);
        bubbleClickFunction(i.value, i.name);
      });

    group
      .append("circle")
      .attr("r", (d) => nodeSize(d) + 5)
      .style("fill", (d) => {
        return getRandomColor();
      });
    group
      .append("circle")
      .attr("class", "circle1")
      .attr("r", (d) => nodeSize(d) + 5)
      .style("fill", "transparent");
    group
      .append("circle")
      .attr("class", "circle2")
      .attr("r", (d) => nodeSize(d) + 5)
      .style("fill", "transparent");
    group
      .append("circle")
      .attr("class", "circle3")
      .attr("r", (d) => nodeSize(d) + 5)
      .style("fill", "transparent");

    nodeTitles = group.append("g").attr("class", "node__title");

    nodeTitleText = nodeTitles
      .append("text")
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "400")
      // .attr("dy", "0.6em")
      // .attr("dx", "0.1em")
      .text((d) => d.name)
      .attr("class", "node__name")
      .call(wrap, 10);
    nodeTitleText.filter((d) => d.depth);

    // group
    //   .append("text")
    //   .text((d) => d.name)
    //   .attr("dy", 5)
    //   .style("font-size", "10px")
    //   .style("text-anchor", "middle")
    //   .style("fill", "white");

    const simulation2 = d3
      .forceSimulation(centerData)
      .force("charge", d3.forceManyBody().strength(-5))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(0.01))
      .force("y", d3.forceY(height / 2).strength(0.01))
      .force(
        "collision",
        d3
          .forceCollide()
          .radius((d) => {
            return nodeSize(d) + 20;
          })
          .strength(1000)
      )
      .velocityDecay(0.2)
      .alpha(0.1) // start with low alpha value
      .alphaTarget(0) // gradually increase alpha value to 1
      .on("tick", () => {
        svg
          .selectAll(".center")
          .attr("transform", (d) => `translate(${d.x},${d.y})`);

        simulation2.alphaTarget(0.08).restart();
      });
    const simulation = d3
      .forceSimulation([...data, ...centerData])
      .force(
        "radial",
        d3.forceRadial(100, width / 2, height / 2).strength(0.001)
      )
      .force("charge", d3.forceManyBody().strength(-5).distanceMax(300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width).strength(0.01))
      .force("y", d3.forceY(height).strength(0.01))
      .force(
        "collision",
        d3.forceCollide().radius((d) => {
          return nodeSize(d) + 20;
        })
      )
      .force("random", (alpha) => {
        return (d) => {
          d.vx += (Math.random() - 0.5) * alpha * 0.1;
          d.vy += (Math.random() - 0.5) * alpha * 0.1;
        };
      })
      .velocityDecay(0.2)
      .alpha(0.2) // start with low alpha value
      .alphaTarget(0) // gradually increase alpha value to 1
      .on("tick", () => {
        g.selectAll(".bubbles")
          .attr("transform", (d) => `translate(${d.x},${d.y})`)
          .attr("opacity", (d) => d.opacity);

        [...data, ...centerData].forEach((d) => {
          if (d.opacity < 1) {
            d.opacity += 0.007;
          }
        });

        simulation.alphaTarget(0.1).restart();
      });

    // g.selectAll(".bubbles")
    //   .style("transition", "opacity 0.2s")
    //   .on("mouseover", function (event, d) {
    //     g.selectAll(".bubbles").style("opacity", (d) => {
    //       if (d.opacity > 0.6) {
    //         return d.opacity - 0.5;
    //       } else if (d.opacity < 0.6) {
    //         return 0.5;
    //       }
    //     });
    //     // Set opacity of other circles using the `style` method
    //     d3.select(this).style("opacity", 1);
    //   })
    //   .on("mouseout", function () {
    //     // Change the opacity of all circles back to the original opacity
    //     g.selectAll(".bubbles").style("opacity", (d) => {
    //       simulation.alphaTarget(0.1).restart();
    //     });
    //   });

    d3.select(".center").on("click", null);
    const zoomBehavior = d3.zoom().on("zoom", (event) => {
      g.attr("transform", event.transform);
    });

    svg.call(zoomBehavior);
    return;
  }, []);
  return (
    <div className="ConceptBubbles2">
      <svg width="101%" height="100%" ref={svgRef}></svg>
    </div>
  );
}
