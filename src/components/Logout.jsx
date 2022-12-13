import { Button } from "antd";


export default function Logout({setUser}) {
  return (
    <Button onClick={() => setUser(null)}
    type="primary"
    size="large"
    >Logout</Button>
  )
}
