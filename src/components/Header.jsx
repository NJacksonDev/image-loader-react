import Logout from "./Logout";

export default function Header({ setUser }) {
  return (
    <div className="header">
      <header>Image Loader</header>
      <div className="logout">
        <Logout setUser={setUser} />
      </div>
    </div>
  );
}
