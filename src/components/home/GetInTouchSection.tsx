import { getPublicContactSettings } from "@/lib/get-public-contact";
import { GetInTouchClient } from "./GetInTouchClient";

export async function GetInTouchSection() {
  const contact = await getPublicContactSettings();

  return (
    <GetInTouchClient
      email={contact.email}
      phone={contact.phone}
      linkedin={contact.linkedinUrl}
      location={contact.location}
    />
  );
}
