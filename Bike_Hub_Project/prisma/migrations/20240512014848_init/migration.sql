/*
  Warnings:

  - You are about to alter the column `price` on the `Cart` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - Added the required column `slug` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Made the column `image` on table `Cart` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ip_address` on table `Cart` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Cart` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Cart` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER,
    "product_id" INTEGER NOT NULL,
    "ip_address" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "slug" TEXT NOT NULL,
    "image" TEXT NOT NULL
);
INSERT INTO "new_Cart" ("id", "image", "ip_address", "name", "price", "product_id", "quantity", "user_id") SELECT "id", "image", "ip_address", "name", "price", "product_id", "quantity", "user_id" FROM "Cart";
DROP TABLE "Cart";
ALTER TABLE "new_Cart" RENAME TO "Cart";
CREATE UNIQUE INDEX "Cart_user_id_product_id_key" ON "Cart"("user_id", "product_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
