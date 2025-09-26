import "./Footer.css";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

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
            <h4>Contacto</h4>
            <p>
              <i className="fas fa-envelope"></i> segundoestreno@gmail.com
            </p>
          </div>
          <div className="footer-col legal">
            <h4>
              <a href="terminos.html">Términos y condiciones</a>
            </h4>
            <p>Todos los derechos reservados</p>
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
