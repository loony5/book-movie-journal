import './globals.css';
import { UserProvider } from '@/context/UserContext';
import AppBar from './components/AppBar';

export const metadata = {
  title: 'Book & Movie Journal',
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body suppressHydrationWarning>
        <UserProvider>
          <AppBar>{children}</AppBar>
        </UserProvider>
      </body>
    </html>
  );
}
