import {  Send, Phone, MapPin } from "lucide-react";
import scss from "./footer.module.scss";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={scss.footer}>
      <div className="container">
        <div className={scss.mainContainer}>
          <div className={scss.brandBlock}>
            <img src="/logo.png" alt="Salkyn Logo" className={scss.logo} />
            <p className={scss.description}>
              Профессиональный монтаж и обслуживание кондиционеров. Комфортный
              климат в вашем доме — наша главная задача.
            </p>
          </div>

          <div className={scss.infoBlock}>
            <h4>Контакты</h4>
            <div className={scss.links}>
              <a href="tel:+996552320914">
                <Phone size={14} />
                <span>+996 552 320 914</span>
              </a>
              <div className={scss.geo}>
                <MapPin size={14} />
                <span>Бишкек, Кыргызстан</span>
              </div>
            </div>
          </div>

          <div className={scss.socialBlock}>
            <h4>Мы в соцсетях</h4>
            <div className={scss.socials}>
              {/* Исправленный компонент с маленькой буквой g */}
              {/* <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a> */}
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
              >
                <Send size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className={scss.bottomBar}>
          <p>&copy; {currentYear} Salkyn. Все права защищены.</p>
          <p className={scss.developer}>Developed with ❤️</p>
        </div>
      </div>
    </footer>
  );
}
