import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Menu, X, Briefcase } from "lucide-react";
import { useState } from "react";

const NavBar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow">
      <div className="container mx-auto px-4 2xl:px-20">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={assets.logo}
              alt="CareerConnect"
              className="h-8 w-auto md:h-10"
            />
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="rounded-md p-2 text-gray-700 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {user ? (
              <div className="flex items-center gap-6">
                <Link
                  to="/applications"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                >
                  <Briefcase className="h-5 w-5" />
                  <span>Applied Jobs</span>
                </Link>
                <div className="h-6 w-px bg-gray-300" />
                <p className="text-gray-700">
                  Hi, {user.firstName} {user.lastName}
                </p>
                <UserButton />
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <button className="text-gray-600 transition-colors hover:text-blue-600">
                  Recruiter Login
                </button>
                <button
                  className="rounded-full bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
                  onClick={openSignIn}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-4 px-2 pb-4 pt-2">
              {user ? (
                <>
                  <Link
                    to="/applications"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <Briefcase className="h-5 w-5" />
                    <span>Applied Jobs</span>
                  </Link>
                  <div className="flex items-center justify-between rounded-md px-3 py-2">
                    <p className="text-gray-700">
                      Hi, {user.firstName} {user.lastName}
                    </p>
                    <UserButton />
                  </div>
                </>
              ) : (
                <>
                  <button className="block w-full rounded-md px-3 py-2 text-left text-gray-600 hover:bg-gray-100">
                    Recruiter Login
                  </button>
                  <button
                    className="block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-white hover:bg-blue-700"
                    onClick={openSignIn}
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;