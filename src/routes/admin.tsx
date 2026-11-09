import { createFileRoute } from "@tanstack/react-router";
import AdminLayout from "@/pages/admin/AdminLayout";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ name: "robots", content: "noindex, nofollow" }] }),
  component: () => <AdminLayout />,
});
