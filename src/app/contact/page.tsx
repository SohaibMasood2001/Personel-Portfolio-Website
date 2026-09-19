import { getPublicContactSettings } from "@/lib/get-public-contact";
import { ContactPageClient } from "./ContactPageClient";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const contact = await getPublicContactSettings();
  return (
    <ContactPageClient
      contact={{
        email: contact.email,
        phone: contact.phone,
        linkedinUrl: contact.linkedinUrl,
        location: contact.location,
        companyName: contact.companyName,
        xUrl: contact.xUrl,
      }}
    />
  );
}
