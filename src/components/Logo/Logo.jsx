import "./Logo.css";

/**
 * Funmsy Store mark: a monogram "F" inside a stitched loop —
 * echoes the thread-loop tag motif used across the site,
 * standing in for a hand-tied shoe tag.
 */
export default function Logo({ size = "md", variant = "dark", showWord = true }) {
  const color = variant === "light" ? "#F7F1E6" : "#211510";
  const accent = "#6E1E2B";

  return (
    <span className={`logo logo--${size}`}>
      <svg
        className="logo__mark"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="1.6" />
        <path
          d="M24 6 C24 6 30 12 30 18"
          stroke={accent}
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <text
          x="24"
          y="32"
          textAnchor="middle"
          fontFamily="Fraunces, serif"
          fontStyle="italic"
          fontWeight="600"
          fontSize="22"
          fill={color}
        >
          F
        </text>
      </svg>
      {showWord && (
        <span className="logo__word" style={{ color }}>
          Funmsy<span className="logo__word-accent">.</span>
        </span>
      )}
    </span>
  );
}
