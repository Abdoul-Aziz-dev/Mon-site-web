import './globals.css';
import './responsive-layouts.css';
import './homepage-responsive.css';
import './auth-responsive.css';
import { ReactNode } from 'react';
import ClientWrapper from './components/ClientWrapper';

export const metadata = {
  title: 'Groupe Scolaire Elhadj Amadou Barry | GSEAB',
  description: 'Une institution d\'excellence dédiée à la formation des générations de demain.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
