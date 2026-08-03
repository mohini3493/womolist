import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProfileBySlug, profiles } from "@/lib/profiles";
import SocialIcon from "@/components/SocialIcon";

export function generateStaticParams() {
  return profiles.map((profile) => ({ slug: profile.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profile = getProfileBySlug(slug);
  if (!profile) return {};
  return {
    title: `${profile.name} — Womopreneur Directory`,
    description: profile.bio.slice(0, 160),
  };
}

type StringField =
  | "primaryOrganization"
  | "established"
  | "industry"
  | "region"
  | "nationality";

const FIELDS: { key: StringField; label: string }[] = [
  { key: "primaryOrganization", label: "Primary Organization" },
  { key: "established", label: "Established" },
  { key: "industry", label: "Industry" },
  { key: "region", label: "Region" },
  { key: "nationality", label: "Nationality" },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = getProfileBySlug(slug);
  if (!profile) notFound();

  const bioParagraphs = profile.bio.split("\n\n").filter(Boolean);
  const socialEntries = Object.entries(profile.social);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        ← Back to directory
      </Link>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-xl bg-primary-tint">
          {profile.photo ? (
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              sizes="160px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-primary">
              {initials(profile.name)}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {profile.name}
          </h1>
          {profile.titleAtOrg && (
            <p className="text-lg text-foreground/70">{profile.titleAtOrg}</p>
          )}
          {socialEntries.length > 0 && (
            <div className="mt-2 flex gap-3">
              {socialEntries.map(([platform, href]) => (
                <a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-tint text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  <SocialIcon platform={platform} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {FIELDS.map(
          ({ key, label }) =>
            profile[key] && (
              <div
                key={key}
                className="rounded-lg border border-border bg-surface p-3"
              >
                <p className="text-xs font-medium text-foreground/50">{label}</p>
                <p className="mt-0.5 text-sm font-medium text-foreground">
                  {profile[key]}
                </p>
              </div>
            )
        )}
      </div>

      {bioParagraphs.length > 0 && (
        <div className="mt-8 flex flex-col gap-4 text-foreground/80">
          {bioParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
    </main>
  );
}
