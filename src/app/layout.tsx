import { Provider } from "@/components/UI/Provider"
import "@/app/globals.css"
import { KakaoScript } from "@/components/KakaoScript/KakaoScript";
import { Metadata } from "next";
import { Viewport } from "next";

export const metadata: Metadata = {
  title: "Dear Belly",
  description: "엄마를 위한 케어, 아이를 위한 기록",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: [
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f7f7" },
    { media: "(prefers-color-scheme: dark)", color: "#202020" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="favicon" href="./favicon-32x32.png" />
        <link rel="apple-touch-icon" href="./apple-touch-icon.png" />
      {/* <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.6/kakao.min.js"
        integrity={process.env.NEXT_PUBLIC_KAKAO_SDK_INTEGRITY}
        crossOrigin="anonymous"
        strategy="beforeInteractive"
        onLoad={() => {
          if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
          }
        }}
      /> */}
      </head>
      <body>
        <Provider>{children}</Provider>
        <KakaoScript />
      </body>
    </html>
  )
}
