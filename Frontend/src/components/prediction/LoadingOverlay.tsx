import { Loader } from '@/components/ui'
import { motion } from 'framer-motion'

export const LoadingOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Loader size="lg" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-2"
        >
          <p className="text-lg font-semibold text-foreground">Menghitung Interpolasi Spasial...</p>
          <p className="text-sm text-muted-foreground">Menggunakan metode IDW untuk prediksi presisi</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
