import React from "react";

type Props = {
  w: number;
  h: number;
  color: string;
};

const FavoritesIcon = ({ w, h, color }: Props) => {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.75 17.4167L6.875 11L2.75 4.58334H13.75C14.0556 4.58334 14.3422 4.65209 14.6098 4.78959C14.8775 4.92709 15.0951 5.11807 15.2625 5.36251L19.25 11L15.2625 16.6375C15.0944 16.882 14.8766 17.0729 14.6089 17.2104C14.3413 17.3479 14.0549 17.4167 13.75 17.4167H2.75Z"
        fill={color}
      />
    </svg>
  );
};

export default FavoritesIcon;
