export const siteConfig = {
  metadataBase: new URL("https://nestorapp.app"),
  title: {
    default: "Nestor App",
    template: "%s | Nestor App",
  },
  description:
    "Nestor : l'assistant digital des voituriers. Scannez un QR code, obtenez votre ticket en 2 secondes. Gérez vos véhicules et voituriers efficacement.",
  openGraph: {
    title: "Nestor App",
    description: "L'application des voituriers",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nestor App",
    description: "L'application des voituriers",
    image: ["/twitter-image.png"],
  },
};
