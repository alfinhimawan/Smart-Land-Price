import { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  color: string;
}

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const numParticles = 800; // Number of dots
    const sphereRadius = Math.min(width, height) * 0.8;

    // Generate particles on a sphere using Fibonacci distribution
    for (let i = 0; i < numParticles; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / numParticles);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.cos(phi);
      const z = Math.sin(theta) * Math.sin(phi);

      particles.push({ x, y, z, color: '' });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1
      mouseX = (e.clientX / width) * 2 - 1;
      mouseY = -(e.clientY / height) * 2 + 1;
      
      targetRotationY = mouseX * 0.5;
      targetRotationX = mouseY * 0.5;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Get color based on 3D position
    const getColor = (x: number, y: number, z: number) => {
      // Create a gradient from blue (-1) to orange/yellow (+1)
      const t = (x + 1) / 2; // 0 to 1
      
      // Interpolate HSL: Blue (220) -> Purple (280) -> Orange (30) -> Yellow (50)
      let h;
      if (t < 0.5) {
        // Blue to Purple
        h = 220 + (t * 2) * 60; 
      } else {
        // Purple to Orange/Yellow (Need to wrap around or go backwards, simpler to just map linearly in RGB or specific HSL)
        // 280 to 360, then 0 to 50
        h = 280 + ((t - 0.5) * 2) * 130;
        if (h > 360) h -= 360;
      }
      
      const s = 80 + z * 20; // 60% to 100% saturation based on depth
      const l = 60 + z * 20; // 40% to 80% lightness based on depth
      
      return `hsl(${h}, ${s}%, ${l}%)`;
    };

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.002;
      ctx.clearRect(0, 0, width, height);

      // Smooth rotation interpolation
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      // Base auto rotation + mouse rotation
      const rotX = currentRotationX;
      const rotY = currentRotationY + time;

      const centerX = width / 2;
      const centerY = height / 2;

      particles.forEach((p) => {
        // Rotate around Y axis
        const x1 = p.x * Math.cos(rotY) - p.z * Math.sin(rotY);
        const z1 = p.x * Math.sin(rotY) + p.z * Math.cos(rotY);

        // Rotate around X axis
        const y2 = p.y * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = p.y * Math.sin(rotX) + z1 * Math.cos(rotX);

        // Projection
        const fov = 800;
        const viewDistance = 1500;
        const zProj = z2 * sphereRadius + viewDistance;
        
        if (zProj > 0) {
          const scale = fov / zProj;
          const projX = centerX + x1 * sphereRadius * scale;
          const projY = centerY + y2 * sphereRadius * scale;
          
          // Determine size based on depth
          const size = Math.max(0.5, 3 * scale);
          
          // Opacity based on depth (fade out particles in the back)
          const opacity = Math.max(0.1, Math.min(1, scale * 1.5 - 0.2));

          ctx.beginPath();
          // Draw a small dash/ellipse rather than a perfect circle to mimic the reference
          ctx.ellipse(projX, projY, size * 1.5, size * 0.5, -rotY + Math.PI/4, 0, Math.PI * 2);
          
          ctx.fillStyle = getColor(x1, y2, z2);
          ctx.globalAlpha = opacity;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};
