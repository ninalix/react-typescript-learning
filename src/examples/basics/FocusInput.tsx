import { useRef } from "react";

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text"/>
      <button onClick={handleFocus}>Focus input</button>
    </>
  );
}

export default FocusInput