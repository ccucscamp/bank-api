/*
  Warnings:

  - You are about to alter the column `money` on the `team` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "money" BIGINT NOT NULL DEFAULT 0,
    "beforeFreezeMoney" BIGINT NOT NULL DEFAULT 0
);
INSERT INTO "new_team" ("id", "money", "name") SELECT "id", "money", "name" FROM "team";
DROP TABLE "team";
ALTER TABLE "new_team" RENAME TO "team";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
