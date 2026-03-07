import Link from "next/link";
import { ArrowRight, Palette, Download, Type, LayoutTemplate } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: LayoutTemplate, label: "50+ Templates", description: "Professional designs" },
  { icon: Type, label: "10 Fonts", description: "Curated typography" },
  { icon: Palette, label: "40+ Colors", description: "Curated palettes" },
  { icon: Download, label: "PDF Download", description: "Print-ready exports" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/5 via-primary/10 to-transparent blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-gradient-to-bl from-blue-500/5 via-violet-500/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-emerald-500/5 via-teal-500/5 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-24 lg:px-8 lg:pt-36 lg:pb-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left - Copy */}
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Free to get started
            </div>

            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Build Your Perfect{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Resume
              </span>{" "}
              in Seconds
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Create stunning, professional resumes with 50+ customizable templates.
              Stand out from the crowd and land your dream job.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" asChild className="h-12 px-8 text-base font-semibold shadow-lg shadow-primary/25">
                <Link href="/editor/new">
                  Start Building — It&apos;s Free
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="h-12 px-8 text-base">
                <Link href="/templates">Browse Templates</Link>
              </Button>
            </div>
          </div>

          {/* Right - Resume Mockup */}
          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5 blur-xl" />
            <div className="relative rounded-xl border border-border/60 bg-background p-6 shadow-2xl shadow-primary/5">
              {/* Mockup header */}
              <div className="mb-6 flex items-center gap-3">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/5" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-foreground/10" />
                  <div className="h-3 w-1/2 rounded bg-foreground/5" />
                </div>
              </div>
              {/* Section divider */}
              <div className="mb-4 h-px w-full bg-border" />
              {/* Experience section */}
              <div className="mb-4 space-y-3">
                <div className="h-3 w-1/3 rounded bg-primary/20" />
                <div className="space-y-2 pl-3">
                  <div className="h-3 w-full rounded bg-foreground/8" />
                  <div className="h-3 w-5/6 rounded bg-foreground/6" />
                  <div className="h-3 w-4/6 rounded bg-foreground/4" />
                </div>
              </div>
              {/* Skills section */}
              <div className="mb-4 space-y-3">
                <div className="h-3 w-1/4 rounded bg-primary/20" />
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-16 rounded-full bg-primary/10" />
                  <div className="h-6 w-20 rounded-full bg-primary/10" />
                  <div className="h-6 w-14 rounded-full bg-primary/10" />
                  <div className="h-6 w-18 rounded-full bg-primary/10" />
                  <div className="h-6 w-12 rounded-full bg-primary/10" />
                </div>
              </div>
              {/* Education section */}
              <div className="space-y-3">
                <div className="h-3 w-1/3 rounded bg-primary/20" />
                <div className="space-y-2 pl-3">
                  <div className="h-3 w-3/4 rounded bg-foreground/8" />
                  <div className="h-3 w-1/2 rounded bg-foreground/5" />
                </div>
              </div>
              {/* Decorative floating elements */}
              <div className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-background shadow-lg">
                <Palette className="h-5 w-5 text-primary/60" />
              </div>
              <div className="absolute -bottom-3 -left-3 flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-background shadow-lg">
                <Type className="h-5 w-5 text-primary/60" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-20 rounded-2xl border border-border/40 bg-muted/30 p-2 sm:mt-24">
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-xl bg-background px-4 py-4 shadow-sm transition-shadow hover:shadow-md sm:px-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
