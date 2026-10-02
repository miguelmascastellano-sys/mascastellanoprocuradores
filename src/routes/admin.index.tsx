import { createFileRoute } from "@tanstack/react-router";
import AdminPosts from "@/pages/admin/AdminPosts";

export const Route = createFileRoute("/admin/")({
  component: AdminPosts,
});
