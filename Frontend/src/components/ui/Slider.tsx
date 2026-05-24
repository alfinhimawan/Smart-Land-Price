interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
  unit?: string
}

export const Slider = ({
  label,
  value,
  min,
  max,
  step = 0.1,
  onChange,
  unit = '',
}: SliderProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-muted-foreground">{label}</label>
        <span className="text-sm font-semibold text-primary">
          {value.toFixed(2)}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
      />
    </div>
  )
}
