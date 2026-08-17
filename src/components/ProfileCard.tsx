import Image from "next/image";
import Link from "next/link";
import type { Profile } from "@/lib/profiles";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <Link
      href={`/list/${profile.slug}`}
      className="group relative flex aspect-[3/4] w-full overflow-hidden rounded-3xl bg-primary-tint shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {profile.photo ? (
        <Image
          src={profile.photo}
          alt={profile.name}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-tint to-primary/20 text-5xl font-bold text-primary">
          {initials(profile.name)}
        </div>
      )}

      {/* scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/0 transition-opacity duration-300 group-hover:from-black/95" />

      {/* bottom content */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 text-white transition-transform duration-300 group-hover:-translate-y-0.5">
        <h3 className="text-lg font-semibold leading-snug drop-shadow-sm">
          {profile.name}
        </h3>
        {(profile.primaryJobTitle || profile.primaryOrganization) && (
          <p className="text-sm text-white/85">
            {profile.primaryJobTitle}
            {profile.primaryJobTitle && profile.primaryOrganization ? " · " : ""}
            <span className="font-medium">{profile.primaryOrganization}</span>
          </p>
        )}
        {profile.region && (
          <p className="flex items-center gap-1 text-xs text-white/60">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3.5 w-3.5 shrink-0"
            >
              <path
                fillRule="evenodd"
                d="M10 18s6-5.686 6-10A6 6 0 0 0 4 8c0 4.314 6 10 6 10Zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              />
            </svg>
            {profile.region}
          </p>
        )}
      </div>
    </Link>
  );
}
