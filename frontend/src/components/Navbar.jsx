import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User, LayoutDashboard, Bookmark, Inbox } from "lucide-react";
import Logo from "@/components/Logo";
import { useAuthStore } from "@/store/authStore";

const PUBLIC_LINKS = [
  { to: "/properties", label: "Browse Properties" },
  { to: "/services", label: "Document Services" },
  { to: "/?section=motive", label: "Why VisitSarva", scroll: "motive" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const { user, accessToken, logout } = useAuthStore();
  const isAuthed = !!accessToken && !!user;

  const handleLogout = () => {
    logout();
    setMenu(false);
    navigate("/");
  };

  const dashboardPath =
    user?.role === "seller"
      ? "/seller/dashboard"
      : user?.role === "admin"
      ? "/admin/dashboard"
      : "/home";

  return (
    <header
      data-testid="navbar"
      className="sticky top-0 z-40 bg-white border-b border-[#e6e4dd]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5" data-testid="navbar-logo">
          <Logo size={32} />
          <div className="leading-tight">
            <div className="font-display font-bold text-lg text-[#0F2340]">
              VisitSarva
            </div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-[#0D7A6B] font-medium">
              Zero Brokerage
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {PUBLIC_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm text-[#1a1f2e] hover:text-[#0D7A6B] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {!isAuthed ? (
            <>
              <Link to="/login" className="btn-outline" data-testid="nav-login">
                Login
              </Link>
              <Link to="/register" className="btn-primary" data-testid="nav-signup">
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setMenu((s) => !s)}
                data-testid="user-menu-toggle"
                className="flex items-center gap-2 px-3 py-2 border border-[#e6e4dd] rounded-md hover:border-[#0D7A6B]"
              >
                <div className="w-7 h-7 rounded-full bg-[#0D7A6B] text-white text-xs flex items-center justify-center font-medium">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-sm">{user.name?.split(" ")[0]}</span>
              </button>
              {menu && (
                <div
                  data-testid="user-menu"
                  className="absolute right-0 mt-2 w-56 bg-white border border-[#e6e4dd] rounded-md shadow-lg overflow-hidden"
                >
                  <Link
                    to={dashboardPath}
                    onClick={() => setMenu(false)}
                    data-testid="menu-dashboard"
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-[#fafaf7]"
                  >
                    <LayoutDashboard size={15} className="text-[#0D7A6B]" />
                    Dashboard
                  </Link>
                  {user.role === "buyer" && (
                    <>
                      <Link
                        to="/saved"
                        onClick={() => setMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-[#fafaf7]"
                      >
                        <Bookmark size={15} className="text-[#0D7A6B]" />
                        Saved
                      </Link>
                      <Link
                        to="/enquiries"
                        onClick={() => setMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-[#fafaf7]"
                      >
                        <Inbox size={15} className="text-[#0D7A6B]" />
                        My Enquiries
                      </Link>
                    </>
                  )}
                  <div className="px-4 py-2 text-[11px] uppercase tracking-wider text-[#5b6371] border-t border-[#e6e4dd]">
                    {user.role} · {user.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    data-testid="menu-logout"
                    className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm hover:bg-[#fafaf7] border-t border-[#e6e4dd] text-[#c0392b]"
                  >
                    <LogOut size={15} /> Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          className="lg:hidden text-[#0F2340]"
          onClick={() => setOpen((s) => !s)}
          data-testid="nav-mobile-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[#e6e4dd] bg-white">
          <div className="px-6 py-4 flex flex-col gap-3">
            {PUBLIC_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm py-2"
              >
                {l.label}
              </Link>
            ))}
            <div className="border-t border-[#e6e4dd] pt-3 flex flex-col gap-2">
              {!isAuthed ? (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="btn-outline justify-center">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="btn-primary justify-center">
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link to={dashboardPath} onClick={() => setOpen(false)} className="btn-outline justify-center">
                    <User size={15} /> {user.name}
                  </Link>
                  <button onClick={handleLogout} className="btn-outline justify-center">
                    <LogOut size={15} /> Sign out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
