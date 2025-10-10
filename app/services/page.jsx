import { PageNav } from "@/components/PageNav";
import { Services } from "@/app/services/_components/Services";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <PageNav />
      <Services />
    </div>
  );
};

export default page;
