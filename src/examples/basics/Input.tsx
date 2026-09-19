import { useState } from "react";

function NameInput() {
  const [name, setName] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  return (
    <div>
      <label>Your name:</label>
      <input value={name} onChange={handleChange}/>
      <p>{name}</p>
    </div>
  )
}

export default NameInput