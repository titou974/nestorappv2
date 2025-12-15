-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "siret" TEXT;
ALTER SEQUENCE "Ticket_ticketNumber_seq" RESTART WITH 2000;
