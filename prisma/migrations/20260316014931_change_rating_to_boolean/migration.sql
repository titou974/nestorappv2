-- AlterTable: convert rating from Int to Boolean (>= 3 = true, < 3 = false)
ALTER TABLE "review" ADD COLUMN "rating_new" BOOLEAN;
UPDATE "review" SET "rating_new" = ("rating" >= 3);
ALTER TABLE "review" DROP COLUMN "rating";
ALTER TABLE "review" RENAME COLUMN "rating_new" TO "rating";
ALTER TABLE "review" ALTER COLUMN "rating" SET NOT NULL;
