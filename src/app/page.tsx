import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import Expression from "@/components/Expression";
import Video from "@/components/Video";
import Sheets from "@/components/Sheets";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SimplestMath",
  description: "This is Home for SimplestMath",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Video />
      <Expression />
      <Sheets />
    </>
  );
}
