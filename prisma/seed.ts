import { PrismaClient, UserRole } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const users = [
  { role: UserRole.VALET, name: "John Doe", phoneNumber: "111-111-1111" },
  { role: UserRole.CLIENT, name: "Jane Smith", phoneNumber: "111-111-1112" },
  { role: UserRole.VALET, name: "Robert Johnson" },
  { role: UserRole.CLIENT, name: "Emily White", phoneNumber: "111-111-1114" },
  { role: UserRole.VALET, name: "Chris Lee", phoneNumber: "111-111-1115" },
  { role: UserRole.CLIENT, name: "Nancy Davis" },
  { role: UserRole.VALET, name: "Paul Brown" },
  { role: UserRole.CLIENT, name: "Lisa Miller", phoneNumber: "111-111-1118" },
  { role: UserRole.VALET, name: "Michael Taylor", phoneNumber: "111-111-1119" },
  { role: UserRole.CLIENT, name: "Linda Wilson", phoneNumber: "111-111-1120" },
];

const sites = [
  { name: "The Tasty Spoon", ticketPrice: "16" },
  { name: "Spicy Dreams", ticketPrice: "10" },
  { name: "Ocean Bites", ticketPrice: "17" },
  { name: "Gourmet Galaxy", ticketPrice: "12" },
  { name: "Urban Flavors", ticketPrice: "25" },
  { name: "Hearty Homestyle", ticketPrice: "34" },
  { name: "Savory Symphony", ticketPrice: "14" },
  { name: "Mystical Morsels", ticketPrice: "18" },
  { name: "Rustic Radiance", ticketPrice: "20.5" },
  { name: "Epicurean Echoes", ticketPrice: "17.4" },
];

const tickets = [
  { userId: 1, siteId: 1, scannedAt: "2023-01-01T12:00:00Z" },
  { userId: 2, siteId: 2, scannedAt: "2023-01-02T12:30:00Z" },
  { userId: 3, siteId: 3, scannedAt: "2023-01-03T13:00:00Z" },
  { userId: 4, siteId: 4, scannedAt: "2023-01-04T13:30:00Z" },
  { userId: 5, siteId: 5, scannedAt: "2023-01-05T14:00:00Z" },
  { userId: 6, siteId: 6, scannedAt: "2023-01-06T14:30:00Z" },
  { userId: 7, siteId: 7, scannedAt: "2023-01-07T15:00:00Z" },
  { userId: 8, siteId: 8, scannedAt: "2023-01-08T15:30:00Z" },
  { userId: 9, siteId: 9, scannedAt: "2023-01-09T16:00:00Z" },
  { userId: 10, siteId: 10, scannedAt: "2023-01-10T16:30:00Z" },
];

const cguCompanyOne = [
  {
    text: "Ces conditions générales d utilisation ci après CGU régissent l utilisation de l application de voiturier Nestor App, on est sur des CGU test :)",
    subtitle: "1. Préambule",
  },
  {
    text: "L Application permet aux utilisateurs de solliciter des services de voiturier et de recevoir un ticket digital confirmant le dépôt de leur véhicule.",
    subtitle: "2. Objet",
  },
  {
    text: "L utilisation de l Application implique l acceptation pleine et entière des présentes CGU.",
    subtitle: "3. Acceptation des CGU",
  },
  {
    text: "L utilisateur sollicite le service de voiturier via l Application en fournissant les détails nécessaires. Après le dépôt du véhicule, un ticket digital sera généré et transmis à l utilisateur via l Application.",
    subtitle: "4. Services de voiturier",
  },
  {
    text: "NestorAppCorp s engage à prendre le plus grand soin des véhicules qui lui sont confiés. Toutefois, en cas de dommages ou de vol non imputables à NestorAppCorp, la responsabilité de cette dernière ne saurait être engagée. La société se dégage de toute responsabilité en cas de : vol de tout objet à l intérieur du véhicule; pour les véhicules laissés à sa charge après fermeture de l établissement; pour tout dommage occasionné à un véhicule du fait de son dysfonctionnement et de son mauvais état; en cas de vol ou détérioration du véhicule par violence du fait d un tiers; et en cas de braquage du véhicule. Aucune réclamation ne sera acceptée une fois le véhicule rendu.",
    subtitle: "5. Responsabilités",
  },
  {
    text: "Les tickets digitaux sont la preuve du dépôt du véhicule. En cas de perte du ticket digital, des frais supplémentaires peuvent être appliqués pour récupérer le véhicule.",
    subtitle: "6. Tickets digitaux",
  },
  {
    text: "Les tarifs des services sont disponibles sur l Application et peuvent être modifiés à tout moment.",
    subtitle: "7. Tarification",
  },
  {
    text: "NestorAppCorp respecte les dispositions de la loi française relatives à la protection des données personnelles. Pour plus d informations, veuillez consulter notre Politique de Confidentialité.",
    subtitle: "8. Données personnelles",
  },
  {
    text: "NestorAppCorp se réserve le droit de résilier un compte utilisateur en cas de non-respect des présentes CGU.",
    subtitle: "9. Résiliation",
  },
  {
    text: "Les présentes CGU sont régies par la loi française. Tout litige relatif à leur interprétation et ou à leur exécution relève des tribunaux français.",
    subtitle: "10. Loi applicable et juridiction",
  },
];

async function main() {
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();
  await prisma.site.deleteMany();
  await prisma.session.deleteMany();
  await prisma.company.deleteMany();

  // Create companies
  const companyA = await prisma.company.create({
    data: { name: "Company A", cgu: cguCompanyOne },
  });
  const companyB = await prisma.company.create({
    data: { name: "Company B" },
  });

  // Create users and associate all valet users with a company
  const usersCreate = [];
  for (const [index, user] of users.entries()) {
    const newUser = await prisma.user.create({
      data: {
        ...user,
        companyId:
          user.role === UserRole.VALET
            ? index % 2 === 0
              ? companyA.id
              : companyB.id
            : null,
      },
    });
    usersCreate.push(newUser);
  }

  // Create sites and associate them with companies
  const sitesCreate = [];
  for (const [index, site] of sites.entries()) {
    const newSite = await prisma.site.create({
      data: {
        ...site,
        companyId: index % 2 === 0 ? companyA.id : companyB.id,
      },
    });
    sitesCreate.push(newSite);
  }
}

main()
  .catch((e) => {
    console.error("Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
