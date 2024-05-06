import MainNav from "@/components/main-nav";
// Root layout component for the application
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <MainNav />
      {children}
    </>
  );
}
