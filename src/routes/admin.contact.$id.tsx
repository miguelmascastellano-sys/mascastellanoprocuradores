import { createFileRoute } from "@tanstack/react-router";
import AdminContactDetail from "@/pages/admin/AdminContactDetail";

export const Route = createFileRoute("/admin/contact/$id")({
  component: AdminContactDetail,
});
