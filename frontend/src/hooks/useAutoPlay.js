import { useEffect, useCallback } from "react";

export function useAutoPlay({
  itemsCount,
  autoPlay = true,
  intervalMs = 3000,
  onNext,
}) {
  const triggerNext = useCallback(() => {
    onNext();
  }, [onNext]);

  useEffect(() => {
    if (!autoPlay || itemsCount <= 1) return;

    const timer = setInterval(() => {
      triggerNext();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [autoPlay, itemsCount, intervalMs, triggerNext]);
}
