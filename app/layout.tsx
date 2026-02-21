import './globals.css';

export const metadata = {
    title: 'Guest Experience Portal',
    description: 'Share your feedback and join our VIP club',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
