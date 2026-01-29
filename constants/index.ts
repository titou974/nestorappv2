export const cguContent = [
  {
    text: "Ces conditions générales d utilisation ci après CGU régissent l utilisation de l application de voiturier Nestor App ci après l Application proposée par NestorAppCorp société auto entrepreneur immatriculée sous le numéro Numéro SIRET dont le siège social est situé à 98 rue montmartre 75002 Paris.",
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

export const PICKUP_TIME_OPTIONS = [
  { id: "now", value: "Dès que possible", minutes: 0 },
  { id: "5", value: "5 minutes", minutes: 5 },
  { id: "10", value: "10 minutes", minutes: 10 },
  { id: "15", value: "15 minutes", minutes: 15 },
  { id: "20", value: "20 minutes", minutes: 20 },
  { id: "25", value: "25 minutes", minutes: 25 },
  { id: "30", value: "30 minutes", minutes: 30 },
  { id: "45", value: "45 minutes", minutes: 45 },
  { id: "60", value: "1 heure", minutes: 60 },
  { id: "90", value: "1h30", minutes: 90 },
] as const;

export const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: "#ffffff",
};

export const resetText = {
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

export const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "660px",
  maxWidth: "100%",
};

export const tableCell = { display: "table-cell" };

export const heading = {
  fontSize: "32px",
  fontWeight: "300",
  color: "#888888",
};

export const cupomText = {
  margin: "36px 0 40px 0",
  fontSize: "14px",
  fontWeight: "500",
  color: "#111111",
};

export const supStyle = {
  fontWeight: "600",
  color: "#000",
};

export const informationTable = {
  borderCollapse: "collapse",
  borderSpacing: "0px",
  width: "100%",
  color: "rgb(51,51,51)",
  backgroundColor: "rgb(250,250,250)",
  borderRadius: "3px",
  fontSize: "12px",
};

export const informationTableRow = {
  height: "46px",
};

export const informationTableColumn = {
  paddingLeft: "20px",
  borderStyle: "solid",
  borderColor: "white",
  borderWidth: "0px 1px 1px 0px",
  height: "44px",
};

export const informationTableLabel = {
  ...resetText,
  color: "rgb(102,102,102)",
  fontSize: "10px",
};

export const informationTableValue = {
  fontSize: "12px",
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

export const productTitleTable = {
  ...informationTable,
  margin: "30px 0 15px 0",
  height: "24px",
};

export const productsTitle = {
  background: "#fafafa",
  paddingLeft: "10px",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

export const productIcon = {
  margin: "0 0 0 20px",
  borderRadius: "14px",
  border: "1px solid rgba(128,128,128,0.2)",
};

export const productTitle = {
  fontSize: "12px",
  fontWeight: "600",
  ...resetText,
};

export const productDescription = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  ...resetText,
};

export const productLink = {
  fontSize: "12px",
  color: "rgb(0,112,201)",
  textDecoration: "none",
};

export const divisor = {
  marginLeft: "4px",
  marginRight: "4px",
  color: "rgb(51,51,51)",
  fontWeight: 200,
};

export const productPriceTotal = {
  margin: "0",
  color: "rgb(102,102,102)",
  fontSize: "10px",
  fontWeight: "600",
  padding: "0px 30px 0px 0px",
  textAlign: "right",
};

export const productPrice = {
  fontSize: "12px",
  fontWeight: "600",
  margin: "0",
};

export const productPriceLarge = {
  margin: "0px 20px 0px 0px",
  fontSize: "16px",
  fontWeight: "600",
  whiteSpace: "nowrap",
  textAlign: "right",
};

export const productPriceWrapper = {
  display: "table-cell",
  padding: "0px 20px 0px 0px",
  width: "100px",
  verticalAlign: "top",
};

export const productPriceLine = { margin: "30px 0 0 0" };

export const productPriceVerticalLine = {
  height: "48px",
  borderLeft: "1px solid",
  borderColor: "rgb(238,238,238)",
};

export const productPriceLargeWrapper = {
  display: "table-cell",
  width: "90px",
};

export const productPriceLineBottom = { margin: "0 0 75px 0" };

export const block = { display: "block" };

export const ctaTitle = {
  display: "block",
  margin: "15px 0 0 0",
};

export const ctaText = { fontSize: "24px", fontWeight: "500" };

export const walletWrapper = { display: "table-cell", margin: "10px 0 0 0" };

export const walletLink = { color: "rgb(0,126,255)", textDecoration: "none" };

export const walletImage = {
  display: "inherit",
  paddingRight: "8px",
  verticalAlign: "middle",
};

export const walletBottomLine = { margin: "65px 0 20px 0" };

export const topFooterText = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  margin: "0",
  lineHeight: "auto",
  marginTop: "20px",
  marginBottom: "4px",
};

export const footerText = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  margin: "0",
  lineHeight: "auto",
  marginBottom: "4px",
};

export const footerTextCenter = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  margin: "20px 0",
  lineHeight: "auto",
  textAlign: "center",
};

export const footerLink = { color: "rgb(0,115,255)" };

export const footerIcon = { display: "block", margin: "40px 0 0 0" };

export const footerLinksWrapper = {
  margin: "8px 0 0 0",
  textAlign: "center",
  fontSize: "12px",
  color: "rgb(102,102,102)",
};

export const footerCopyright = {
  margin: "25px 0 0 0",
  textAlign: "center",
  fontSize: "12px",
  color: "rgb(102,102,102)",
};

export const walletLinkText = {
  fontSize: "14px",
  fontWeight: "400",
  textDecoration: "none",
};
