// import Link from "next/link";
// import scss from "./adminHeader.module.scss";

// export default function AdminHeader() {
//   return (
//     <header className={scss.container}>
//       <div className="container">
//         <div className={scss.mainContainer}>
//           <div className={scss.logo}>ADMIN PANEL</div>

//           <nav className={scss.nav}>
//             <Link href="/admin">Products</Link>
//             <Link href="/admin/add">Add Product</Link>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import scss from "./adminHeader.module.scss";

export default function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className={scss.headerContainer}>
      <div className="container">
        <div className={scss.mainContainer}>
          {/* Левая часть: Логотип и статус */}
          <div className={scss.leftSection}>
            <div className={scss.logoBlock}>
              <span className={scss.logoText}>SALKYN</span>
              <span className={scss.badge}>ADMIN</span>
            </div>
            <div className={scss.statusIndicator}>
              <span className={scss.pulseDot}></span>
              <span className={scss.statusText}>Live</span>
            </div>
          </div>

          {/* Центральная часть: Навигация */}
          <nav className={scss.nav}>
            <Link
              href="/admin"
              className={`${scss.navLink} ${pathname === "/admin" ? scss.active : ""}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="9"></rect>
                <rect x="14" y="3" width="7" height="5"></rect>
                <rect x="14" y="12" width="7" height="9"></rect>
                <rect x="3" y="16" width="7" height="5"></rect>
              </svg>
              <span>Все товары</span>
            </Link>

            <Link
              href="/admin/add"
              className={`${scss.navLink} ${pathname === "/admin/add" ? scss.active : ""}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Добавить товар</span>
            </Link>
          </nav>

          {/* Правая часть: Быстрый переход на сайт */}
          <div className={scss.rightSection}>
            <Link href="/" className={scss.viewSiteBtn}>
              <span>На сайт</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}