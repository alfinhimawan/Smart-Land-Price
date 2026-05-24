import { useState, useCallback } from 'react'
import { Coordinate, PredictionResult } from '@/types'

export const usePrediction = () => {
  const [selectedCoordinate, setSelectedCoordinate] = useState<Coordinate | null>(null)
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLocationSelect = useCallback((coordinate: Coordinate) => {
    setSelectedCoordinate(coordinate)
    setPredictionResult(null)
  }, [])

  const handleSetLoading = useCallback((loading: boolean) => {
    setIsLoading(loading)
  }, [])

  const handleSetPredictionResult = useCallback((result: PredictionResult | null) => {
    setPredictionResult(result)
  }, [])

  return {
    selectedCoordinate,
    predictionResult,
    isLoading,
    handleLocationSelect,
    handleSetLoading,
    handleSetPredictionResult,
  }
}
