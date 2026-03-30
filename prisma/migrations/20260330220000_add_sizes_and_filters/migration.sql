-- DropIndex
DROP INDEX "CartItem_cartId_productId_key";

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "size" INTEGER NOT NULL DEFAULT 8;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "availableSizes" INTEGER[] DEFAULT ARRAY[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]::INTEGER[];

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_productId_size_key" ON "CartItem"("cartId", "productId", "size");

