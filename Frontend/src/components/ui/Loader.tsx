interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
}

export const Loader = ({ size = 'md' }: LoaderProps) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div className={`${sizeMap[size]} border-2 border-white/20 border-t-accent-cyan rounded-full animate-spin`} />
  )
}
