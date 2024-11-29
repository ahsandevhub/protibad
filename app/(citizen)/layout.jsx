import Footer from "./Footer";
import Header from "./Header";

export const metadata = {
  title: "Protibad App - যেখানেই অন্যায় সেখানেই প্রতিবাদ",
  description: "Developed by: UGV_Squad",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
