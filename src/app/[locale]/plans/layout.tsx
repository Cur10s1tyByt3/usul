import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { env } from "@/env";

export default function PlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark:bg-background bg-[#F8F6F6]">
      <Navbar />

      {children}

      <Footer />
    </div>
  );
}
