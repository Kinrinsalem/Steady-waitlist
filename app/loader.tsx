"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ellipse from "./Assets/elipse.svg";

const FADE_MS = 700;
const HOLD_MS = 700;

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const hide = setTimeout(() => setVisible(false), HOLD_MS);
    const unmount = setTimeout(() => setMounted(false), HOLD_MS + FADE_MS);

    return () => {
      clearTimeout(hide);
      clearTimeout(unmount);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      style={{ transitionDuration: `${FADE_MS}ms` }}
      className={`fixed inset-0 z-50 grid place-items-center bg-[#5C79A7] transition-opacity ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative h-48 w-48 sm:h-64 sm:w-64">
        <Image src={ellipse} alt="" fill className="object-contain" priority />
      </div>
    </div>
  );
}
