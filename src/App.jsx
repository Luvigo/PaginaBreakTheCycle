import { useState, useCallback } from 'react'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Layout        from '@/components/layout/Layout'
import ParticleField from '@/components/ui/ParticleField'
import LoadingScreen from '@/components/ui/LoadingScreen'
import Home          from '@/pages/Home'

export default function App() {
  useSmoothScroll()
  const [loaded, setLoaded] = useState(false)
  const handleDone = useCallback(() => setLoaded(true), [])

  return (
    <>
      {!loaded && <LoadingScreen onDone={handleDone} />}
      <ParticleField count={20} />
      <Layout>
        <Home />
      </Layout>
    </>
  )
}
