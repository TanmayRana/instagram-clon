import React from "react";

interface TextEllipseProps {
  username: string;
  maxLength?: number;
}

const TextEllipse: React.FC<TextEllipseProps> = ({
  username,
  maxLength = 8,
}) => {
  const usernameEllipseStory =
    username.length > maxLength
      ? `${username.slice(0, maxLength)}...`
      : username;

  return (
    <p className="text-white text-sm mt-1 truncate">{usernameEllipseStory}</p>
  );
};

export default TextEllipse;
