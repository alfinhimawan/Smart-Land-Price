import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

interface StepProps {
  number: number
  title: string
  description: string
  isCompleted?: boolean
  isActive?: boolean
}

const Step = ({ number, title, description, isCompleted, isActive }: StepProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: number * 0.1 }}
    className="flex gap-4"
  >
    <div className="relative flex flex-col items-center">
      <motion.div
        animate={isActive ? { scale: [1, 1.2, 1], boxShadow: ['0 0 0 0 rgba(0, 209, 255, 0)', '0 0 0 8px rgba(0, 209, 255, 0.2)', '0 0 0 0 rgba(0, 209, 255, 0)'] } : {}}
        transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
          isCompleted
            ? 'bg-success text-foreground'
            : isActive
              ? 'bg-primary text-dark-950 shadow-glow'
              : 'bg-muted text-muted-foreground'
        }`}
      >
        {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : number}
      </motion.div>
      {number < 6 && (
        <div
          className={`w-1 h-12 mt-2 transition-colors ${isCompleted || isActive ? 'bg-primary' : 'bg-muted'}`}
        />
      )}
    </div>

    <div className="pt-1 pb-8">
      <h4 className={`font-semibold ${isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>{title}</h4>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  </motion.div>
)

export const PredictionFlow = () => {
  const steps = [
    { title: 'Click on Map', description: 'Select a location within the IKN region' },
    { title: 'View Coordinates', description: 'Latitude and longitude will be displayed' },
    { title: 'Predict Price', description: 'Click the prediction button to start' },
    { title: 'Processing', description: 'IDW interpolation in progress...' },
    { title: 'View Results', description: 'See the predicted price and analysis' },
    { title: 'Explore More', description: 'Try another location or adjust parameters' },
  ]

  return (
    <div className="space-y-2">
      {steps.map((step, idx) => (
        <Step key={idx} number={idx + 1} {...step} isActive={idx === 2} isCompleted={idx < 2} />
      ))}
    </div>
  )
}
