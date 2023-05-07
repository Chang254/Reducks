import NavBar from "./NavBar";

//This component basically makes sure each page has the Navbar.
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}
