"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

export async function getParts(searchTerm?: String) {
  try {
    const currentUserId = await getUserId();

    const whereClause: any = {
      userId: currentUserId,
    };

    if (searchTerm) {
      whereClause.name = {
        contains: searchTerm,
        mode: "insensitive",
      };
    }

    const userParts = await prisma.parts.findMany({
      where: whereClause,
    });

    revalidatePath("/");
    return { success: true, userParts };
  } catch (error) {
    console.log("Error in getparts", error);
  }
}

export async function getPartsById(id: string) {
  // Example using Prisma; adjust based on your data layer
  return await prisma.parts.findUnique({
    where: { id },
  });
}

export async function createPart(data: Prisma.PartsCreateInput) {
  console.log("creating part with data:");
  console.log(data);
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;

    const newPart = await prisma.parts.create({
      data: {
        ...data,
        userId: currentUserId,
      },
    });
    revalidatePath("/parts");
    return newPart;
  } catch (error) {
    console.error("Error adding part:", error);
    throw error;
  }
}

export async function editPart(
  id: string, //identify which parts we are editing
  data: Prisma.PartsUpdateInput
) {
  try {
    const currentUserId = await getUserId();
    const updatedPart = await prisma.parts.update({
      where: { id },
      data: {
        ...data,
        userId: currentUserId,
      },
    });
    revalidatePath("/parts");
  } catch (error) {
    console.error("Error updating part:", error);
    throw error;
  }
}

export async function deletePart(
  id: string //identify which parts we are editing
) {
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;

    const deletedPart = await prisma.parts.delete({
      where: { id },
    });
    revalidatePath("/parts");
    return deletedPart; // Return the deleted part for potiential recycle bin use
  } catch (error) {
    console.error("Error deleting part:", error);
    throw error;
  }
}
