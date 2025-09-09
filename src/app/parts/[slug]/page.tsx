import React from "react";
import PartCard from "./PartCard";
import { get } from "http";
import { getParts } from "@/actions/part.action";
import { getPartsById } from "@/actions/part.action";
import { stackServerApp } from "@/stack";
import { SignIn } from "@stackframe/stack";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  // Your slug is like "cmfbjt6zy0000xpfoo4kjnein-ae86-engine"
  // The part ID is before the first dash
  const [id] = params.slug.split("-");
  const part = await getPartsById(id);

  // Get the current user from the stackServerApp (adjust as needed for your auth setup)
  const user = await stackServerApp.getUser?.();

  if (!user) {
    return <SignIn />;
  }

  return (
    <div className='mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6'>
      <div className='lg:col-span-full'>
        <PartCard part={part} />
      </div>
    </div>
  );
}
