import React from 'react'
import Hero from '../components/Hero'
import Trends from '../components/Trends'
import Contact from '../components/Contact'

const Home = () => {
  return (
    <>
    <div className="home">
        <Hero/>
        <Trends/>
        <Contact/>
    </div>
    </>
  )
}

export default Home
