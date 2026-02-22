import { useState, useCallback, useEffect } from "react";

const DEFAULT_VIEW = { tab: "dashboard" };

let stack = [{ ...DEFAULT_VIEW }];

function getStack() {
  return stack;
}

function pushToStack(state) {
  stack = [...stack, state];
}

function popFromStack() {
  if (stack.length <= 1) return null;
  stack = stack.slice(0, -1);
  return stack[stack.length - 1];
}

export function useAppHistory(initialView = DEFAULT_VIEW) {
  const [viewState, setViewState] = useState(() => getStack()[getStack().length - 1]);

  useEffect(() => {
    const s = getStack();
    if (s.length === 0 || !s[s.length - 1]?.tab) {
      stack = [{ ...initialView }];
      setViewState(stack[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- init once on mount
  }, []);

  const pushView = useCallback((patch) => {
    setViewState((prev) => {
      const next = { ...prev, ...patch };
      const same =
        prev.tab === next.tab &&
        prev.familyPanel === next.familyPanel &&
        prev.profileSection === next.profileSection &&
        prev.shoppingListId === next.shoppingListId;
      if (!same) {
        pushToStack(next);
      }
      return next;
    });
  }, []);

  const goBack = useCallback(() => {
    const prev = popFromStack();
    if (prev) {
      setViewState(prev);
    }
  }, []);

  return { viewState, pushView, goBack };
}
