import { Button } from "antd";

export default function Logout({ setUser }) {
  return (
    <div>
      <Button onClick={() => setUser(null)} type="primary" size="large">
        Logout
      </Button>
    </div>
  );
}
