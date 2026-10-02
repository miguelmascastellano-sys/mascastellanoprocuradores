import { createFileRoute } from "@tanstack/react-router";
import BlogPost from "@/pages/BlogPost";

export const Route = createFileRoute("/_public/blog/$slug")({
  component: BlogPost,
});
