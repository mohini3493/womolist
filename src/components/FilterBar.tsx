"use client";

import { FILTERS, type FilterKey } from "@/lib/profiles";

export type FilterState = Record<FilterKey, string>;

export const EMPTY_FILTERS: FilterState = {
  nationality: "",
  region: "",
  industry: "",
  established: "",
  primaryOrganization: "",
};

export default function FilterBar({
  filters,
  options,
  search,
  onFilterChange,
  onSearchChange,
  onReset,
  resultCount,
}: {
  filters: FilterState;
  options: Record<FilterKey, string[]>;
  search: string;
  onFilterChange: (key: FilterKey, value: string) => void;
  onSearchChange: (value: string) => void;
  onReset: () => void;
  resultCount: number;
}) {
  const hasActiveFilters =
    search !== "" || Object.values(filters).some((value) => value !== "");

  return (
    <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
      <div className="flex flex-col gap-4">
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name or organization…"
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none placeholder:text-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {FILTERS.map(({ key, label }) => (
            <div key={key} className="flex flex-col gap-1">
              <label
                htmlFor={`filter-${key}`}
                className="text-xs font-medium text-foreground/60"
              >
                {label}
              </label>
              <select
                id={`filter-${key}`}
                value={filters[key]}
                onChange={(event) => onFilterChange(key, event.target.value)}
                className="w-full rounded-lg border border-border bg-background px-2.5 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="">All</option>
                {options[key].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <p className="text-sm text-foreground/60">
            <span className="font-semibold text-foreground">{resultCount}</span>{" "}
            {resultCount === 1 ? "profile" : "profiles"} found
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="text-sm font-medium text-primary hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
