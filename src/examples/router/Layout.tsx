import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav>
        <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/users" className={({isActive}) => isActive ? "active" : ""}>Users</NavLink>
        <NavLink to="/about" className={({isActive}) => isActive ? "active" : ""}>About</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;