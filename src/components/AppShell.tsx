import { useState } from "react";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { House, Phone, Trophy, Settings, PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ReplicaLogo } from "@/components/ReplicaLogo";

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: House },
  { to: "/llamadas", label: "Llamadas", icon: Phone },
  { to: "/ranking", label: "Ranking", icon: Trophy },
  { to: "/configuracion", label: "Config", icon: Settings },
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
  icon: typeof House;
  collapsed?: boolean;
  active: boolean;
}) {
  return (
    <>
      <Icon
        className={cn(
          "size-5 shrink-0 transition-colors duration-200",
          active ? "text-primary" : "text-tertiary",
        )}
      />
      {!collapsed && (
        <span
          className={cn(
            "truncate text-sm transition-colors duration-200",
            active ? "font-medium text-primary" : "text-tertiary",
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
    <div className="relative min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden flex-col border-r border-border bg-surface transition-[width] duration-200 ease-out lg:flex",
          collapsed ? "w-16" : "w-[220px]",
        )}
      >
        <div
          className={cn(
            "flex h-16 items-center border-b border-border",
            collapsed ? "justify-center" : "px-5",
          )}
        >
          {collapsed ? (
            <ReplicaLogo compact />
          ) : (
            <ReplicaLogo />
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
                  "relative flex min-h-11 items-center gap-3 rounded-sm px-3 transition-colors duration-200",
                  collapsed && "justify-center px-0",
                  active
                    ? "bg-elevated text-primary"
                    : "text-tertiary hover:bg-elevated hover:text-foreground",
                )}
              >
                <NavLinkContent
                  to={to}
                  label={label}
                  icon={icon}
                  collapsed={collapsed}
                  active={active}
                />
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-2.5">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setCollapsed((c) => !c)}
            className={cn(
              "h-11 w-full justify-start gap-3 rounded-sm px-3 text-sm text-tertiary hover:bg-elevated hover:text-foreground",
              collapsed && "justify-center px-0",
            )}
            aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
          >
            <PanelLeft className={cn("size-5 shrink-0 transition-transform", collapsed && "rotate-180")} strokeWidth={1.5} />
            {!collapsed && <span>Colapsar</span>}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={cn(
          "relative z-10 flex min-h-screen min-w-0 flex-col pb-[calc(64px+env(safe-area-inset-bottom,0px))] transition-[margin] duration-200 ease-out lg:pb-0",
          collapsed ? "lg:ml-16" : "lg:ml-[220px]",
        )}
      >
        {children}
      </main>

      {/* Mobile bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex h-[calc(64px+env(safe-area-inset-bottom,0px))] items-start border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur-xl lg:hidden">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
          const active = isActive(to);
          return (
            <Link
              key={to}
              to={to}
              className="relative flex h-16 flex-1 flex-col items-center justify-center gap-1"
            >
              {active && <span className="active-tab-indicator absolute inset-x-3 top-[-1px] h-0.5 bg-primary" />}
              <Icon
                className={cn(
                  "size-5 transition-colors duration-200",
                  active ? "text-primary" : "text-tertiary",
                )}
                strokeWidth={1.5}
              />
              <span
                className={cn(
                  "text-[11px] transition-colors duration-200",
                  active ? "font-medium text-primary" : "text-tertiary",
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
