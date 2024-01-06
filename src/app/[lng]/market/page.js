"use client";
import { ProtectedScreen } from "@/layouts";
import { MarketScreen } from "@/screens";

const Page = () => {
  return (
    <ProtectedScreen>
      <MarketScreen />
    </ProtectedScreen>
  );
};

export default Page;
