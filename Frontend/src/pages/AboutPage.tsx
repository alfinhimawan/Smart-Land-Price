import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageContainer } from '@/components/layout/PageContainer'
import { ProjectOverview } from '@/components/about/ProjectOverview'
import { IDWExplanation } from '@/components/about/IDWExplanation'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <PageContainer className="pt-32 pb-20">
        {/* Page Title */}
        <div className="max-w-4xl mx-auto text-center mb-16 px-4">
          <motion.h1 
            className="section-title"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
              hidden: {}
            }}
          >
            {"Tentang Smart Land Price".split("").map((char, i) => (
              <motion.span 
                key={i} 
                variants={{
                  visible: { opacity: 1, display: "inline-block" },
                  hidden: { opacity: 0, display: "none" }
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <motion.span 
              variants={{
                visible: { visibility: "hidden", transition: { delay: 1.5 } },
                hidden: { visibility: "visible" }
              }}
              className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle animate-pulse"
            />
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="section-subtitle mx-auto"
          >
            Pelajari tentang interpolasi spasial dan prediksi harga tanah untuk jaringan tol IKN
          </motion.p>
        </div>

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
