import React from "react";
import PartCard from "./PartCard";
import { get } from "http";
import { getParts } from "@/actions/part.action";
import { getPartsById } from "@/actions/part.action";
import { stackServerApp } from "@/stack";
import { SignIn } from "@stackframe/stack";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  // Extract the id from the slug by splitting on the delimiter
  const [id] = params.slug.split("--");
  const part = await getPartsById(id);
  return {
    title: part ? part.name : "Part Details",
    description: part ? part.description : "Part details page",
  };
}

async function page({ params }: { params: { slug: string } }) {
  const user = await stackServerApp.getUser();
  const [id] = params.slug.split("--");
  const part = await getPartsById(id);

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

export default page;
