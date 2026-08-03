import rawProfiles from "@/data/profiles.json";

export type Profile = {
  slug: string;
  url: string;
  name: string;
  photo: string;
  titleAtOrg: string;
  primaryJobTitle: string;
  primaryOrganization: string;
  established: string;
  industry: string;
  region: string;
  nationality: string;
  bio: string;
  social: Record<string, string>;
  lastmod: string;
};

function dedupeByName(list: Profile[]): Profile[] {
  const latestByName = new Map<string, Profile>();
  for (const profile of list) {
    const existing = latestByName.get(profile.name);
    if (!existing || new Date(profile.lastmod) > new Date(existing.lastmod)) {
      latestByName.set(profile.name, profile);
    }
  }
  return Array.from(latestByName.values());
}

export const profiles = dedupeByName(rawProfiles as Profile[]).sort(
  (a, b) => new Date(b.lastmod).getTime() - new Date(a.lastmod).getTime()
);

export type FilterKey =
  | "nationality"
  | "region"
  | "industry"
  | "established"
  | "primaryOrganization";

export const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "nationality", label: "Nationality" },
  { key: "region", label: "Region" },
  { key: "industry", label: "Industry" },
  { key: "established", label: "Established" },
  { key: "primaryOrganization", label: "Primary Organization" },
];

export function getFilterOptions(key: FilterKey): string[] {
  const values = new Set<string>();
  for (const profile of profiles) {
    const value = profile[key];
    if (value) values.add(value);
  }
  return Array.from(values).sort((a, b) =>
    key === "established" ? Number(b) - Number(a) : a.localeCompare(b)
  );
}

export function getProfileBySlug(slug: string): Profile | undefined {
  return profiles.find((profile) => profile.slug === slug);
}
