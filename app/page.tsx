import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Now from './components/Now'
import { getProjects, getNowItems } from '../lib/notion'

export default async function Home() {
  const projects = await getProjects()
  const nowItems = await getNowItems()

  return (
    <main>
      <Nav />
      <Hero />
      <Projects projects={projects} />
      <Now items={nowItems} />
    </main>
  )
}
