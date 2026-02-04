import { useEffect, useRef } from "react";

export default function ValentineBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const symbols = ['❤️', '💖', '💝', '🎁', '✨', '💕', '💗', '💘'];

    const colors = [
      { r: 255, g: 77, b: 109 },   // Romantic pink
      { r: 255, g: 99, b: 132 },   // Rose
      { r: 236, g: 72, b: 153 },   // Magenta
      { r: 255, g: 153, b: 204 },  // Soft pink
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -50;
        this.size = Math.random() * 30 + 20; // 20–50px
        this.speedY = Math.random() * 0.25 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.4 + 0.4;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.y > canvas.height + 60) this.reset();
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.6)`;
        ctx.font = `${this.size}px serif`;
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.textAlign = "center";
        ctx.fillText(this.symbol, 0, 0);
        ctx.restore();
      }
    }

    const particles = Array.from({ length: 18 }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.35 }}
    />
  );
}
