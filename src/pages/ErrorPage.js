import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const Navigate = useNavigate();
  return (
    <>
      <h1>404 NOT FOUND </h1>
      <p
        onClick={() => {
          Navigate("/");
        }}
        style={{ cursor: "pointer", color: "Blue" }}>
        Go to Homepage
      </p>
    </>
  );
}
