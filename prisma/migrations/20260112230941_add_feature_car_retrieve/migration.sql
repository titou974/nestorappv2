-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "enableClientReviewModal" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "enableValetResponsibilityModal" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "requestedPickupTime" TIMESTAMP(3),
ADD COLUMN     "retrievedAt" TIMESTAMP(3);
