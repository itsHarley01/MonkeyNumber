
type Props = {
  positions: number[]
  revealed: number[]
  visible: boolean
  wrongCell: number | null
  onSelect: (cell: number) => void
}

const COLS = 8
const ROWS = 6

function NumberGrid({ positions, revealed, visible, wrongCell, onSelect }: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center p-3 sm:p-5">
      <div className="grid w-full max-w-[min(100%,calc((100dvh-8rem)*1.333))] grid-cols-8 gap-2 sm:gap-3">
        {Array.from({ length: COLS * ROWS }, (_, cell) => {
          const number = positions.indexOf(cell) + 1
          const isRevealed = visible || revealed.includes(number)
          const isWrong = wrongCell === cell

          return (
            <button
              key={cell}
              onClick={() => onSelect(cell)}
              disabled={visible || revealed.includes(number) || wrongCell !== null}
              aria-label={isRevealed && number > 0 ? `Number ${number}` : 'Hidden cell'}
              className={`aspect-square min-w-0 rounded-sm text-2xl font-bold tabular-nums sm:text-4xl ${
                isWrong
                  ? 'bg-red-600 text-white'
                  : number > 0 && isRevealed
                    ? 'bg-transparent text-white'
                    : number > 0
                      ? 'bg-white text-black'
                      : 'bg-transparent'
              }`}
            >
              {number > 0 && isRevealed ? number : ''}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default NumberGrid