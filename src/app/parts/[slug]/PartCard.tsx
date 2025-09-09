import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "../../../components/ui/badge";
import { getPartsById } from "@/actions/part.action";

type Part = Awaited<ReturnType<typeof getPartsById>>;

interface PartCardProps {
  part: Part;
}

export default function partCard({ part }: PartCardProps) {
  if (!part) {
    return <div>Part data is not available.</div>;
  }

  return (
    <Card className='max-w'>
      <div className='flex flex-row'>
        <div className='basis-2/4'>
          <CardHeader>
            {part.imageUrl && (
              <div className='rounded-lg overflow-hidden'>
                <img
                  src={part.imageUrl}
                  alt='Post content'
                  className='w-full h-auto object-cover'
                />
              </div>
            )}
          </CardHeader>
        </div>
        <div className='basis-2/4 flex flex-col justify-between'>
          <CardContent className='mt-8 space-y-6'>
            <div className='flex flex-col gap-2 mb-4'>
              <CardTitle className='text-5xl font-bold leading-tight'>
                {part.name}
              </CardTitle>
              <div className='flex items-center gap-4'>
                <span className='text-3xl font-bold text-green-600 dark:text-green-400'>
                  ${part.price}
                </span>
                <Badge className='text-base px-3 py-1'>{part.category}</Badge>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-4'>
              <CardDescription>
                <span className='font-semibold'>Stock:</span> {part.stock}
              </CardDescription>
              <CardDescription>
                <span className='font-semibold'>Year:</span> {part.year}
              </CardDescription>
              <CardDescription>
                <span className='font-semibold'>Make:</span> {part.make}
              </CardDescription>
              <CardDescription>
                <span className='font-semibold'>Model:</span> {part.model}
              </CardDescription>
              <CardDescription>
                <span className='font-semibold'>Type:</span> {part.type}
              </CardDescription>
              <CardDescription>
                <span className='font-semibold'>Location:</span> {part.location}
              </CardDescription>
            </div>
            <hr className='my-2 border-gray-300 dark:border-gray-700' />
            <CardDescription className='mt-2 text-base text-gray-700 dark:text-gray-200'>
              {part.description}
            </CardDescription>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
