import React from 'react'
import Lottie from "react-lottie";
import centerImage from "../../src/youbike.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: centerImage,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
export default function Loading() {
  return (
    <>
      <Lottie
        style={{ marginTop: "100px" }}
        options={defaultOptions}
        height={40}
        width={71}
      />
    </>
  )
}
