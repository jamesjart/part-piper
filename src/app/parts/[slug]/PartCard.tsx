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
          <CardContent className='mt-8 space-y-3'>
            <CardTitle className='text-5xl font-bold'>{part.name}</CardTitle>
            <CardTitle className='text-3xl font-bold'>${part.price}</CardTitle>
            <Badge>{part.category}</Badge>
            <CardDescription>Stock: {part.stock}</CardDescription>
            <CardDescription className='text-white'>
              {part.description}
            </CardDescription>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
