interface BookCoverProps {
  id: number;
  title: string;
  author: string;
}

const COLORS = [
  "#3b5bdb",
  "#c2255c",
  "#2f9e44",
  "#e8590c",
  "#7048e8",
  "#0c8599",
  "#862e9c",
  "#5c940d",
];

function BookCover({ id, title, author }: BookCoverProps) {
  return (
    <div className="cover" style={{ backgroundColor: COLORS[id % COLORS.length] }}>
      <span className="cover-title">{title}</span>
      <span className="cover-author">{author}</span>
    </div>
  );
}

export default BookCover;