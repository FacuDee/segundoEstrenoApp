import FAQ from '../../components/FaQ/FAQ';
import FeaturedProducts from '../../components/featuredProducts/featuredProducts';
import OpinionsCarousel from '../../components/OpinionsCarousel/OpinionsCarousel';
import Banner from '../../components/Banner/Banner';
import Compromisos from '../../components/Compromisos/Compromisos';

const Home = () => {
	return (
		<main>
			<FeaturedProducts/>	
			<Banner />
			<Compromisos />
			<OpinionsCarousel/>
			<FAQ />
		</main>
	);
};

export default Home;
