import './NavBar.css';
import { NavLink, useLocation } from 'react-router-dom';

function NavBar() {
  const { pathname } = useLocation();
  return (
    <nav className="nav">
        <h1>Dappley Performance Metrics</h1>
        <ul className="nav-links">
            <li className={"home-link " + (pathname === '/' ? "active" : "")}>
              <NavLink activeClassName='active' to='/' isActive={() => pathname === '/'}>
                  Home
              </NavLink>
            </li>
            <li className={"history-link " + (pathname === '/history' ? "active" : "")}>
              <NavLink activeClassName='active' to='/history'>
                  History
              </NavLink>
            </li>
        </ul>
    </nav>
  );
  }
  
  export default NavBar;