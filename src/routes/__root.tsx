import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { LazyMotion } from "framer-motion";
import { useEffect, type ReactNode } from "react";


import appCss from "../styles.css?url";
import { SmoothScroll } from "../components/SmoothScroll";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { syncStoredLanguage } from "../i18n";

const loadMotionFeatures = () => import("../lib/motion-features").then((m) => m.default);

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Business English Coaching for Professionals | LinguaSUpra" },
      {
        name: "description",
        content:
          "Effective Business English coaching by CELTA & TESOL certified trainer Su. 15+ years helping professionals communicate with confidence. Book a call.",
      },
      { name: "author", content: "Su · LinguaSUpra" },
      { property: "og:title", content: "Business English Coaching for Professionals | LinguaSUpra" },
      {
        property: "og:description",
        content:
          "Effective Business English coaching by CELTA & TESOL certified trainer Su. 15+ years helping professionals communicate with confidence. Book a call.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "LinguaSUpra" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Business English Coaching for Professionals | LinguaSUpra" },
      { name: "twitter:description", content: "Effective Business English coaching by CELTA & TESOL certified trainer Su. 15+ years helping professionals communicate with confidence. Book a call." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/d8282060-1520-4e3f-a559-e0228f27b824" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/d8282060-1520-4e3f-a559-e0228f27b824" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preload", href: "/fonts/GeneralSans-Variable.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/Poppins-Variable.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://linguasupra.com/#organization",
              name: "LinguaSUpra",
              url: "https://linguasupra.com",
              founder: { "@type": "Person", name: "Su" },
              email: "hello@linguasupra.com",
              telephone: "+352 661 502 425",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Um Trenker 19",
                postalCode: "L-6962",
                addressLocality: "Senningen",
                addressCountry: "LU",
              },
            },
            {
              "@type": "WebSite",
              "@id": "https://linguasupra.com/#website",
              url: "https://linguasupra.com",
              name: "LinguaSUpra",
              publisher: { "@id": "https://linguasupra.com/#organization" },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    syncStoredLanguage();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* LazyMotion ships only the DOM animation feature set instead of the
          full framer-motion runtime, cutting a large chunk of initial JS. */}
      <SmoothScroll />
      <LazyMotion features={loadMotionFeatures} strict>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </LazyMotion>
    </QueryClientProvider>
  );
}

