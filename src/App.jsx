import { CartProvider } from './context/CartContext'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import MenuSection from './components/sections/MenuSection'
import ExperienceSection from './components/sections/ExperienceSection'
import LocationsSection from './components/sections/LocationsSection'
import Footer from './components/layout/Footer'

function App() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
        <MenuSection />
        <ExperienceSection />
        <LocationsSection />
      </main>
      <Footer />
    </CartProvider>
  )
}

export default App
