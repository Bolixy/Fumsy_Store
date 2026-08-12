import { useEffect, useState } from "react";
import Logo from "../Logo/Logo";
import "./LoadingScreen.css";

/**
 * Splash screen shown on first load, same idea as Jumia/Opay:
 * brand mark + name, brief hold, then fades to reveal the app.
 */
export default function LoadingScreen({ onFinish, minDuration = 1600 }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = setTimeout(() => setLeaving(true), minDuration);
    const finishTimer = setTimeout(() => onFinish?.(), minDuration + 500);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(finishTimer);
    };
  }, [minDuration, onFinish]);

  return (
    <div className={`splash ${leaving ? "splash--leaving" : ""}`}>
      <div className="splash__inner">
        <Logo size="lg" showWord={true} />
        <p className="splash__tagline">Footwear, handpicked.</p>
        <div className="splash__bar">
          <div className="splash__bar-fill" style={{ animationDuration: `${minDuration}ms` }} />
        </div>
      </div>
    </div>
  );
}
