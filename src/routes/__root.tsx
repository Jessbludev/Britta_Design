import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppShell } from "@/components/shell";
import { BrittaThemeRoot, THEME_BOOTSTRAP_SCRIPT } from "@/britta/theme";
import * as Tooltip from "@radix-ui/react-tooltip";
import { MdIcon } from "@/britta/icon";
import { BrittaButton } from "@/britta";
import { Link } from "@tanstack/react-router";
import appCss from "../styles.css?url";

const APP_NAME = "Britta Design";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Britta Design — a Material 3 system compiled to Tailwind, TypeScript, and Jetpack Compose.",
      },
      { name: "theme-color", content: "#6750A4" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block",
      },
    ],
  }),
  notFoundComponent: NotFound,
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
        <PreviewHostBridge />
        <AuthProvider>
          <Tooltip.Provider delayDuration={400}>
            <BrittaThemeRoot>
              <AppShell>
                <Outlet />
              </AppShell>
            </BrittaThemeRoot>
          </Tooltip.Provider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <MdIcon name="search_off" size={40} className="text-on-surface-variant" />
      <h1 className="font-display text-2xl font-semibold">Page not in the system</h1>
      <p className="max-w-sm text-sm text-on-surface-variant">
        That route is not part of Britta Design. Head back to components or tokens.
      </p>
      <BrittaButton asChild>
        <Link to="/">Home</Link>
      </BrittaButton>
    </div>
  );
}
