import React from 'react';
import './globals.css';

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <head>
          <title>ATS</title>
          <meta name="description" content="Automatic Timetabling System"></meta>
        </head>
        <body>
          {children}
          </body>
      </html>
    )
  }