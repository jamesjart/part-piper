import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Car, Sprout } from "lucide-react";
import { Combobox } from "./ui/combo-box";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { createPart } from "@/actions/part.action";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CreateDialog() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: 1,
    year: 2025,
    make: "",
    model: "",
    type: "",
    stock: 1,
    location: "",
    userId: "",
    imageUrl: "",
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newPart = await createPart(formData);
      console.log("part created: ", newPart);
      toast.success("Part added successfully");
    } catch (error) {
      console.error("error adding part", error);
      toast.error("Failed to add part");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='default'
          className='ml-auto font-bold flex items-center gap-2'
          asChild
        >
          <span>
            <Car className='w-4 h-4' />
            Add Part
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add a Part</AlertDialogTitle>
          <AlertDialogDescription>
            Fill out the form below to add a new part to your inventory.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <ScrollArea className='h-[300px] w-full rounded-md border p-4'>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='name'>Name</Label>
                <Input
                  id='name'
                  type='text'
                  placeholder='Enter name'
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor='category'>Category</Label>
                <Combobox
                  value={formData.category}
                  onChange={(val) => handleChange("category", val)}
                />
              </div>
            </div>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              placeholder='Type your message here.'
              rows={5}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='stock'>Stock</Label>
                <Input
                  id='stock'
                  type='number'
                  placeholder='Enter stock quantity'
                  value={formData.stock}
                  onChange={(e) =>
                    handleChange("stock", Number(e.target.value))
                  }
                />
              </div>
              <div>
                <Label htmlFor='price'>Price</Label>
                <Input
                  id='price'
                  type='number'
                  placeholder='Enter price'
                  value={formData.price}
                  onChange={(e) =>
                    handleChange("price", Number(e.target.value))
                  }
                />
              </div>
              <div>
                <Label htmlFor='year'>Year</Label>
                <Input
                  id='year'
                  type='number'
                  placeholder='Enter year'
                  value={formData.year}
                  onChange={(e) => handleChange("year", Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor='make'>Make</Label>
                <Input
                  id='make'
                  type='text'
                  placeholder='Enter make'
                  value={formData.make}
                  onChange={(e) => handleChange("make", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor='model'>Model</Label>
                <Input
                  id='model'
                  type='text'
                  placeholder='Enter model'
                  value={formData.model}
                  onChange={(e) => handleChange("model", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor='type'>Type</Label>
                <Input
                  id='type'
                  type='text'
                  placeholder='Enter type'
                  value={formData.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor='location'>Location</Label>
                <Input
                  id='location'
                  type='text'
                  placeholder='Enter location'
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
              </div>
            </div>

            {/*Image Upload*/}
            <div className='py-5'>
              <ImageUpload
                endpoint='postImage'
                value={formData.imageUrl}
                onChange={(url) => {
                  handleChange("imageUrl", url);
                }}
              />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction type='submit'>Submit</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
}
