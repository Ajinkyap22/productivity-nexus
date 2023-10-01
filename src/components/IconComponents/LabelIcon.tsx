import React from "react";

type Props = {
  w: number;
  h: number;
  color: string;
};

const LabelIcon = ({ w, h, color }: Props) => {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 25 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.3646 5.35333C17.9896 4.88583 17.3646 4.58333 16.6667 4.58333L5.20833 4.5925C4.0625 4.5925 3.125 5.40833 3.125 6.41667V15.5833C3.125 16.5917 4.0625 17.4075 5.20833 17.4075L16.6667 17.4167C17.3646 17.4167 17.9896 17.1142 18.3646 16.6467L22.9167 11L18.3646 5.35333Z"
        fill={color}
        fillOpacity="0.35"
      />
    </svg>
  );
};

export default LabelIcon;
