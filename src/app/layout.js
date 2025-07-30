import { Geist, Geist_Mono , Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "mostui",
  description: "Mostui is a mood-driven UI generator that transforms your feelings into personalized, beautiful designs. Simply describe your vibe, and our AI creates a unique theme with colors, fonts, and styles that visually match your mood.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://ik.imagekit.io/dvjwbf9tt/mostui.png?updatedAt=1753410983685"
        />
        <meta name="theme-color" content="#000000" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        </head>

      <body
        className={` ${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
