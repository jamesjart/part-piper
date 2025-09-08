import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import React from "react";

const Hero04 = () => {
  return (
    <div className='min-h-screen flex items-center justify-center overflow-hidden'>
      <div className='max-w-screen-xl w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12 lg:py-0'>
        <div className='my-auto'>
          <Badge className='bg-gradient-to-br via-85% from-primary via-muted/30 to-primary rounded-full py-1 border-none'>
            More features coming soon!
          </Badge>
          <h1 className='mt-6 max-w-[17ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2] tracking-tight'>
            Part Piper
          </h1>
          <p className='mt-6 max-w-[60ch] text-lg'>
            Your ultimate car parts inventory management solution. Simple
            Next.js CRUD application with authentication, image uploads, and
            dark mode.
          </p>
          <div className='mt-12 flex items-center gap-4'>
            <Button size='lg' className='rounded-full text-base'>
              Get Started <ArrowUpRight className='!h-5 !w-5' />
            </Button>
            <Button
              variant='outline'
              size='lg'
              className='rounded-full text-base shadow-none'
            >
              <CirclePlay className='!h-5 !w-5' /> Watch Demo
            </Button>
          </div>
        </div>
        <img
          className='h-96 w-full object-cover object-center shadow-xl shadow-blue-gray-900/50 bg-accent rounded-xl'
          src='https://images.unsplash.com/photo-1727376609759-fd61ab47fe7e?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='nature image'
        />
      </div>
    </div>
  );
};

export default Hero04;
