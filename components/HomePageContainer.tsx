'use client'

import DealsSection from "./DealsSection"
import Electronics from "./Electronics"
import ExtraServices from "./ExtraServices"
import Footer from "./Footer"
import Home from "./Hero"
import HomeOutdoor from "./HomeOutdoor"
import Navbar from "./Navbar"
import Newsletter from "./Newsletter"
import RecommendedItems from "./RecommendedItems"
import SendQuote from "./SendQuote"
import SuppliersRegion from "./SuppliersRegion"

const HomePageContainer = () => {
  return (
    <div>
      <Navbar/>
      <Home />
      <DealsSection />
      <HomeOutdoor />
      <Electronics />
      <SendQuote />
      <RecommendedItems />
      <ExtraServices />
      <SuppliersRegion />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default HomePageContainer