export function SafeDial({ numOfOptions = 10, current = 0 }) {
  return (
    <div
      style={{
        background: "#222233",
        position: "absolute",
        top: -50,
        bottom: -50,
        left: -50,
        right: -50,
        borderRadius: "50%",
        transform: `rotate(-${(360 / numOfOptions) * current}deg)`,
        transition: "3s ease-in-out 0s",
        zIndex: "-1"
      }}
    >
      {[...Array(numOfOptions)].map((a, number) => (
        <span
          style={{
            font: "26px Monaco, MonoSpace",
            height: "340px",
            position: "absolute",
            width: "20px",
            left: "50%",
            top: "50%",
            transformOrigin: "bottom center",
            color: "#eeeeff",
            transform: `translate(-50%, -100%) rotate(${
              (360 / numOfOptions) * number
            }deg)`
          }}
        >
          {number}
        </span>
      ))}
    </div>
  );
}
