/*
  Warnings:

  - You are about to alter the column `beforeFreezeMoney` on the `team` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `money` on the `team` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "money" INTEGER NOT NULL DEFAULT 0,
    "beforeFreezeMoney" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_team" ("beforeFreezeMoney", "id", "money", "name") SELECT "beforeFreezeMoney", "id", "money", "name" FROM "team";
DROP TABLE "team";
ALTER TABLE "new_team" RENAME TO "team";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
