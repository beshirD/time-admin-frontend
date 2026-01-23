import React from "react";

interface IconProps {
  className?: string;
}

export const EyeCloseIcon: React.FC<IconProps> = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.1083 7.89167L7.89168 12.1083C7.21668 11.4333 6.80835 10.5 6.80835 9.45833C6.80835 7.39167 8.48335 5.71667 10.55 5.71667C11.5917 5.71667 12.525 6.125 13.2 6.8M15.2167 4.78333C13.8083 3.71667 12.2083 3.125 10.55 3.125C6.82501 3.125 3.52501 5.35833 1.83334 8.75C2.70834 10.4917 4.00001 11.9417 5.55834 12.975L15.2167 4.78333ZM10.55 14.375C14.275 14.375 17.575 12.1417 19.2667 8.75C18.6417 7.43333 17.7667 6.275 16.7083 5.33333L10.55 14.375Z"
      />
      <path
        d="M1.66666 1.66667L18.3333 18.3333"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
