import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageContainer } from '@/components/layout/PageContainer'
import { ProjectOverview } from '@/components/about/ProjectOverview'
import { IDWExplanation } from '@/components/about/IDWExplanation'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const TypewriterText = ({ text, delay = 0, speed = 50, showCursor = true }: { text: string, delay?: number, speed?: number, showCursor?: boolean }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let timeoutId = setTimeout(() => {
      let i = 0;
      intervalId = setInterval(() => {
        setDisplayText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(intervalId);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay, speed]);

  return (
    <>
      {displayText}
      {showCursor && (
        <span 
          className="inline-block w-[4px] h-[1em] bg-primary ml-1 animate-pulse align-middle" 
          style={{ visibility: displayText.length === text.length ? 'hidden' : 'visible' }}
        />
      )}
    </>
  );
};


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Immersive Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] animate-float opacity-70 pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-screen filter blur-[100px] animate-float-delayed opacity-70 pointer-events-none" />
      
      <Navbar />

      <PageContainer className="pt-32 pb-20 relative z-10">
        {/* Page Title Hero */}
        <div className="max-w-5xl mx-auto text-center mb-32 px-4 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground mb-8 leading-tight min-h-[140px] md:min-h-[100px]">
              <TypewriterText text="Tentang " delay={100} speed={40} showCursor={false} />
              <br className="block md:hidden" />
              <span className="gradient-text whitespace-nowrap">
                <TypewriterText text="Smart Land Price" delay={600} speed={40} showCursor={true} />
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-3xl text-muted-foreground mx-auto max-w-3xl font-light leading-relaxed"
          >
            Analisis Spasial dan Prediksi Harga Lahan Koridor Tol IKN
          </motion.p>
          
          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-20 flex justify-center animate-bounce opacity-50"
          >
            <div className="w-[30px] h-[50px] rounded-full border-2 border-muted-foreground flex justify-center p-2">
              <div className="w-1 h-3 bg-muted-foreground rounded-full animate-float"></div>
            </div>
          </motion.div>
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
