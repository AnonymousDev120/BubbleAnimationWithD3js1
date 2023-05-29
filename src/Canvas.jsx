import { useRef, useEffect } from "react";

export default function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Draw circle
    function drawCircle(radius, color) {
      ctx.beginPath();
      ctx.arc(50, 50, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Draw initial circle
    drawCircle(25, "red");

    // Add mouseover event listener to canvas
    canvas.addEventListener("mouseover", (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const distanceFromCenter = Math.sqrt(
        Math.pow(x - 50, 2) + Math.pow(y - 50, 2)
      );
      if (distanceFromCenter <= 25) {
        drawCircle(30, "orange");
        setTimeout(() => drawCircle(35, "yellow"), 100);
        setTimeout(() => drawCircle(40, "white"), 200);
      }
    });

    // Add mouseout event listener to canvas
    canvas.addEventListener("mouseout", () => {
      drawCircle(25, "red");
    });

    // Remove event listeners on component unmount
    return () => {
      canvas.removeEventListener("mouseover", () => {});
      canvas.removeEventListener("mouseout", () => {});
    };
  }, []);

  return <canvas ref={canvasRef} width={1000} height={800} />;
}
