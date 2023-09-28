-- AlterTable
ALTER TABLE "Size" ADD COLUMN     "categoryId" INTEGER,
ADD COLUMN     "subCategoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "Size" ADD CONSTRAINT "Size_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Size" ADD CONSTRAINT "Size_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
