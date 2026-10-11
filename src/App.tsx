
import { useState } from 'react'
import NumberGrid from './component/NumberGrid'

type Phase = 'idle' | 'reveal' | 'playing' | 'failed' | 'won'

const TOTAL = 10
const CELLS = 48

function generatePositions() {
  const cells = Array.from({ length: CELLS }, (_, i) => i)

  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cells[i], cells[j]] = [cells[j], cells[i]]
  }

  return cells.slice(0, TOTAL)
}

function App() {
  const [positions, setPositions] = useState(generatePositions)
  const [phase, setPhase] = useState<Phase>('idle')
  const [revealed, setRevealed] = useState<number[]>([])
  const [wrongCell, setWrongCell] = useState<number | null>(null)


function startReveal() {
  if (phase === 'playing' || phase === 'reveal') return

  if (phase === 'idle' || phase === 'failed' || phase === 'won') {
    setPositions(generatePositions())
  }

  setRevealed([])
  setWrongCell(null)
  setPhase('reveal')
}

  function stopReveal() {
    setPhase((current) => current === 'reveal' ? 'playing' : current)
  }

  function selectCell(cell: number) {
    if (phase !== 'playing') return

    const number = positions.indexOf(cell) + 1

    if (number === revealed.length + 1) {
      const next = [...revealed, number]
      setRevealed(next)

      if (next.length === TOTAL) setPhase('won')
    } else {
      setWrongCell(cell)
      setPhase('failed')
    }
  }

  const showNumbers = phase === 'reveal' || phase === 'failed' || phase === 'won'
  const showHoldButton = phase !== 'playing'

  return (
    <main
      className="flex h-dvh flex-col overflow-hidden bg-black text-white select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="min-h-0 flex-1">
        {phase !== 'idle' && (
          <NumberGrid
            positions={positions}
            revealed={revealed}
            visible={showNumbers}
            wrongCell={wrongCell}
            onSelect={selectCell}
          />
        )}
      </div>

      <div className="relative flex h-24 shrink-0 items-center px-6 sm:h-28 sm:px-8">
        {showHoldButton && (
          <button
            aria-label="Hold to reveal numbers"
            onPointerDown={(e) => {
              e.preventDefault()
              e.currentTarget.setPointerCapture(e.pointerId)
              startReveal()
            }}
            onPointerUp={stopReveal}
            onPointerCancel={stopReveal}
            className="flex h-14 w-14 touch-none items-center justify-center rounded-full border-2 border-white bg-black active:bg-white/10 sm:h-16 sm:w-16"
          />
        )}
      </div>
    </main>
  )
}

export default App