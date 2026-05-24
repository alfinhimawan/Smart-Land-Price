import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageContainer } from '@/components/layout/PageContainer'
import { HeroSection } from '@/components/landing/HeroSection'
import { FeatureSection } from '@/components/landing/FeatureSection'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />

      <PageContainer>
        <HeroSection />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FeatureSection />
        </motion.div>
      </PageContainer>

      <Footer />
    </div>
  )
}
