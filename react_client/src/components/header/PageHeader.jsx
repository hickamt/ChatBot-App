import SpinAnimation from "../animation/SpinAnimation";

export default function PageHeader({ title, isLoading }) {
  return isLoading ? (
    <SpinAnimation />
  ) : (
    <h1 className="message-title">{title}</h1>
  );
}
