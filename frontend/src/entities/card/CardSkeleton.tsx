import scss from "./card.module.scss";

export default function CardSkeleton() {
  return (
    <div className={scss.cardContainer} style={{ opacity: 0.5 }}>
      <div className={scss.imageWrapper} style={{ background: "#e2e8f0" }} />
      <div className={scss.content}>
        <div
          style={{
            height: "16px",
            background: "#e2e8f0",
            borderRadius: "4px",
            width: "80%",
          }}
        />
        <div
          style={{
            height: "20px",
            background: "#e2e8f0",
            borderRadius: "4px",
            width: "40%",
          }}
        />
      </div>
    </div>
  );
}
