import React from "react";
import Sketch from "react-p5";

const AnimatedBackground = () => {
  let points = [];
  const POINT_COUNT = 45; // Reduced from 60
  const CONNECTION_DISTANCE = 150; // Reduced from 200
  const CONNECTION_DISTANCE_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.frameRate(30); // Limit frame rate

    for (let i = 0; i < POINT_COUNT; i++) {
      points.push({
        pos: p5.createVector(p5.random(p5.width), p5.random(p5.height / 1.5)),
        vel: p5.createVector(p5.random(-0.3, 0.3), p5.random(-0.3, 0.3))
      });
    }
  };

  const draw = (p5) => {
    drawGradientBackground(p5);
    p5.strokeWeight(0.5);
    p5.stroke(145, 94, 255, 60);

    // Optimized distance check using square distance
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].pos.x - points[j].pos.x;
        const dy = points[i].pos.y - points[j].pos.y;
        const distSq = dx * dx + dy * dy;
        
        if (distSq < CONNECTION_DISTANCE_SQ) {
          p5.line(points[i].pos.x, points[i].pos.y, points[j].pos.x, points[j].pos.y);
        }
      }
    }

    // Batch node updates
    p5.fill(255, 255, 255, 100);
    p5.noStroke();
    points.forEach(p => {
      p5.ellipse(p.pos.x, p.pos.y, 3); // Reduced size
      p.pos.add(p.vel);
      
      // Simplified boundary check
      if ((p.pos.x < 0 && p.vel.x < 0) || (p.pos.x > p5.width && p.vel.x > 0)) p.vel.x *= -1;
      if ((p.pos.y < 0 && p.vel.y < 0) || (p.pos.y > p5.height && p.vel.y > 0)) p.vel.y *= -1;
    });
  };

  const drawGradientBackground = (p5) => {
    p5.background(5, 8, 22); // Single background color instead of gradient
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default AnimatedBackground;
