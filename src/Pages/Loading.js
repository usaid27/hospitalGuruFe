import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={require("../Assets/Hos Loading.gif")} alt="loadingImg" />
    </div>
  );
};

export default Loading;
