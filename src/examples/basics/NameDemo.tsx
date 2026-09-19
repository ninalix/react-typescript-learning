import useLocalStorage from '../hooks/useLocalStorage';

function NameDemo() {
  const [name, setName] = useLocalStorage("name", "");

  return (
    <>
      <p>Name: {name}</p>
      <input value={name} onChange={(event) => setName(event.target.value)}/>
    </>
  );
}

export default NameDemo