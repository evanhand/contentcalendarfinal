import React, { useEffect, useRef } from 'react';

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particle system
    const particles: Particle[] = [];
    const particleCount = 50;
    
    class Particle {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      speedX: number;
      speedY: number;
      opacity: number;
      angle: number;
      angleSpeed: number;
      distanceFromMouse: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseSize = Math.random() * 2 + 1;
        this.size = this.baseSize;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        this.opacity = Math.random() * 0.3 + 0.2;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() - 0.5) * 0.002;
        this.distanceFromMouse = 0;
      }

      update() {
        // Orbital movement
        this.angle += this.angleSpeed;
        
        // Base movement
        this.x += Math.cos(this.angle) * 0.2 + this.speedX;
        this.y += Math.sin(this.angle) * 0.2 + this.speedY;

        // Mouse interaction
        const dx = this.x - mouseRef.current.x;
        const dy = this.y - mouseRef.current.y;
        this.distanceFromMouse = Math.sqrt(dx * dx + dy * dy);
        
        // Repel from mouse
        if (this.distanceFromMouse < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - this.distanceFromMouse) * 0.02;
          this.x += Math.cos(angle) * force;
          this.y += Math.sin(angle) * force;
          this.size = this.baseSize * (1 + (100 - this.distanceFromMouse) * 0.01);
        } else {
          this.size = this.baseSize;
        }

        // Screen boundaries
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        // Dynamic opacity
        this.opacity += (Math.random() - 0.5) * 0.01;
        this.opacity = Math.max(0.2, Math.min(0.5, this.opacity));
      }

      draw() {
        if (!ctx) return;
        
        // Particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(186, 252, 99, ${this.opacity})`;
        ctx.fill();

        // Glow effect
        if (this.distanceFromMouse < 100) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 2
          );
          gradient.addColorStop(0, `rgba(186, 252, 99, ${this.opacity * 0.5})`);
          gradient.addColorStop(1, 'rgba(186, 252, 99, 0)');
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrameId: number;

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = dx * dx + dy * dy;

          if (distance < 40000) {
            const opacity = 0.15 * (1 - distance / 40000);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(186, 252, 99, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-50"
      style={{ zIndex: -1 }}
    />
  );
}