import React from 'react'
import Hero from '../components/Hero'
import Trends from './Trends'
import Contact from '../components/Contact'
import ESG from './ESG'

const Home = () => {
  return (
    <>
    <div className="home">
        <Hero/>
        <ESG/>
        {/* <Trends/> */}
        <Contact/>
    </div>
    </>
  )
}

export default Home
