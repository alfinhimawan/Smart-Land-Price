import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageContainer } from '@/components/layout/PageContainer'
import { ProjectOverview } from '@/components/about/ProjectOverview'
import { IDWExplanation } from '@/components/about/IDWExplanation'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />

      <PageContainer className="pt-32 pb-20">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16 px-4"
        >
          <h1 className="section-title">About Smart Land Price</h1>
          <p className="section-subtitle">
            Pelajari tentang interpolasi spasial dan prediksi harga tanah untuk jaringan tol IKN
          </p>
        </motion.div>

        {/* Project Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ProjectOverview />
        </motion.div>

        {/* IDW Explanation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <IDWExplanation />
        </motion.div>
      </PageContainer>

      <Footer />
    </div>
  )
}
