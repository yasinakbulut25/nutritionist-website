import "./../styles/globals.css";
import { Outfit } from "next/font/google";
import Header from "@/components/header/Header";
import ClientProvider from "./ClientProvider";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body
        className={`${outfit.className} antialiased min-h-dvh bg-slate-50`}
        suppressHydrationWarning
      >
        <ClientProvider>
          <Header />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
