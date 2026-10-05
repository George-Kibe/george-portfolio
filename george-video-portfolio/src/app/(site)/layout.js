import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Public pages share the header and footer. The admin panel lives outside
// this group with its own layout.
export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <ToastContainer theme="colored" />
      <Footer />
    </>
  );
}
