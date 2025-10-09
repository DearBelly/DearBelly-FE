import { Provider } from "@/components/UI/Provider"
import "@/app/globals.css"
import { KakaoScript } from "@/components/KakaoScript/KakaoScript";
import { Metadata, Viewport } from "next";
import { PreventZoomWrapper } from "@/components/PreventZoomWrapper/PreventZoomWrapper";

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
      </head>
      <body>
        <PreventZoomWrapper>
          <Provider>{children}</Provider>
        </PreventZoomWrapper>
        <KakaoScript />
      </body>
    </html>
  )
}
