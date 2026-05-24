import Products from "@/components/widgets/Products/Products";
import scss from "./home.module.scss";

export default function Home() {
  return (
    <div className={scss.container}>
      <div className="container">
              <div className={scss.mainContainer}>
                  <Products/>
        </div>
      </div>
    </div>
  );
}
