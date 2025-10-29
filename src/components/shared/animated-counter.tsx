"use client";

import { useEffect, useState } from 'react';

type AnimatedCounterProps = {
  to: number;
  duration?: number;
};

export default function AnimatedCounter({ to, duration = 1500 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = to;
    if (start === end) return;

    const incrementTime = (duration / end);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [to, duration]);

  return <span>{count}</span>;
}
