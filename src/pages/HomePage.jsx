import Hero from "../components/Hero";
import LatestProducts from "../components/LatestProducts";
import Testimonials from "../components/Testimonials";

function HomePage() {
  return (
    <div className="relative mt-13">
      <Hero />
      <LatestProducts/>
      <Testimonials />
    </div>
    )
}
export default HomePage;