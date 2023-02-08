import { Button } from "antd";

export default function Logout({ setUser }) {
  return (
    <div>
      <Button
        onClick={() => {
          setUser(null);
          localStorage.removeItem("user");
        }}
        type="primary"
        size="large"
      >
        Logout
      </Button>
    </div>
  );
}
