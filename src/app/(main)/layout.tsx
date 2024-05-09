import MainNav from "@/components/main-nav";

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
