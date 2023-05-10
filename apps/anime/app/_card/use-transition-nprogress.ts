import NProgress from "nprogress";
import { useEffect, useTransition } from "react";

export function useTransitionWithNProgress() {
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    if (isPending) NProgress.start();
    else NProgress.done();
  }, [isPending]);
  return startTransition;
}
