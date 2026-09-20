export const siteConfig = {
  name: "Safiluxe Cleaning Solutions",
  shortName: "Safiluxe",
  tagline: "Professional cleaning. Reliable people. Exceptional results.",
  description:
    "Safiluxe Cleaning Solutions provides premium residential, office and commercial cleaning across Kenya — deep cleaning, carpet, sofa, mattress, post-construction, Airbnb and more.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.safiluxe.co.ke",
  phone: process.env.NEXT_PUBLIC_PHONE || "+254 729 396 174",
  phoneHref: "+254729396174",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "254729396174",
  email: process.env.NEXT_PUBLIC_EMAIL || "hello@safiluxe.co.ke",
  hours: "Mon – Sat: 7:00am – 7:00pm · Sun: 9:00am – 4:00pm",
  address: "Nairobi, Kenya",
};

export const whatsappLink = (message: string) => {
  const num = siteConfig.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
};

export const WHATSAPP_MESSAGES = {
  general: "Hello Safiluxe Cleaning Solutions, I would like a quotation for cleaning services.",
  carpet: "Hello Safiluxe Cleaning Solutions, I would like a quotation for carpet cleaning.",
  commercial: "Hello Safiluxe Cleaning Solutions, I would like to discuss commercial cleaning services.",
  residential: "Hello Safiluxe Cleaning Solutions, I would like to book home cleaning.",
  quote: "Hello Safiluxe Cleaning Solutions, I just submitted a quote request on your website.",
};
