interface GenreFilterProps {
  genres: string[];
  value: string;
  onChange: (value: string) => void;
}

function GenreFilter({ genres, value, onChange }: GenreFilterProps) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      <option value="">All genres</option>
      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
}

export default GenreFilter;