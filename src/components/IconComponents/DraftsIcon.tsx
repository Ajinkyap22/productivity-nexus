import React from "react";

type Props = {
  w: number;
  h: number;
  color: string;
};
const DraftsIcon = ({ w, h, color }: Props) => {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.9842 6.45334C19.3417 6.09584 19.3417 5.5 18.9842 5.16084L16.8392 3.01584C16.5 2.65834 15.9042 2.65834 15.5467 3.01584L13.86 4.69334L17.2975 8.13084M2.75 15.8125V19.25H6.1875L16.3258 9.1025L12.8883 5.665L2.75 15.8125Z"
        fill={color}
      />
    </svg>
  );
};

export default DraftsIcon;
