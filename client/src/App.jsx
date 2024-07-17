import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Trends from './components/Trends'
import Contact from './components/Contact'

function App() {

  return (
    <div className='App'>
      <Navbar/>
      <Hero/>
      <Trends/>
      <Contact/>
    </div>
  )
}

export default App
