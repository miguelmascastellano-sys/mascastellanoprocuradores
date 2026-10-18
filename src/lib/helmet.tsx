import { Children, Fragment, isValidElement, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";
import { publicMetadata } from "@/data/page-metadata";

// React 19 hoists <title>, <meta> and <link> into <head> (also during SSR),
// so page metadata can be rendered inline without react-helmet-async.
export function Helmet({ children }: { children?: ReactNode }) {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, "") || "/";
  const routeOwnsMetadata = Boolean(publicMetadata[path]) || path.startsWith("/blog/") ||
    ["/procurador-comunidad-valenciana", "/procurador-provincia-alicante", "/procurador-elche", "/precio-procurador-alicante"].includes(path);
  const filter = (nodes: ReactNode): ReactNode => Children.map(nodes, (node) => {
    if (!isValidElement<{ children?: ReactNode; name?: string; property?: string; rel?: string }>(node)) return node;
    if (node.type === Fragment) return <Fragment>{filter(node.props.children)}</Fragment>;
    if (!routeOwnsMetadata) return node;
    if (node.type === "title" || (node.type === "link" && node.props.rel === "canonical")) return null;
    const key = node.props.name ?? node.props.property;
    if (node.type === "meta" && key && ["description", "og:title", "og:description", "og:url", "og:type", "og:image", "twitter:image", "twitter:card"].includes(key)) return null;
    return node;
  });
  return <Fragment>{filter(children)}</Fragment>;
}

export function HelmetProvider({ children }: { children?: ReactNode }) {
  return <Fragment>{children}</Fragment>;
}
