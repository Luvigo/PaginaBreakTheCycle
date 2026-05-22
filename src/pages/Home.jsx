import Hero       from '@/components/sections/Hero'
import Purpose    from '@/components/sections/Purpose'
import Levels     from '@/components/sections/Levels'
import Gallery    from '@/components/sections/Gallery'
import Team       from '@/components/sections/Team'
import CodeBehind from '@/components/sections/CodeBehind'
import Download   from '@/components/sections/Download'

export default function Home() {
  return (
    <>
      <Hero />
      <Purpose />
      <Levels />
      <Gallery />
      <Team />
      <CodeBehind />
      <Download />
    </>
  )
}
