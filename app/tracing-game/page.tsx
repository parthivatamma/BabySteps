"use client";
import React, { useRef, useState, useEffect } from "react";

const TracingGame = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tracedPath, setTracedPath] = useState<{ x: number; y: number }[]>([]);
  const [isTracing, setIsTracing] = useState(false);
  const [accuracy, setAccuracy] = useState(100);

  const path = [
    { x: 10, y: 20 },
    { x: 30, y: 40 },
    { x: 50, y: 30 },
    { x: 70, y: 60 },
    { x: 90, y: 50 },
  ];

  const drawCanvas = () => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Draw path
  ctx.strokeStyle = "blue";
  ctx.setLineDash([5, 5]);
  ctx.lineWidth = 2;
  ctx.beginPath();
  path.forEach((point, index) => {
    const x = (point.x / 100) * canvasWidth;
    const y = (point.y / 100) * canvasHeight;
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();

  // Draw start point (green square)
  const start = path[0];
  const startX = (start.x / 100) * canvasWidth;
  const startY = (start.y / 100) * canvasHeight;
  ctx.fillStyle = "green";
  ctx.fillRect(startX - 10, startY - 10, 20, 20); // 20x20 green square

  // Draw finish point (red square)
  const finish = path[path.length - 1];
  const finishX = (finish.x / 100) * canvasWidth;
  const finishY = (finish.y / 100) * canvasHeight;
  ctx.fillStyle = "red";
  ctx.fillRect(finishX - 10, finishY - 10, 20, 20); // 20x20 red square

  // Draw traced path
  ctx.strokeStyle = "blue";
  ctx.setLineDash([]);
  ctx.lineWidth = 3;
  ctx.beginPath();
  tracedPath.forEach((point, index) => {
    const x = point.x;
    const y = point.y;
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();
};


  const handlePointerDown = () => {
    setIsTracing(true);
    setTracedPath([]);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Check if the user starts near the start point
  const start = path[0];
  const startX = (start.x / 100) * canvas.width;
  const startY = (start.y / 100) * canvas.height;
  const startDistance = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));

  if (!isTracing && startDistance <= 15) {
    setIsTracing(true); // Allow tracing only if starting near the green point
  }

  // If tracing, add the current point to the traced path
  if (isTracing) {
    setTracedPath((prev) => [...prev, { x, y }]);
  }

  // Check if the user finishes near the finish point
  const finish = path[path.length - 1];
  const finishX = (finish.x / 100) * canvas.width;
  const finishY = (finish.y / 100) * canvas.height;
  const finishDistance = Math.sqrt(
    Math.pow(x - finishX, 2) + Math.pow(y - finishY, 2)
  );

  if (finishDistance <= 15) {
    setIsTracing(false); // Stop tracing when finishing near the red point
    calculateAccuracy(); // Calculate accuracy on completion
  }
};


  const handlePointerUp = () => {
    setIsTracing(false);
    calculateAccuracy();
  };

  const calculateAccuracy = () => {
  const canvas = canvasRef.current;
  if (!canvas || tracedPath.length === 0) return;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const distanceThreshold = 10; // Allowable distance from the path for accuracy

  let correctPoints = 0;

  // Iterate through predefined path points
  path.forEach((pathPoint) => {
    const pathX = (pathPoint.x / 100) * canvasWidth;
    const pathY = (pathPoint.y / 100) * canvasHeight;

    // Check if any traced point is within the distance threshold
    const isCorrect = tracedPath.some((tracePoint) => {
      const distance = Math.sqrt(
        Math.pow(tracePoint.x - pathX, 2) + Math.pow(tracePoint.y - pathY, 2)
      );
      return distance <= distanceThreshold;
    });

    if (isCorrect) {
      correctPoints++;
    }
  });

  // Calculate accuracy based on predefined path points
  const accuracyPercentage = (correctPoints / path.length) * 100;
  setAccuracy(Math.round(accuracyPercentage));
};


  useEffect(() => {
    drawCanvas();
  }, [tracedPath]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ marginBottom: "10px", fontSize: "20px" }}>
        Accuracy: {accuracy}%
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "1px solid black" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
    </div>
  );
};

export default TracingGame;
