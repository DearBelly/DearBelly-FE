import './globals.css';                 
import { Provider } from '@/components/UI/Provider';
import Script from 'next/script';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <Script id="init-theme" strategy="beforeInteractive">
        {`
          (function(){
            try{
              var v = localStorage.getItem('lightMode');
              var isLight = v === null ? true : v === 'true';
              document.documentElement.setAttribute('data-app-theme', isLight ? 'light' : 'dark');
              // Chakra도 동기화해서 재덮어쓰기 방지
              localStorage.setItem('chakra-ui-color-mode', isLight ? 'light' : 'dark');
            }catch(e){}
          })();
        `}
      </Script>

      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
