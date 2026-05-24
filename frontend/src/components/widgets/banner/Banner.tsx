import scss from "./banner.module.scss";
import Link from "next/link";

export default function Banner() {
  return (
    <section className={scss.banner_wrapper}>
      <div className="container">
        <div className={scss.main_container}>
          <div className={scss.content_section}>
            <div className={scss.text_block}>
              <h1 className={scss.title}>
                ПРОХЛАДА И КОМФОРТ
                <br />
                <span>В ВАШЕМ ДОМЕ</span>
              </h1>

              <p className={scss.subtitle}>
                Летние скидки до -25% на популярные модели
              </p>
            </div>

            {/* <Link href="/catalog" className={scss.cta_button}>
              СМОТРЕТЬ КАТАЛОГ
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
}
