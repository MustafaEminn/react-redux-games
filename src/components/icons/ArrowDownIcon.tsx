import * as React from "react";

function ArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={18}
      height={10}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M.515 1.465L9 9.95l8.485-8.485L16.071.05 9 7.122 1.929.05.515 1.465z"
        fill={props.fill || "#000000"}
      />
    </svg>
  );
}

export default ArrowDownIcon;
