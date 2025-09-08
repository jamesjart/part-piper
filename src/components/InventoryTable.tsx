"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";

import { Input } from "@/components/ui/input";
import { Edit, Search } from "lucide-react";
import { useState } from "react";
import { Combobox } from "./ui/combo-box";
import { getParts } from "@/actions/part.action";
import { useRouter } from "next/navigation";
import CreateDialog from "./CreateDialog";
import EditDialog from "./EditDialog";

type Parts = Awaited<ReturnType<typeof getParts>>;

interface InventoryTableProps {
  parts: Parts;
}

export default function InventoryTable({ parts }: InventoryTableProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  //Filter parts based on search term and selected category
  const filteredParts = parts?.userParts?.filter(
    (part: { name: string; category: string }) =>
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory == "" || part.category === selectedCategory)
  );

  if (!parts) {
    return (
      <div className='w-full space-y-4'>
        <div className='flex items-center gap-2 py-4'>
          <Skeleton className='h-10 w-full max-w-sm' />
          <Skeleton className='h-10 w-32' />
          <Skeleton className='h-10 w-32' />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className='w-full h-4' />
              </TableHead>
              <TableHead>
                <Skeleton className='w-full h-4' />
              </TableHead>
              <TableHead>
                <Skeleton className='w-full h-4' />
              </TableHead>
              <TableHead>
                <Skeleton className='w-full h-4' />
              </TableHead>
              <TableHead>
                <Skeleton className='w-full h-4' />
              </TableHead>
              <TableHead className='text-right'>
                <Skeleton className='w-full h-4' />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className='w-full h-4' />
                </TableCell>
                <TableCell>
                  <Skeleton className='w-full h-4' />
                </TableCell>
                <TableCell>
                  <Skeleton className='w-full h-4' />
                </TableCell>
                <TableCell>
                  <Skeleton className='w-full h-4' />
                </TableCell>
                <TableCell>
                  <Skeleton className='w-full h-4' />
                </TableCell>
                <TableCell className='text-right'>
                  <Skeleton className='w-full h-4' />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div className='flex items-center gap-2 py-4'>
        <div className='relative max-w--sm w-full'>
          <Input
            placeholder='Search parts...'
            className='p1-10 border rounded-md w-full px-10'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className='absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2' />
        </div>
        <Combobox
          value={selectedCategory}
          onChange={(val) => setSelectedCategory(val)}
        />
        <CreateDialog />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Part ID</TableHead>
            <TableHead>Part Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price (USD)</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Make</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredParts?.map((part) => {
            const slugifiedName = part.name.toLowerCase().replace(/\s+/g, "-");
            const slug = `${part.id}-${slugifiedName}`;
            const partUrl = `/parts/${slug}`;

            return (
              <TableRow key={part.id} onClick={() => router.push(partUrl)}>
                <TableCell>{part.id}</TableCell>
                <TableCell>{part.name}</TableCell>
                <TableCell>{part.category}</TableCell>
                <TableCell>{part.price}</TableCell>
                <TableCell>{part.year}</TableCell>
                <TableCell>{part.make}</TableCell>
                <TableCell>{part.model}</TableCell>
                <TableCell>{part.type}</TableCell>
                <TableCell>{part.stock}</TableCell>
                <TableCell className='text-right'>
                  <div
                    className='flex justify-end space-x-4'
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EditDialog part={part} />
                    <h1>Delete Button</h1>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Pagination className='mt-4'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href='#' />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#'>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#' isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#'>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href='#' />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
