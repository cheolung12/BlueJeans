import React from "react";
import { FcHome } from "react-icons/fc";

export default function AddressButton({ setUserAddress }) {
  const handleClick = () => {
    setUserAddress("서울특별시 마포구 숭문길 24");
  };

  return (
    <>
      <button onClick={handleClick}>
        <FcHome />
      </button>
    </>
  );
}
