"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getUserRole, isAuthenticated } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { LoginIllustration } from "@/components/login-illustration"
import { productFeatures } from "@/lib/product-features"

export default function HomePage() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!isAuthenticated()) {
      setChecking(false)
      return
    }
    const role = getUserRole()
    switch (role) {
      case "Admin":
        router.push("/admin")
        break
      case "Coordinator":
        router.push("/coordinator/shifts")
        break
      case "Festmitarbeiter":
        router.push("/festmitarbeiter/inbox")
        break
      case "Honorarkraft":
        router.push("/honorarkraft/inbox")
        break
      default:
        setChecking(false)
    }
  }, [router])

  if (checking) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "hsl(var(--background))" }}
      >
        <div
          className="animate-spin rounded-full border-b-2"
          style={{ width: "1.5rem", height: "1.5rem", borderColor: "hsl(var(--foreground))" }}
        />
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflowX: "hidden",
        backgroundColor: "hsl(var(--background))",
      }}
    >
      {/* Grid-Hintergrund */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: [
            "linear-gradient(rgba(100,100,100,0.1) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(100,100,100,0.1) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      {/* Nav */}
      <nav
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem clamp(1.5rem, 5vw, 4rem)",
          borderBottom: "0.5px solid hsl(var(--border))",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            fontSize: "1.05rem",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            color: "hsl(var(--foreground))",
          }}
        >
          PPM
        </span>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/login">Anmelden</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/auth/register">Registrieren</Link>
          </Button>
        </div>
      </nav>

      <main className="relative z-[1] flex flex-1 flex-col items-center justify-center px-6 py-16 text-center md:py-20">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Shift Management System
        </p>
        <h1
          className="text-[36px] font-bold leading-[1.1] tracking-[-0.035em] text-foreground md:text-[56px]"
          style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
        >
          Play Pal Manager
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[17px] leading-[1.65] text-muted-foreground">
          Für Vereine: Teams zusammenstellen, Rollen verwalten und Einsätze begleiten.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/auth/login" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              Anmelden
              <ArrowRight style={{ width: "16px", height: "16px" }} />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/auth/register">Konto erstellen</Link>
          </Button>
        </div>
        <ul className="mt-10 grid w-full max-w-5xl grid-cols-1 gap-8 border-t border-border pt-6 text-left md:grid-cols-4">
          {productFeatures.map(({ icon: Icon, title, description }) => (
            <li key={title}>
              <Icon aria-hidden="true" size={19} className="text-foreground" />
              <div className="mt-3 text-sm font-semibold leading-tight text-foreground">{title}</div>
              <div className="mt-1 text-[13px] leading-snug text-muted-foreground">{description}</div>
            </li>
          ))}
        </ul>
      </main>
      <LoginIllustration className="relative z-[1] mb-10 mt-8" />

      {/* Footer */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "0.5px solid hsl(var(--border))",
          padding: "1rem clamp(1.5rem, 5vw, 4rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: "0.72rem", color: "hsl(var(--muted-foreground))" }}>
          Play Pal Manager
        </span>
      </footer>
    </div>
  )
}
