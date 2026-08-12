import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logVisit } from "../lib/api";

export default function VisitTracker() {
  const location = useLocation();

  useEffect(() => {
    logVisit(location.pathname);
  }, [location.pathname]);

  return null;
}
