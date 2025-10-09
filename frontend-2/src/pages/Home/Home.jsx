import FAQ from '../../components/FaQ/FAQ';
import FeaturedProducts from '../../components/featuredProducts/featuredProducts';
import OpinionsCarousel from '../../components/OpinionsCarousel/OpinionsCarousel';

const Home = () => {
	return (
		<main>
			<FeaturedProducts/>	
			<OpinionsCarousel/>
			<FAQ />
		</main>
	);
};

export default Home;
