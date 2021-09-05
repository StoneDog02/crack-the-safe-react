import { useEffect, useState } from "react";

export function SafeDial({
  numOfOptions = 10,
  current = 0,
  correctValues = [],
  wrongValues = []
}) {
  const [dialValue, setDialValue] = useState(current);
  useEffect(() => {
    if (current != null) {
      setDialValue(current);
    }
  }, [current]);
  return (
    <div
      style={{
        background: "#181822",
        position: "absolute",
        top: -50,
        bottom: -50,
        left: -50,
        right: -50,
        borderRadius: "50%",
        transform: `rotate(-${(360 / numOfOptions) * dialValue}deg)`,
        transition: "3s ease-in-out 0s",
        zIndex: "-1"
      }}
    >
      {[...Array(numOfOptions)].map((a, number) => {
        let color = "#eeeeff";
        if (correctValues.includes(number)) {
          color = "limegreen";
        }
        if (wrongValues.includes(number)) {
          color = "darkred";
        }
        return (
          <span
            style={{
              fontSize: "26px",
              height: "340px",
              position: "absolute",
              width: "20px",
              left: "50%",
              top: "50%",
              transformOrigin: "bottom center",
              color,
              transform: `translate(-50%, -100%) rotate(${
                (360 / numOfOptions) * number
              }deg)`
            }}
          >
            {number}
          </span>
        );
      })}
    </div>
  );
}
