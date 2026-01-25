import CustomerStories from "./components/home/customer-stories";
import Faq from "./components/home/faq";
import HeroSection from "./components/home/hero";
import Innovation from "./components/home/innovation";
import OnlinePresence from "./components/home/online-presence";
import GameProjects from "./components/home/game-projects";
import BlockchainProjects from "./components/home/blockchain-projects";
import Solutions from "./components/home/solution";
import Subscription from "./components/home/subscription";
import WebResult from "./components/home/web-result";


export default function Home() {
  return (
    <main>
      {/* ---------------------Hero section Starts-----------------  */}
      <HeroSection />
      {/* ---------------------Hero section Ends-----------------  */}

      {/* ---------------------Web result section Starts-----------------  */}
      <WebResult />
      {/* ---------------------Web result section Ends-----------------  */}

      {/* ---------------------Innovation section Starts-----------------  */}
      <Innovation />
      {/* ---------------------Innovation section Ends-----------------  */}

      {/* ---------------------Online presence section Starts-----------------  */}
      <OnlinePresence />
      {/* ---------------------Online presence section Ends-----------------  */}

      {/* ---------------------Game Projects section Starts-----------------  */}
      <GameProjects />
      {/* ---------------------Game Projects section Ends-----------------  */}

      {/* ---------------------Blockchain Projects section Starts-----------------  */}
      <BlockchainProjects />
      {/* ---------------------Blockchain Projects section Ends-----------------  */}

      {/* ---------------------Customer Stories section Starts-----------------  */}
      <CustomerStories />
      {/* ---------------------Customer Stories section Ends-----------------  */}

      {/* ---------------------Subscription section Starts-----------------  */}
      <Subscription />
      {/* ---------------------Subscription section Ends-----------------  */}

      {/* ---------------------Faq section Starts-----------------  */}
      <Faq />
      {/* ---------------------Faq section Ends-----------------  */}

      {/* ---------------------Solutions section Starts-----------------  */}
      <Solutions />
      {/* ---------------------Solutions section Ends-----------------  */}
    </main>
  )
}
