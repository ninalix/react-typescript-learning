import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const clickPlus = () => {
    setCount(prevCount => prevCount + 1);
  }

  const clickMinus = () => {
    setCount(prevCount => prevCount - 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={clickPlus}>+1</button>
      <button onClick={clickMinus}>-1</button>
    </div>
  )
}

export default Counter