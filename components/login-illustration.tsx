"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type LoginIllustrationProps = {
  eyesClosed?: boolean
  className?: string
}

const MAX_PUPIL_OFFSET = 2.8
const LINE = "#2f2f2f"

export function LoginIllustration({ eyesClosed = false, className }: LoginIllustrationProps) {
  const headRef = useRef<SVGRectElement>(null)
  const pupilsRef = useRef<SVGGElement>(null)
  const [blinking, setBlinking] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const onMove = (event: MouseEvent) => {
      const head = headRef.current
      const pupils = pupilsRef.current
      if (!head || !pupils) return
      const rect = head.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      const distance = Math.hypot(dx, dy) || 1
      const strength = Math.min(1, distance / 140) * MAX_PUPIL_OFFSET
      const x = ((dx / distance) * strength).toFixed(2)
      const y = ((dy / distance) * strength).toFixed(2)
      pupils.setAttribute("transform", `translate(${x} ${y})`)
    }

    let blinkTimeout: number | undefined
    const blinkInterval = window.setInterval(() => {
      setBlinking(true)
      blinkTimeout = window.setTimeout(() => setBlinking(false), 140)
    }, 3800)

    window.addEventListener("mousemove", onMove)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.clearInterval(blinkInterval)
      if (blinkTimeout) window.clearTimeout(blinkTimeout)
    }
  }, [])

  const shut = eyesClosed || blinking

  return (
    <div
      className={cn("mx-auto hidden h-auto w-full max-w-[600px] md:block", className)}
      aria-hidden="true"
    >
      <svg viewBox="0 0 600 120" className="block h-auto w-full" fill="none">
        <path d="M0 100 H600" stroke="#d6d6d6" strokeWidth="1.5" />

        {[
          { x: 32, l: "P" },
          { x: 64, l: "A" },
          { x: 96, l: "L" },
        ].map((b) => (
          <g key={b.l}>
            <rect x={b.x} y="72" width="28" height="28" rx="3" fill="#f4f4f4" stroke="#3a3a3a" strokeWidth="1.5" />
            <text
              x={b.x + 14}
              y="91"
              textAnchor="middle"
              fontSize="15"
              fontWeight="600"
              fill="#3a3a3a"
              fontFamily="inherit"
            >
              {b.l}
            </text>
          </g>
        ))}

        <rect x="98" y="22" width="148" height="28" rx="8" fill="#fff" stroke="#cfcfcf" />
        <path d="M246 31 L258 36 L246 41" fill="#fff" stroke="#cfcfcf" />
        <rect x="245" y="31.5" width="2" height="9" fill="#fff" />
        <text x="172" y="40" textAnchor="middle" fontSize="12" fill="#333" fontFamily="inherit">
          Wer hat heute Dienst?
        </text>

        <circle cx="520" cy="85" r="15" fill="#fff" stroke="#3a3a3a" strokeWidth="1.5" />
        <path d="M520 78 L526 83 L524 90 H516 L514 83 Z" fill="#171717" />

        <g transform="translate(224 -6)" stroke={LINE} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
          <path d="M96 16 V106" />
          <circle cx="96" cy="14" r="2.2" fill="#171717" stroke="none" />
          <path d="M98 18 L124 26.5 L98 35 Z" fill="#171717" />

          <rect x="44" y="94" width="9" height="12" rx="2" fill="#f4f4f4" />
          <rect x="67" y="94" width="9" height="12" rx="2" fill="#f4f4f4" />
          <rect x="41" y="103" width="15" height="5" rx="2.5" fill="#171717" stroke="none" />
          <rect x="64" y="103" width="15" height="5" rx="2.5" fill="#171717" stroke="none" />

          <rect x="36" y="62" width="48" height="34" rx="7" fill="#f4f4f4" />

          <path d="M50 63 L57 73 M70 63 L63 73" stroke="#9a9a9a" strokeWidth="1.3" />
          <rect x="53" y="72" width="15" height="8" rx="4" fill="#171717" stroke="none" />
          <rect x="49" y="74" width="7" height="4" rx="1" fill="#171717" stroke="none" />
          <circle cx="63" cy="76" r="1.4" fill="#fff" stroke="none" />

          <path d="M36 70 Q27 74 28 86" />
          <circle cx="28" cy="87.5" r="2.8" fill="#171717" stroke="none" />
          <path d="M84 70 Q93 70 96 64" />
          <circle cx="96" cy="63" r="2.8" fill="#171717" stroke="none" />

          <rect ref={headRef} x="38" y="24" width="44" height="36" rx="9" fill="#f4f4f4" />

          <g visibility={shut ? "hidden" : "visible"}>
            <circle cx="52" cy="40" r="5.5" fill="#fff" strokeWidth="1.6" />
            <circle cx="68" cy="40" r="5.5" fill="#fff" strokeWidth="1.6" />
            <g ref={pupilsRef}>
              <circle cx="52" cy="40" r="2.6" fill="#171717" stroke="none" />
              <circle cx="68" cy="40" r="2.6" fill="#171717" stroke="none" />
            </g>
          </g>

          <g visibility={shut ? "visible" : "hidden"}>
            <path d="M46.5 40.5 Q52 45.5 57.5 40.5 M62.5 40.5 Q68 45.5 73.5 40.5" strokeWidth="1.8" />
          </g>

          <path d="M47 31 Q52 28 57 31 M63 31 Q68 28 73 31" strokeWidth="1.8" />
          <path d="M54 50 Q60 55.5 66 50" strokeWidth="1.8" />
        </g>
      </svg>
    </div>
  )
}
