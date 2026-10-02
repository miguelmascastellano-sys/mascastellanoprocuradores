import { createFileRoute } from "@tanstack/react-router";
import AdminSeo from "@/pages/admin/AdminSeo";

export const Route = createFileRoute("/admin/seo")({
  component: AdminSeo,
});
