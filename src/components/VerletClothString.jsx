// VerletClothString.jsx
import React, { useEffect, useRef, useState } from 'react';

const VerletClothString = ({ 
  position = '75%', 
  iconSrc = null, 
  iconSize = 32,
  onClick = null 
}) => {
  const canvasRef = useRef();
  const animationRef = useRef();
  const [iconImage, setIconImage] = useState(null);

  // Load PNG icon
  useEffect(() => {
    if (iconSrc) {
      const img = new Image();
      img.onload = () => setIconImage(img);
      img.src = iconSrc;
    }
  }, [iconSrc]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Calculate canvas dimensions based on string area only
    const startX = parseInt(position) * window.innerWidth / 100;
    const stringWidth = 200; // Width of interactive area around string
    const stringHeight = 500; // Height of string area
    
    canvas.width = stringWidth;
    canvas.height = stringHeight;
    
    // Position canvas at the string location
    canvas.style.left = `${startX - stringWidth/2}px`;
    canvas.style.top = '0px';

    // Verlet particle class
    class VerletParticle {
      constructor(x, y, pinned = false, mass = 1) {
        this.x = x;
        this.y = y;
        this.oldX = x;
        this.oldY = y;
        this.pinned = pinned;
        this.mass = mass;
      }

      update() {
        if (this.pinned) return;

        const velX = (this.x - this.oldX) * 0.99;
        const velY = (this.y - this.oldY) * 0.99;

        this.oldX = this.x;
        this.oldY = this.y;

        this.x += velX;
        this.y += velY + (0.5 * this.mass);
      }
    }

    // Constraint class
    class Constraint {
      constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.restLength = Math.sqrt(
          Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
        );
      }

      satisfy() {
        const dx = this.p2.x - this.p1.x;
        const dy = this.p2.y - this.p1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const difference = this.restLength - distance;
        const percent = difference / distance / 2;
        const offsetX = dx * percent;
        const offsetY = dy * percent;

        if (!this.p1.pinned) {
          this.p1.x -= offsetX;
          this.p1.y -= offsetY;
        }
        if (!this.p2.pinned) {
          this.p2.x += offsetX;
          this.p2.y += offsetY;
        }
      }
    }

    // Create string particles
    const particles = [];
    const constraints = [];
    const segments = 20;
    const centerX = stringWidth / 2; // Center of canvas
    const segmentLength = 20;

    // Create particles
    for (let i = 0; i < segments; i++) {
      const isLast = i === segments - 1;
      const particle = new VerletParticle(
        centerX, 
        i * segmentLength, 
        i === 0,
        isLast ? 3 : 1
      );
      particles.push(particle);
    }

    // Create constraints
    for (let i = 0; i < segments - 1; i++) {
      constraints.push(new Constraint(particles[i], particles[i + 1]));
    }

    // Animation loop
    const animate = () => {
      // Update physics
      for (let iteration = 0; iteration < 3; iteration++) {
        constraints.forEach(constraint => constraint.satisfy());
      }
      
      particles.forEach(particle => particle.update());

      // Render
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw string
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      
      particles.forEach((particle, index) => {
        if (index === 0) {
          ctx.moveTo(particle.x, particle.y);
        } else {
          ctx.lineTo(particle.x, particle.y);
        }
      });
      
      ctx.stroke();

      // Draw PNG icon at the last particle position
      if (iconImage && particles.length > 0) {
        const lastParticle = particles[particles.length - 1];
        
        // Draw icon background circle
        ctx.fillStyle = '#2c3e50';
        ctx.beginPath();
        ctx.arc(lastParticle.x, lastParticle.y, iconSize / 2 + 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Add shadow
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 4;
        
        // Draw white inner circle
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(lastParticle.x, lastParticle.y, iconSize / 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        
        // Draw PNG icon
        const iconX = lastParticle.x - iconSize / 2;
        const iconY = lastParticle.y - iconSize / 2;
        ctx.drawImage(iconImage, iconX, iconY, iconSize, iconSize);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Mouse interaction - only within canvas bounds
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      
      // Only affect particles if mouse is within canvas
      if (mouseX >= 0 && mouseX <= canvas.width && mouseY >= 0 && mouseY <= canvas.height) {
        particles.forEach((particle, index) => {
          if (index > 0) {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Reduced interaction radius
            if (distance < 60) {
              const force = (60 - distance) / 60 * 0.3;
              particle.x += (dx / distance) * force;
              particle.y += (dy / distance) * force;
            }
          }
        });
      }
    };

    // Click handler for icon interaction
    const handleClick = (event) => {
      if (!particles.length || !iconImage) return;
      
      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      const lastParticle = particles[particles.length - 1];
      
      const distance = Math.sqrt(
        Math.pow(clickX - lastParticle.x, 2) + 
        Math.pow(clickY - lastParticle.y, 2)
      );
      
      if (distance < iconSize / 2 + 4) {
        console.log('Icon clicked!');
        
        // Add bounce effect
        lastParticle.y -= 15;
        
        // Call custom onClick handler if provided
        if (onClick) {
          onClick();
        }
      }
    };

    // Set pointer events only for the string area
    const handleMouseEnter = () => {
      canvas.style.cursor = 'pointer';
    };

    const handleMouseLeave = () => {
      canvas.style.cursor = 'default';
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [position, iconImage, iconSize, onClick]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        pointerEvents: 'auto',
        zIndex: 10
      }}
    />
  );
};

export default VerletClothString;
