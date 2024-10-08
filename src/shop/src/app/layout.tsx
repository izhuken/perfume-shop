import '@/shared/styles/base.css';
import { CartModal, Footer, HeaderModal, RootProvider } from '@/widgets';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <head>
        <meta name='theme-color' content='#000' />
      </head>
      <body>
        <RootProvider>
          <div id='root'>{children}</div>
          <div id='modal-root'>
            <HeaderModal />
            <CartModal />
          </div>
        </RootProvider>
        <Footer />
      </body>
    </html>
  );
}
