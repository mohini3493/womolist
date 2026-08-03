import Directory from "@/components/Directory";
import { FILTERS, getFilterOptions, profiles, type FilterKey } from "@/lib/profiles";

export default function Home() {
  const options = Object.fromEntries(
    FILTERS.map(({ key }) => [key, getFilterOptions(key)])
  ) as Record<FilterKey, string[]>;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Directory profiles={profiles} options={options} />
    </main>
  );
}
