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
    "slug" TEXT,
    "image" TEXT NOT NULL
);
INSERT INTO "new_Cart" ("id", "image", "ip_address", "name", "price", "product_id", "quantity", "slug", "user_id") SELECT "id", "image", "ip_address", "name", "price", "product_id", "quantity", "slug", "user_id" FROM "Cart";
DROP TABLE "Cart";
ALTER TABLE "new_Cart" RENAME TO "Cart";
CREATE UNIQUE INDEX "Cart_user_id_product_id_key" ON "Cart"("user_id", "product_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
