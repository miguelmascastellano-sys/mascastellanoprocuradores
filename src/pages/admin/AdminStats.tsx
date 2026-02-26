import { usePostViewsStats, useTopPosts } from "@/hooks/usePostStats";
import { useState } from "react";
import { BarChart3, TrendingUp, Eye } from "lucide-react";

const AdminStats = () => {
  const [days, setDays] = useState(30);
  const { data: views, isLoading: viewsLoading } = usePostViewsStats(days);
  const { data: topPosts, isLoading: topLoading } = useTopPosts(days);

  // Group views by day
  const viewsByDay: Record<string, number> = {};
  views?.forEach((v) => {
    const day = new Date(v.viewed_at).toLocaleDateString("es-ES");
    viewsByDay[day] = (viewsByDay[day] || 0) + 1;
  });

  const sortedDays = Object.entries(viewsByDay).sort(
    (a, b) => new Date(a[0].split("/").reverse().join("-")).getTime() - new Date(b[0].split("/").reverse().join("-")).getTime()
  );
  const maxViews = Math.max(...sortedDays.map(([, v]) => v), 1);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground">Estadísticas</h1>
          <p className="text-sm text-muted-foreground mt-1">Visitas del blog</p>
        </div>
        <div className="flex gap-2">
          {[7, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                days === d ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-background border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Eye className="h-4 w-4" />Total visitas
          </div>
          <p className="text-3xl font-bold text-foreground">{viewsLoading ? "..." : views?.length ?? 0}</p>
        </div>
        <div className="bg-background border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <TrendingUp className="h-4 w-4" />Media diaria
          </div>
          <p className="text-3xl font-bold text-foreground">
            {viewsLoading ? "..." : Math.round((views?.length ?? 0) / days)}
          </p>
        </div>
        <div className="bg-background border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <BarChart3 className="h-4 w-4" />Posts con visitas
          </div>
          <p className="text-3xl font-bold text-foreground">{topLoading ? "..." : topPosts?.length ?? 0}</p>
        </div>
      </div>

      {/* Simple bar chart */}
      <div className="bg-background border border-border rounded-lg p-6 mb-8">
        <h2 className="text-sm font-semibold text-foreground mb-4">Visitas por día</h2>
        {sortedDays.length === 0 ? (
          <p className="text-sm text-muted-foreground">No hay datos para este período.</p>
        ) : (
          <div className="flex items-end gap-1 h-40">
            {sortedDays.map(([day, count]) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-1 group">
                <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">{count}</span>
                <div
                  className="w-full bg-primary/80 rounded-t min-h-[2px] transition-all hover:bg-primary"
                  style={{ height: `${(count / maxViews) * 100}%` }}
                  title={`${day}: ${count} visitas`}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top posts */}
      <div className="bg-background border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">Top Posts</h2>
        </div>
        {topLoading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-8 bg-muted rounded animate-pulse" />)}
          </div>
        ) : topPosts && topPosts.length > 0 ? (
          <div>
            {topPosts.map((post, i) => (
              <div key={post.id} className="flex items-center gap-4 p-4 border-b border-border last:border-0">
                <span className="text-sm font-bold text-muted-foreground w-6">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{post.title}</p>
                  <p className="text-xs text-muted-foreground">/{post.slug}</p>
                </div>
                <span className="text-sm font-bold text-foreground">{post.views}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground p-4">No hay datos.</p>
        )}
      </div>
    </div>
  );
};

export default AdminStats;
