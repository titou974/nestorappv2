-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "enableSmsRetrieval" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "pickupReady" BOOLEAN NOT NULL DEFAULT false;
