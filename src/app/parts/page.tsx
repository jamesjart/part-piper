//import { getParts } from "@/actions/part.aciton";
import { getParts } from "@/actions/part.action";
import InventoryTable from "@/components/InventoryTable";
import { stackServerApp } from "@/stack";
import { SignUp } from "@stackframe/stack";
import React from "react";

async function page() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
  const parts = await getParts();

  return (
    <>
      {user ? (
        <div className='mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6'>
          <div className='lg:col-span-full'>
            <InventoryTable parts={parts} />
          </div>
        </div>
      ) : (
        <div className='flex justify-center mt-20 items-center'>
          <SignUp />
        </div>
      )}
    </>
  );
}

export default page;
