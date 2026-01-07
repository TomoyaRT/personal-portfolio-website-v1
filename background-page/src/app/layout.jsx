import './globals.css';

export const metadata = {
  title: 'Flowing Black Background - Next.js',
  description: 'A demonstration of flowing black background effect using Next.js and React Three Fiber',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
