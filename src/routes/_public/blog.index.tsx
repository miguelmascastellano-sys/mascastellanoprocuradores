import { createFileRoute } from "@tanstack/react-router";
import { publicPageHead } from "@/data/page-metadata";
import Blog from "@/pages/Blog";

export const Route = createFileRoute("/_public/blog/")({
  head: () => publicPageHead("/blog"),
  component: Blog,
});
