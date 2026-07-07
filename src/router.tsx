import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  // Update document title on navigation using route's head() meta
  router.subscribe("onResolved", () => {
    const matches = router.state.matches;
    for (let i = matches.length - 1; i >= 0; i--) {
      const routeMeta = (matches[i].routeContext as any)?.__head?.meta;
      const titleEntry = Array.isArray(routeMeta)
        ? routeMeta.find((m: any) => m.title)
        : undefined;
      if (titleEntry?.title) {
        document.title = titleEntry.title;
        break;
      }
    }
  });

  return router;
};
