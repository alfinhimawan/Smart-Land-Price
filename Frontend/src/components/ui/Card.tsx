import { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'glass' | 'solid' | 'gradient'
  hoverable?: boolean
}

export const Card = ({
  children,
  variant = 'glass',
  hoverable = false,
  className,
  ...props
}: CardProps) => {
  const variants = {
    glass: 'bg-foreground/5 backdrop-blur-md border border-card-border',
    solid: 'bg-card border border-dark-700',
    gradient: 'bg-gradient-to-br from-dark-800 to-dark-900 border border-card-border',
  }

  return (
    <div
      className={cn(
        'rounded-lg p-6',
        variants[variant],
        hoverable && 'hover:bg-foreground/10 transition-all duration-300 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
