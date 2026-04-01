import './globals.css';
import { ReactNode } from 'react';
import ClientWrapper from './components/ClientWrapper';

export const metadata = {
  title: 'Groupe Scolaire Elhadj Amadou Barry | GSEAB',
  description: 'Une institution d\'excellence dédiée à la formation des générations de demain.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
