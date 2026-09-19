export type PublicContactSettings = {
  email: string;
  phone: string;
  githubUrl: string;
  linkedinUrl: string;
  xUrl: string;
  location: string;
  companyName: string;
};

export const DEFAULT_CONTACT: PublicContactSettings = {
  email: "sohaibmasood2001@gmail.com",
  phone: "(+92) 342 5156705",
  githubUrl: "https://github.com/sohaibmasood",
  linkedinUrl: "https://www.linkedin.com/in/sohaib-masood-ab3315279/",
  xUrl: "",
  location: "Islamabad, Pakistan",
  companyName: "Sohaib Masood",
};

export function resolvePublicContact(
  settings: Record<string, string>
): PublicContactSettings {
  return {
    email: settings.email?.trim() || DEFAULT_CONTACT.email,
    phone: settings.phone?.trim() || DEFAULT_CONTACT.phone,
    githubUrl: settings.github_url?.trim() || DEFAULT_CONTACT.githubUrl,
    linkedinUrl: settings.linkedin_url?.trim() || DEFAULT_CONTACT.linkedinUrl,
    xUrl: settings.x_url?.trim() || DEFAULT_CONTACT.xUrl,
    location: settings.location?.trim() || DEFAULT_CONTACT.location,
    companyName:
      settings.company_name?.trim() ||
      settings.hero_title?.trim() ||
      DEFAULT_CONTACT.companyName,
  };
}
