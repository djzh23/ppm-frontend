"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { RoleGuard } from "@/components/role-guard"
import { ShiftCard } from "@/components/shift-card"
import { apiGet } from "@/lib/apiClient"
import type { ShiftStatus, ShiftSummary } from "@/lib/types"
import { SHIFT_STATUS_CONFIG, SHIFT_STATUS_ORDER } from "@/lib/status-config"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardFooter } from "@/components/dashboard-footer"

export default function LeaderInboxPage() {
  return (
    <RoleGuard allowedRoles={["Festmitarbeiter", "Honorarkraft"]}>
      <LeaderInboxContent />
    </RoleGuard>
  )
}

function LeaderInboxContent() {
  const router = useRouter()
  const [shifts, setShifts] = useState<ShiftSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    loadShifts()
  }, [])

  async function loadShifts() {
    setLoadError(null)
    try {
      // Backend filters automatically: Festmitarbeiter/Honorarkraft only see their own assigned shifts
      const data = await apiGet<ShiftSummary[]>("/api/shifts")
      setShifts(data)
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Einsätze konnten nicht geladen werden.")
      setShifts([])
    } finally {
      setIsLoading(false)
    }
  }

  const shiftsByStatus = SHIFT_STATUS_ORDER.reduce((groups, status) => {
    groups[status] = shifts.filter((shift) => shift.status === status)
    return groups
  }, {} as Record<ShiftStatus, ShiftSummary[]>)

  function ShiftList({ list }: { list: ShiftSummary[] }) {
    if (isLoading) return <div className="text-center py-8 text-muted-foreground" style={{ fontSize: "0.85rem" }}>Laden...</div>
    if (loadError) return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p style={{ fontSize: "0.85rem", color: "hsl(var(--destructive))", marginBottom: "0.75rem" }}>{loadError}</p>
        <button onClick={loadShifts} style={{ fontSize: "0.8rem", color: "hsl(var(--muted-foreground))", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}>
          Erneut versuchen
        </button>
      </div>
    )
    if (list.length === 0) return (
      <div className="text-center py-10 text-muted-foreground" style={{ fontSize: "0.85rem" }}>Keine Einsätze</div>
    )
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((shift) => (
          <ShiftCard key={shift.id} shift={shift} onView={(id) => router.push(`/festmitarbeiter/shifts/${id}`)} />
        ))}
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "hsl(var(--background))" }}>
      <DashboardHeader section="Leader" isLoading={isLoading} />

      <main className="container mx-auto px-3 sm:px-6 py-8" style={{ flex: 1 }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em", color: "hsl(var(--foreground))", margin: 0 }}>
            Meine Einsätze
          </h1>
          <p style={{ fontSize: "0.83rem", color: "hsl(var(--muted-foreground))", marginTop: "0.25rem" }}>
            Einsätze, bei denen du als Leader eingeteilt bist
          </p>
        </div>
        <Card>
          <CardContent style={{ paddingTop: "1.5rem" }}>
            <Tabs defaultValue="Draft" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                {SHIFT_STATUS_ORDER.map((status) => {
                  const config = SHIFT_STATUS_CONFIG[status]
                  const count = shiftsByStatus[status].length
                  return (
                    <TabsTrigger key={status} value={status}>
                      {config.collectionLabel} {count > 0 && `(${count})`}
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {SHIFT_STATUS_ORDER.map((status) => (
                <TabsContent key={status} value={status} className="mt-6">
                  <ShiftList list={shiftsByStatus[status]} />
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </main>

      <DashboardFooter />
    </div>
  )
}
