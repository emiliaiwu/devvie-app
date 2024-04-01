import { Header, Hero } from "../components";
import Benefits from "../components/benefits/Benefits";
import Cta from "../components/benefits/CTA";
import Features from "../components/benefits/Features";
import Footer from "../components/benefits/Footer";



const LandingPage = () => {
	return (
		<div className='max-w-[100vw] w-full mx-auto flex justify-between flex-col items-center overflow-x-hidden'>
			<Header />
			<main className='flex justify-center items-center flex-col w-full min-h-screen  '>
				<Hero />
				<Benefits />
				<Features />
				<Cta />
			
			</main>
			<Footer />
		</div>
	);
};

export default LandingPage;
