"use client";

import { useMemo, useState } from "react";
import type { FilterKey, Profile } from "@/lib/profiles";
import FilterBar, { EMPTY_FILTERS, type FilterState } from "@/components/FilterBar";
import ProfileCard from "@/components/ProfileCard";

const INITIAL_COUNT = 20;
const LOAD_MORE_STEP = 4;

export default function Directory({
  profiles,
  options,
}: {
  profiles: Profile[];
  options: Record<FilterKey, string[]>;
}) {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return profiles.filter((profile) => {
      for (const key of Object.keys(filters) as FilterKey[]) {
        const selected = filters[key];
        if (selected && profile[key] !== selected) return false;
      }
      if (
        query &&
        !profile.name.toLowerCase().includes(query) &&
        !profile.primaryOrganization.toLowerCase().includes(query)
      ) {
        return false;
      }
      return true;
    });
  }, [profiles, filters, search]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="flex flex-col gap-6">
      <FilterBar
        filters={filters}
        options={options}
        search={search}
        onFilterChange={(key, value) => {
          setFilters((prev) => ({ ...prev, [key]: value }));
          setVisibleCount(INITIAL_COUNT);
        }}
        onSearchChange={(value) => {
          setSearch(value);
          setVisibleCount(INITIAL_COUNT);
        }}
        onReset={() => {
          setFilters(EMPTY_FILTERS);
          setSearch("");
          setVisibleCount(INITIAL_COUNT);
        }}
        resultCount={filtered.length}
      />

      {visible.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((profile) => (
              <ProfileCard key={profile.slug} profile={profile} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
                className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
              >
                Load more
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-xl border border-dashed border-border p-12 text-center text-foreground/60">
          No profiles match your filters. Try clearing a few.
        </div>
      )}
    </div>
  );
}
