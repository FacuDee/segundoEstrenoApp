import FAQ from '../../components/FaQ/FAQ';
import FeaturedProducts from '../../components/featuredProducts/featuredProducts';
import OpinionsCarousel from '../../components/OpinionsCarousel/OpinionsCarousel';
import Banner from '../../components/Banner/Banner';
import Compromisos from '../../components/Compromisos/Compromisos';
import HeroCarousel from '../../components/HeroCarousel/HeroCarousel';
import DiscountPopup from '../../components/DiscountPopup/DiscountPopup';

const Home = () => {
	return (
		<main>
			<HeroCarousel />
			<Compromisos />
			<Banner />
			<FeaturedProducts />
			<OpinionsCarousel />
			<FAQ />
			<DiscountPopup />
		</main>
	);ss
};

export default Home;