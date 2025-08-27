export const metadata = { title: "Domino's App", description: "Simple assignment app" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#fafafa' }}>{children}</body>
    </html>
  );
}
