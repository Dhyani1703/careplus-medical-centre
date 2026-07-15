import { useAuth } from "../context/AuthContext";

export default function Topbar({ onMenuClick }) {
  const { user } = useAuth();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <header className="topbar">
      <button
        type="button"
        className="topbar-menu-btn"
        onClick={onMenuClick}
        aria-label="Open or close sidebar"
      >
        ☰
      </button>

      <div className="topbar-right">
        <div className="topbar-user">
          <span className="topbar-avatar">{initials}</span>
          <span className="topbar-username">
            {user?.name || "User"}
          </span>
        </div>
      </div>
    </header>
  );
}