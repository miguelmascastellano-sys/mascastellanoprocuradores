import { Fragment, type ReactNode } from "react";

// React 19 hoists <title>, <meta> and <link> into <head> (also during SSR),
// so page metadata can be rendered inline without react-helmet-async.
export function Helmet({ children }: { children?: ReactNode }) {
  return <Fragment>{children}</Fragment>;
}

export function HelmetProvider({ children }: { children?: ReactNode }) {
  return <Fragment>{children}</Fragment>;
}
