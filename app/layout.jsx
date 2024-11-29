import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
});

export const metadata = {
  title: "Protibad App - যেখানেই অন্যায় সেখানেই প্রতিবাদ",
  description: "Developed by: UGV_Squad",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${hindSiliguri.variable} antialiased`}>{children}</body>
    </html>
  );
}
