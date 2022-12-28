import Logout from "./Logout";

export default function Header({ setUser }) {
  return (
    <div className="header">
      <header>Image Loader</header>
      <div className="selected-header">
        <Logout setUser={setUser} />
      </div>
    </div>
  );
}
