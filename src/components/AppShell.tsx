import { useState } from "react";
import { Link, useMatchRoute } from "@tanstack/react-router";
import {
  Home,
  PhoneCall,
  Trophy,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/Wordmark";

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/llamadas", label: "Llamadas", icon: PhoneCall },
  { to: "/ranking", label: "Ranking", icon: Trophy },
  { to: "/configuracion", label: "Configuración", icon: Settings },
] as const;

function NavLinkContent({
  to,
  label,
  icon: Icon,
  collapsed,
  active,
}: {
  to: string;
  label: string;
  icon: typeof Home;
  collapsed?: boolean;
  active: boolean;
}) {
  return (
    <>
      <Icon
        className={cn(
          "size-5 shrink-0 transition-colors",
          active ? "text-primary" : "text-muted-foreground"
        )}
      />
      {!collapsed && (
        <span
          className={cn(
            "truncate text-sm transition-colors",
            active ? "text-foreground font-medium" : "text-muted-foreground"
          )}
        >
          {label}
        </span>
      )}
    </>
  );
}

/**
 * App shell: collapsible sidebar on desktop, bottom tab bar on mobile.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const matchRoute = useMatchRoute();

  const isActive = (to: string) => {
    const match = matchRoute({ to, fuzzy: true });
    return !!match;
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="noise-overlay" aria-hidden="true" />

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-border/60 bg-card/40 backdrop-blur-sm transition-[width] duration-300 md:flex",
          collapsed ? "w-[76px]" : "w-60"
        )}
      >
        <div
          className={cn(
            "flex h-16 items-center border-b border-border/60",
            collapsed ? "justify-center px-0" : "px-5"
          )}
        >
          {collapsed ? (
            <span className="font-display text-lg font-bold text-primary">r</span>
          ) : (
            <Wordmark className="text-xl" />
          )}
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV_ITEMS.map(({ to, label, icon }) => {
            const active = isActive(to);
            return (
              <Link
                key={to}
                to={to}
                title={collapsed ? label : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                  collapsed && "justify-center px-0",
                  active
                    ? "bg-secondary text-foreground"
                    : "hover:bg-secondary/60 hover:text-foreground"
                )}
              >
                <NavLinkContent to={to} label={label} icon={icon} collapsed={collapsed} active={active} />
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border/60 p-3">
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground",
              collapsed && "justify-center px-0"
            )}
            aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="size-5 shrink-0" />
            ) : (
              <>
                <PanelLeftClose className="size-5 shrink-0" />
                <span>Colapsar</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center border-b border-border/60 bg-background/80 px-4 backdrop-blur-sm md:hidden">
        <Wordmark className="text-lg" />
      </div>

      {/* Main content */}
      <main className="flex min-w-0 flex-1 flex-col pt-14 pb-20 md:pt-0 md:pb-0">
        {children}
      </main>

      {/* Mobile bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex h-20 items-stretch border-t border-border/60 bg-background/90 backdrop-blur-md md:hidden">
        {NAV_ITEMS.map(({ to, label, icon }) => {
          const active = isActive(to);
          return (
            <Link
              key={to}
              to={to}
              className="flex flex-1 flex-col items-center justify-center gap-1.5"
            >
              <Icon
                className={cn(
                  "size-5 transition-colors",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  "text-[11px] transition-colors",
                  active ? "text-foreground font-medium" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
