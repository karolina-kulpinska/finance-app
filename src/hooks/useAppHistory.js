import { useState, useEffect, useCallback } from "react";

const DEFAULT_VIEW = { tab: "dashboard" };

/**
 * Hook do synchronizacji widoku aplikacji z historią przeglądarki.
 * Dzięki temu systemowy przycisk Wstecz na telefonie działa poprawnie.
 * @param {object} initialView - początkowy stan widoku
 * @returns {{ viewState, pushView, goBack }}
 */
export function useAppHistory(initialView = DEFAULT_VIEW) {
  const [viewState, setViewState] = useState(() => initialView);

  const pushView = useCallback((patch) => {
    setViewState((prev) => {
      const next = { ...prev, ...patch };
      try {
        window.history.pushState(next, "", window.location.href);
      } catch (_) {}
      return next;
    });
  }, []);

  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  useEffect(() => {
    const handlePopState = (e) => {
      const state = e.state || DEFAULT_VIEW;
      setViewState(state);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return { viewState, pushView, goBack };
}
