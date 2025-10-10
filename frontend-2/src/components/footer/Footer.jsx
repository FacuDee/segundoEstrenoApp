import "./Footer.css";
import { FaInstagram, FaTiktok, FaYoutube, FaEnvelope, FaMobileAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-col redes">
            <h4>Seguinos</h4>
            <div className="footer-social">
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="TikTok">
                <FaTiktok />
              </a>
              <a href="#" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>
          <div className="footer-col contacto">
            <h4>Correo electrónico</h4>
            <p>
              <FaEnvelope /> segundoestreno@gmail.com
            </p>
          </div>
          <div className="footer-col phone">
            <h4>Celular de contacto:</h4>
            <p>
              <FaMobileAlt /> 2284-729799
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; SEGUNDO ESTRENO | 2025</span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
