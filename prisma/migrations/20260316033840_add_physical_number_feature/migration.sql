-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "enablePhysicalTicket" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "photos" TEXT[],
ADD COLUMN     "physicalTicketNumber" TEXT;
