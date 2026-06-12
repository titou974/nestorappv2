-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "enablePayment" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "sumupCheckoutId" TEXT,
ADD COLUMN     "sumupTransactionCode" TEXT;
