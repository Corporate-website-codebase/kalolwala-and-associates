import dynamic from "next/dynamic";

const Discover = dynamic(() => import("@/Home/Discover"));

const Locations = dynamic(() => import("@/Home/Locations"));
const Portfolio = dynamic(() => import("@/Home/Portfolio"));
const Services = dynamic(() => import("@/Home/Services"));
const Stats = dynamic(() => import("@/Home/Stats"));
const StatsTop = dynamic(() => import("@/Home/StatsTop"));
const Footers = dynamic(() => import("@/components/Footers"));
// import Discover from '@/Home/Discover'
import Hero from '@/Home/Hero'
// import Locations from '@/Home/Locations'
// import Portfolio from '@/Home/Portfolio'
// import Services from '@/Home/Services'
// import Stats from '@/Home/Stats'
// import StatsTop from '@/Home/StatsTop'
// import Footers from '@/components/Footers'
import { organizationGraphSchema } from '@/data/schema'

export default function Home() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationGraphSchema) }}
            />
            <Hero />
            <Discover />
            <Locations />
            <Portfolio />
            <div className="marginal">
                <Services />
            </div>
            <StatsTop />
            <div className="marginal">
                <Stats />
                <Footers nextPageName="Culture" nextPageLink="/culture" />
            </div>
        </>
    )
}
