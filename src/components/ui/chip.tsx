import React from "react";

const Chip = ({ text }: { text: string }) => {
  return (
    <div className="border p-2 w-full rounded-xl shadow flex justify-center items-center">
      {text}
    </div>
  );
};

export default Chip;
