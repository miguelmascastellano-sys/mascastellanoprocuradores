import { createFileRoute } from "@tanstack/react-router";
import AdminPostEditor from "@/pages/admin/AdminPostEditor";

export const Route = createFileRoute("/admin/posts/$id")({
  component: AdminPostEditor,
});
