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
          <div className="w-dvw h-dvh bg-gray-950">
          {children}
          </div>
          </body>
      </html>
    )
  }