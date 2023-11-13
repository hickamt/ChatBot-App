import ReactLoading from "react-loading";

// Spinning Animation
export default function SpinAnimation() {
  return (
    <ReactLoading
      type={"spin"}
      color="#ffffff"
      height={"5%"}
      width={"5%"}
      className="spin-animation mx-auto"
    />
  );
}
