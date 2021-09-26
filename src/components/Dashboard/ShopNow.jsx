import { useHistory } from "react-router-dom";

export function ShopNow() {
  const history = useHistory();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
        textTransform: "uppercase",
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      <div
        onClick={() => {
          history.push("/shop/men");
        }}
        style={{
          padding: "8px 12px",
          color: "#fff",
          backgroundColor: "#ff3e6c",
        }}
      >
        Shop Now
      </div>
    </div>
  );
}
