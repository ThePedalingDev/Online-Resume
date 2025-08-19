import React, { useRef, useEffect } from "react";

export function ShootingStars({ maxVisible = 2, spawnEvery = 2000 }) {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let streaks = [];

    function spawnStreak() {
      if (streaks.length < maxVisible) {
        streaks.push({
          x: Math.random() * width,
          y: Math.random() * height,
          len: 90 + Math.random() * 55,
          speed: (14 + Math.random() * 10) * 0.75, // slower speed
          opacity: 0.3 + Math.random() * 0.2, // more visible
          angle: Math.random() * 2 * Math.PI,
          life: 0,
          duration: 20 + Math.random() * 7,
        });
      }
    }

    let lastSpawn = 0;
    function animate(ts) {
      ctx.clearRect(0, 0, width, height);

      // Strictly spawn every spawnEvery ms, no extra randomness here
      if (ts - lastSpawn > spawnEvery) {
        spawnStreak();
        lastSpawn = ts;
      }

      streaks.forEach((s, idx) => {
        ctx.save();
        ctx.globalAlpha = s.opacity * (1 - s.life / s.duration);
        ctx.strokeStyle = "#fff";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 1.3;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(
          s.x - Math.cos(s.angle) * s.len,
          s.y - Math.sin(s.angle) * s.len
        );
        ctx.stroke();
        ctx.restore();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life += 1;
      });

      streaks = streaks.filter((s) => s.life < s.duration);

      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      streaks = [];
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [maxVisible, spawnEvery]);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
}
