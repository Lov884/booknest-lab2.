export type SortOption = "title" | "year-asc" | "year-desc" | "pages";

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as SortOption)}
    >
      <option value="title">Title (A-Z)</option>
      <option value="year-asc">Year (oldest first)</option>
      <option value="year-desc">Year (newest first)</option>
      <option value="pages">Pages (fewest first)</option>
    </select>
  );
}

export default SortSelect;