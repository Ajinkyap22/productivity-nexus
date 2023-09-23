import React from "react";

type Props = {
  w: number;
  h: number;
  color: string;
};

const MoreIcon = ({ w, h, color }: Props) => {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 15.125L4.125 8.25001L5.0875 7.28751L11 13.2L16.9125 7.28751L17.875 8.25001L11 15.125Z"
        fill={color}
      />
    </svg>
  );
};

export default MoreIcon;
