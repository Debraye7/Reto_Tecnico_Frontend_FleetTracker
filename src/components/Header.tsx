import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b border-slate-200">
      <nav className="page-container flex items-center">
        <Link to="/" className="w-fit">
          <h1 className="text-3xl font-bold text-blue-500">FleetTracker</h1>
        </Link>
      </nav>
    </header>
  );
};

export default Header;