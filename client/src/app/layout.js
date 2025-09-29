import './globals.css';
import AppBar from './components/AppBar';

export const metadata = {
  title: 'Book & Movie Journal',
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body suppressHydrationWarning>
        <AppBar children={children} />
      </body>
    </html>
  );
}
