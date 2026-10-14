import { HeartIcon } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full flex  justify-center gap-10 items-center p-2">
      <p className="text-lg flex items-center gap-1">
        Built with <HeartIcon size={14} className="text-red-500 fill-red-500" />{" "}
        by{" "}
        <a
          href="https://github.com/Afolabiyinka"
          className="underline underline-offset-4 font-bold"
          target="_blank"
        >
          Olayinka
        </a>
      </p>{" "}
    </div>
  );
};

export default Footer;
