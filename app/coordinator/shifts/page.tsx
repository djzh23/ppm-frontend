"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { RoleGuard } from "@/components/role-guard"
import { ShiftCard } from "@/components/shift-card"
import { apiGet } from "@/lib/apiClient"
import type { ShiftSummary } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardFooter } from "@/components/dashboard-footer"
import { Plus, FileEdit, ClipboardCheck, CalendarCheck, Zap, CheckCircle2, Ban } from "lucide-react"
import type { ShiftStatus } from "@/lib/types"
import { SHIFT_STATUS_CONFIG, SHIFT_STATUS_ORDER } from "@/lib/status-config"

const statusIcons = {
  Draft: FileEdit,
  PendingApproval: ClipboardCheck,
  Planned: CalendarCheck,
  Active: Zap,
  Completed: CheckCircle2,
  Cancelled: Ban,
}

export default function CoordinatorShiftsPage() {
  return (
    <RoleGuard allowedRoles={["Coordinator"]}>
      <CoordinatorShiftsContent />
    </RoleGuard>
  )
}

function CoordinatorShiftsContent() {
  const router = useRouter()
  const [einsaetze, setEinsaetze] = useState<ShiftSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => { loadEinsaetze() }, [])

  async function loadEinsaetze() {
    setLoadError(null)
    try {
      const data = await apiGet<ShiftSummary[]>("/api/shifts")
      setEinsaetze(data)
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Einsätze konnten nicht geladen werden.")
      setEinsaetze([])
    } finally {
      setIsLoading(false)
    }
  }

  const shiftsByStatus = SHIFT_STATUS_ORDER.reduce((groups, status) => {
    groups[status] = einsaetze.filter((einsatz) => einsatz.status === status)
    return groups
  }, {} as Record<ShiftStatus, ShiftSummary[]>)

  const statCards = SHIFT_STATUS_ORDER.map((status) => {
    const config = SHIFT_STATUS_CONFIG[status]
    return {
      status,
      label: config.collectionLabel,
      value: shiftsByStatus[status].length,
      icon: statusIcons[status],
      color: config.color,
      bg: config.backgroundColor,
    }
  })

  const EmptyState = ({ label, showCreate = false }: { label: string; showCreate?: boolean }) => (
    <div
      style={{
        textAlign: "center",
        padding: "3rem 1rem",
        color: "hsl(var(--muted-foreground))",
      }}
    >
      <p style={{ fontSize: "0.9rem", marginBottom: showCreate ? "1rem" : 0 }}>
        Keine {label} vorhanden
      </p>
      {showCreate && (
        <Button
          onClick={() => router.push("/coordinator/shifts/new")}
          size="sm"
        >
          Ersten Einsatz erstellen
        </Button>
      )}
    </div>
  )

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", backgroundColor: "hsl(var(--background))", overflow: "hidden" }}>

      {/* Grid-Hintergrund */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: [
            "linear-gradient(rgba(100,100,100,0.07) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(100,100,100,0.07) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "48px 48px",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <DashboardHeader section="Koordinator" isLoading={isLoading} />

      <main className="container mx-auto px-3 sm:px-6 py-8" style={{ flex: 1, position: "relative", zIndex: 1 }}>

        {loadError && (
          <div
            style={{
              marginBottom: "1.25rem",
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius)",
              border: "1px solid hsl(var(--destructive) / 0.3)",
              backgroundColor: "hsl(var(--destructive) / 0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <span style={{ fontSize: "0.83rem", color: "hsl(var(--destructive))" }}>
              Einsätze konnten nicht geladen werden — {loadError}
            </span>
            <button
              onClick={loadEinsaetze}
              style={{
                fontSize: "0.78rem",
                color: "hsl(var(--destructive))",
                textDecoration: "underline",
                background: "none",
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Erneut versuchen
            </button>
          </div>
        )}

        {/* Seitenüberschrift */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3" style={{ marginBottom: "2rem" }}>
          <div>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "hsl(var(--foreground))",
                margin: 0,
              }}
            >
              Einsätze
            </h1>
            <p style={{ fontSize: "0.85rem", color: "hsl(var(--muted-foreground))", marginTop: "0.25rem" }}>
              Einsätze erstellen, verwalten und veröffentlichen
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => router.push("/coordinator/shifts/new")}
            className="self-start sm:self-auto"
            style={{ gap: "0.4rem", fontSize: "0.8rem" }}
          >
            <Plus style={{ width: "14px", height: "14px" }} />
            Neuer Einsatz
          </Button>
        </div>

        {/* Stat-Karten */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "12px",
            marginBottom: "2rem",
          }}
        >
          {statCards.map(({ status, label, value, icon: Icon, color, bg }) => (
            <div
              key={status}
              style={{
                backgroundColor: "hsl(var(--card))",
                border: "0.5px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.85rem",
              }}
            >
              <div
                style={{
                  width: "36px", height: "36px",
                  borderRadius: "8px",
                  backgroundColor: bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon style={{ width: "16px", height: "16px", color }} />
              </div>
              <div>
                <div style={{ fontSize: "1.4rem", fontWeight: 600, lineHeight: 1, color: "hsl(var(--foreground))" }}>
                  {value}
                </div>
                <div style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))", marginTop: "2px" }}>
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs-Card */}
        <Card>
          <CardHeader>
            <CardTitle>Alle Einsätze</CardTitle>
            <CardDescription>Einsätze nach Status anzeigen und verwalten</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="Draft" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                {SHIFT_STATUS_ORDER.map((status) => {
                  const config = SHIFT_STATUS_CONFIG[status]
                  const count = shiftsByStatus[status].length
                  return (
                    <TabsTrigger key={status} value={status}>
                      {config.collectionLabel}{count > 0 && ` (${count})`}
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {SHIFT_STATUS_ORDER.map((status) => {
                const config = SHIFT_STATUS_CONFIG[status]
                const statusEinsaetze = shiftsByStatus[status]
                return (
                  <TabsContent key={status} value={status} className="mt-6">
                    {isLoading ? (
                      <div style={{ textAlign: "center", padding: "2rem", color: "hsl(var(--muted-foreground))", fontSize: "0.85rem" }}>
                        Laden...
                      </div>
                    ) : statusEinsaetze.length === 0 ? (
                      <EmptyState label={config.emptyLabel} showCreate={status === "Draft"} />
                    ) : (
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {statusEinsaetze.map((einsatz) => (
                          <ShiftCard key={einsatz.id} shift={einsatz} onView={(id) => router.push(`/coordinator/shifts/${id}`)} />
                        ))}
                      </div>
                    )}
                  </TabsContent>
                )
              })}
            </Tabs>
          </CardContent>
        </Card>
      </main>

      <DashboardFooter />
    </div>
  )
}
