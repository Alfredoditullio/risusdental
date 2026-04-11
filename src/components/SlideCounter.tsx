interface SlideCounterProps {
  current: number
  total: number
}

export function SlideCounter({ current, total }: SlideCounterProps) {
  const num = String(current + 1).padStart(2, '0')
  const tot = String(total).padStart(2, '0')

  return (
    <div className="font-display text-white/50 text-sm tracking-widest flex items-center gap-1">
      <span className="text-white font-bold text-3xl">{num}</span>
      <span className="mx-1">/</span>
      <span>{tot}</span>
    </div>
  )
}
