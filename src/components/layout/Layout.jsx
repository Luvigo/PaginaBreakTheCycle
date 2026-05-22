import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div
      className="relative min-h-dvh overflow-x-hidden"
      style={{ background: '#FEFAE0' }}
    >
      <Navbar />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  )
}
