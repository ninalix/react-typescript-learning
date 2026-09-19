import { useState } from "react";

type UserStatusProps = {
  name: string;
}

function UserStatus(props: UserStatusProps) {
  const [status, setStatus] = useState(false);

  const handleClick = () => {
    setStatus(prev => !prev)
  }

  return (
    <div>
      <p>{props.name} is {status? "online" : "offline"}</p>
      <button onClick={handleClick}>Toggle status</button>
    </div>
  )
}

export default UserStatus