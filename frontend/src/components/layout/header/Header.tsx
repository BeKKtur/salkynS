import { Phone, MessageSquare } from "lucide-react"; // npm i lucide-react
import scss from "./header.module.scss";

export default function Header() {
  return (
    <header className={scss.header}>
      <div className="container">
        <div className={scss.mainContainer}>
          {/* Логотип с Blur-эффектом на фоне */}
          <a href="/" className={scss.logoLink}>
            <img src="/logo.png" alt="Salkyn" />
          </a>

          {/* Современный блок контактов */}
          <div className={scss.rightSide}>
            {/* Статус-индикатор (Работаем / Онлайн) */}
            <div className={scss.statusBadge}>
              <span className={scss.pulseDot}></span>
              <span className={scss.statusText}>Мы на связи</span>
            </div>

            {/* Кнопки связи */}
            <div className={scss.contactActions}>
              <a href="tel:+996552320914" className={scss.phoneBtn}>
                <Phone size={16} />
                <span>+996 552 320 914</span>
              </a>

              {/* Быстрая ссылка в мессенджер (Трендовая кнопка) */}
              <a
                href="https://wa.me/996552320914"
                target="_blank"
                rel="noreferrer"
                className={scss.chatBtn}
              >
                <MessageSquare size={16} />
                <span>Написать</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
