import Image, { StaticImageData } from "next/image";
import React from "react";

interface TabProps {
  label: string;
  icon?: StaticImageData | string;
  isActive: boolean;
  onclick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, icon, isActive, onclick }) => {
  return (
    <button
      className={`${
        isActive ? "text-white border-t-2 border-t-white" : "text-gray-600"
      } flex items-center gap-x-1.5 -mt-[1.5px] px-4 py-2 focus:outline-none transition-opacity duration-300 ease-out ${
        isActive ? "opacity-100" : "opacity-75"
      }`}
      onClick={onclick}
    >
      {icon && (
        <Image
          src={icon}
          alt={`${label} icon`}
          className={`w-[11px] h-[11px] ${
            isActive ? "brightness-150" : "brightness-50"
          }`}
        />
      )}
      {label}
    </button>
  );
};

export default Tab;
