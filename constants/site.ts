export const siteConfig = {
  metadataBase: new URL("https://nestorapp.app"),
  title: {
    default: "Nestor App",
    template: "%s | Nestor App",
  },
  description: "L'assistant pour les voituriers",
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
