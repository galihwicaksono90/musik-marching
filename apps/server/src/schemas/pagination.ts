import { type Prisma, db } from "@repo/db"
import { z } from "zod"

// Define a union type of all model names available in Prisma
export type ModelNames =
  (typeof Prisma.ModelName)[keyof typeof Prisma.ModelName];

// Define a type for Prisma operations specific to a given model
export type PrismaOperations<ModelName extends ModelNames> =
  Prisma.TypeMap['model'][ModelName]['operations'];

// Define a type for Prisma findMany arguments specific to a given model
export type PrismaFindManyArgs<ModelName extends ModelNames> =
  PrismaOperations<ModelName>['findMany']['args'];

// Define a type for pagination options, including model name, query filters, and pagination parameters
export type PaginationOptions<ModelName extends ModelNames> = {
  where?: PrismaFindManyArgs<ModelName>['where']; // Filtering conditions for the query
  orderBy?: PrismaFindManyArgs<ModelName>['orderBy']; // Sorting criteria for the query
  include?: PrismaFindManyArgs<ModelName>['include']; // Related models to include in the query
  includePageCount?: boolean;
  limit?: number;
  page?: number; // Page number for pagination
  pageSize?: string; // Number of items per page for pagination
};

export const paginationMetaSchema = z.object({
  limit: z.number().default(10),
  includePageCount: z.boolean().default(true),
  page: z.number().default(1),
})
