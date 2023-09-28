/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Size` table. All the data in the column will be lost.
  - You are about to drop the column `subCategoryId` on the `Size` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Size" DROP CONSTRAINT "Size_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Size" DROP CONSTRAINT "Size_subCategoryId_fkey";

-- AlterTable
ALTER TABLE "Size" DROP COLUMN "categoryId",
DROP COLUMN "subCategoryId";
