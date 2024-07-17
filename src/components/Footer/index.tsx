"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="relative z-10 bg-white dark:bg-gray-dark">
        <div className="container">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>
          <div className="py-8">
            <p className="text-center text-base text-body-color dark:text-white">
              ✨ Developed by $martDev (Aleksandr) ✨
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
