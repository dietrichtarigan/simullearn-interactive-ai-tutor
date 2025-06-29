import { useEffect, useRef } from 'react';
import p5 from 'p5';

interface P5WrapperProps {
  sketch: (p: p5) => void;
}

export default function P5Wrapper({ sketch }: P5WrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    // Create new p5 instance
    if (containerRef.current && !p5Instance.current) {
      p5Instance.current = new p5((p: p5) => {
        // Store the original setup and draw functions
        const originalSetup = p.setup;
        const originalDraw = p.draw;

        // Override setup to ensure canvas is properly sized
        p.setup = () => {
          const container = containerRef.current;
          if (container) {
            const canvas = p.createCanvas(
              container.clientWidth,
              container.clientHeight
            );
            canvas.parent(container);
          }
          if (originalSetup) {
            originalSetup.call(p);
          }
        };

        // Override draw to handle resizing
        p.draw = () => {
          if (originalDraw) {
            originalDraw.call(p);
          }
        };

        // Add window resize handler
        p.windowResized = () => {
          const container = containerRef.current;
          if (container) {
            p.resizeCanvas(container.clientWidth, container.clientHeight);
          }
        };

        // Apply the user's sketch
        Object.assign(p, sketch(p));
      }, containerRef.current);
    }

    // Cleanup
    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
        p5Instance.current = null;
      }
    };
  }, [sketch]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ minHeight: '300px' }}
    />
  );
}
