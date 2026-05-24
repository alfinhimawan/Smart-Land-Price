import { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface TooltipProps {
  content: string
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export const Tooltip = ({ content, children, position = 'top' }: TooltipProps) => {
  const positionStyles = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  }

  return (
    <div className="group relative inline-block">
      {children}
      <div
        className={cn(
          'absolute hidden group-hover:block z-50',
          'bg-card text-foreground text-sm px-3 py-2 rounded-lg whitespace-nowrap',
          'border border-card-border shadow-lg',
          positionStyles[position]
        )}
      >
        {content}
      </div>
    </div>
  )
}
