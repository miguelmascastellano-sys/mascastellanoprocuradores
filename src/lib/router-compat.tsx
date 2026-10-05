/**
 * Router-compat shim — bridges react-router-dom v6 call sites to
 * @tanstack/react-router without hand-rewriting every component.
 */
import {
  useNavigate as tsNavigate,
  useLocation as tsLocation,
  useParams as tsParams,
  useRouter,
  Link as TSLink,
  Navigate as TSNavigate,
  Outlet as TSOutlet,
} from "@tanstack/react-router";
import { useMemo, useCallback, forwardRef, type ComponentProps, type ReactNode } from "react";

// ---------- shared URL parsing ----------

type ParsedTo = { pathname: string; search?: Record<string, string>; hash?: string };

function parseTo(to: string): ParsedTo {
  const [beforeHash = "", hashStr] = (to ?? "").split("#");
  const [pathname, searchStr] = beforeHash.split("?");
  // react-router keeps the current path for search-only ("?a=1") and
  // hash-only ("#section") targets; TanStack's "." means current route.
  const out: ParsedTo = { pathname: pathname || "." };
  if (searchStr) out.search = Object.fromEntries(new URLSearchParams(searchStr));
  if (hashStr) out.hash = hashStr;
  return out;
}

function navOptions(parsed: ParsedTo, extra?: { replace?: boolean; state?: unknown }) {
  const opts: Record<string, unknown> = { to: parsed.pathname };
  if (parsed.search) opts["search"] = parsed.search;
  if (parsed.hash !== undefined) opts["hash"] = parsed.hash;
  if (extra?.state !== undefined) opts["state"] = extra.state;
  if (extra?.replace !== undefined) opts["replace"] = extra.replace;
  return opts;
}

// ---------- useNavigate ----------

type NavigateOptions = { replace?: boolean; state?: unknown };

type NavigateFn = {
  (to: string | number, options?: NavigateOptions): void;
  (delta: number): void;
};

export function useNavigate(): NavigateFn {
  const tsNav = tsNavigate();
  const router = useRouter();
  return useCallback((to: string | number, options?: NavigateOptions) => {
    if (typeof to === "number") {
      router.history.go(to);
      return;
    }
    tsNav(navOptions(parseTo(to), options) as never);
  }, [tsNav, router]) as NavigateFn;
}

// ---------- useLocation ----------

export function useLocation() {
  const loc = tsLocation();
  return useMemo(
    () => ({
      pathname: loc.pathname,
      search: loc.searchStr ? `?${loc.searchStr}` : "",
      hash: loc.hash ?? "",
      state: (loc.state ?? null) as unknown,
      key: loc.pathname + (loc.searchStr ?? ""),
    }),
    [loc.pathname, loc.searchStr, loc.hash, loc.state],
  );
}

// ---------- useParams ----------

export function useParams<T extends Record<string, string | undefined> = Record<string, string | undefined>>(): T {
  return tsParams({ strict: false } as never) as T;
}


// ---------- useSearchParams (react-router-dom compat) ----------

export function useSearchParams(): [URLSearchParams, (init: URLSearchParams | Record<string, string> | ((prev: URLSearchParams) => URLSearchParams), opts?: { replace?: boolean }) => void] {
  const loc = tsLocation();
  const nav = tsNavigate();
  const router = useRouter();
  const params = useMemo(() => new URLSearchParams(loc.searchStr ?? ""), [loc.searchStr]);
  const setParams = useCallback(
    (
      init: URLSearchParams | Record<string, string> | ((prev: URLSearchParams) => URLSearchParams),
      opts?: { replace?: boolean },
    ) => {
      // Functional updaters read the router's live location, not the render
      // snapshot — react-router passes call-time params, and chained updates
      // within one tick must see each other's writes.
      const live = router.state.location;
      const current = new URLSearchParams(live.searchStr ?? "");
      const next =
        typeof init === "function"
          ? init(current)
          : init instanceof URLSearchParams
            ? init
            : new URLSearchParams(init);
      const searchObj: Record<string, string> = {};
      next.forEach((v, k) => { searchObj[k] = v; });
      const navOpts: Record<string, unknown> = { to: live.pathname, search: searchObj };
      if (opts?.replace !== undefined) navOpts["replace"] = opts.replace;
      nav(navOpts as never);
    },
    [nav, router],
  );
  return [params, setParams];
}

// ---------- Link ----------

type LinkProps = Omit<ComponentProps<typeof TSLink>, "to"> & {
  to: string;
  replace?: boolean;
  state?: unknown;
  children?: ReactNode;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, replace, state, children, ...rest },
  ref,
) {
  const linkProps = navOptions(parseTo(to), { replace, state } as never);
  return (
    <TSLink
      {...({} as { to: string })}
      ref={ref as never}
      {...(linkProps as never as Record<string, unknown>)}
      {...((rest ?? {}) as Record<string, unknown>)}
    >
      {children}
    </TSLink>
  );
});


// ---------- Navigate ----------

export function Navigate({ to, replace, state }: { to: string; replace?: boolean; state?: unknown }) {
  const props = navOptions(parseTo(to), { replace, state } as never);
  return <TSNavigate {...({} as { to: string })} {...(props as never as Record<string, unknown>)} />;
}

// ---------- Outlet ----------

export const Outlet = TSOutlet;

// ---------- NavLink (minimal) ----------

export const NavLink = Link;
