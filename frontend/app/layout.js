import './globals.css';

export const metadata = {
    title: 'Inventory & Catalog Service',
    description: 'Manage your inventory and view external catalog',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>{children}</body>
        </html>
    );
}
