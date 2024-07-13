import NavBar from '@components/all/NavBar/NavBar';

export default function NavBarCommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full">
      {children}
      <NavBar />
    </div>
  );
}
