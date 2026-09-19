import useToggle from './useToggle';

function ToggleDemo() {
  const { value, toggle, setTrue, setFalse } = useToggle();

  return (
    <>
      <p>Status: {value ? "ON" : "OFF"}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={setTrue}>Turn On</button>
      <button onClick={setFalse}>Turn Off</button>
    </>
    
  );
}

export default ToggleDemo