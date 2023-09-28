-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "subCategoryId" INTEGER,
ADD COLUMN     "subcategoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
