"use client";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Search from "@/components/layout/search/Search";
import Banner from "@/components/widgets/banner/Banner";
import Promo from "@/components/widgets/promo/Promo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

type ChildrenProps = {
  children: React.ReactNode;
};
const queryClient = new QueryClient();
const Layout = ({ children }: ChildrenProps) => {
  const path = usePathname();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="layout">
        {!path.includes("/admin") && <Header />}

        {path === "/" && <Banner />}
        <main>{children}</main>
        {!path.includes("/admin") && <Promo />}
        <Footer />
      </div>
    </QueryClientProvider>
  );
};

export default Layout;
