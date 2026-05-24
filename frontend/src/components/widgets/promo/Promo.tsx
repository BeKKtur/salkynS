import React from "react";
import scss from "./promo.module.scss";

export default function Promo() {
  return (
    <section className={scss.serviceSection}>
      <div className="container">
        <div className={scss.topBlock}>
          <span className={scss.badge}>НАШ СЕРВИС</span>
          <h2>Установка под ключ и обслуживание</h2>
          <p>
            Вам не нужно искать сторонних монтажников — мы берём все хлопоты по
            доставке, установке и настройке климатической техники на себя.
          </p>
        </div>

        <div className={scss.grid}>
          <div className={scss.card}>
            <div className={scss.iconWrapper}>⚡️</div>
            <h3>Быстрый монтаж</h3>
            <p>
              Установим кондиционер за 2-3 часа в любой удобный для вас день.
              Работаем аккуратно и без лишнего шума.
            </p>
          </div>

          <div className={scss.card}>
            <div className={scss.iconWrapper}>💎</div>
            <h3>Чистота и порядок</h3>
            <p>
              Используем профессиональные перфораторы с пылеудалением. Никакой
              строительной пыли и грязи на ваших стенах и мебели.
            </p>
          </div>

          <div className={scss.card}>
            <div className={scss.iconWrapper}>🛠</div>
            <h3>Официальная гарантия</h3>
            <p>
              Даем железную гарантию до 3-х лет как на само оборудование, так и
              на качество выполненных монтажных работ.
            </p>
          </div>
        </div>

        {/* <div className={scss.ctaBlock}>
          <button className={scss.ctaBtn}>
            Заказать бесплатный замер и расчет
          </button>
        </div> */}
      </div>
    </section>
  );
}
