import useWindowWidth from "./useWindowWidth";

function WindowWidthDemo() {
  const windowWidth = useWindowWidth();

  return (
    <>
      <p>Window width: {windowWidth} px</p>
      <p>{windowWidth < 768 ? "Mobile" : "Desktop"}</p>
    </>
  );
}

export default WindowWidthDemo