-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT,
    "ip_address" TEXT,
    "price" INTEGER,
    "image" TEXT
);
INSERT INTO "new_Cart" ("id", "image", "ip_address", "name", "price", "product_id", "quantity", "user_id") SELECT "id", "image", "ip_address", "name", "price", "product_id", "quantity", "user_id" FROM "Cart";
DROP TABLE "Cart";
ALTER TABLE "new_Cart" RENAME TO "Cart";
CREATE UNIQUE INDEX "Cart_user_id_product_id_key" ON "Cart"("user_id", "product_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
