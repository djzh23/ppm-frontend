import type { ConfirmationStatus, ShiftStatus } from "@/lib/types"

export interface StatusConfig {
  label: string
  collectionLabel: string
  emptyLabel: string
  color: string
  backgroundColor: string
  borderColor: string
}

export const SHIFT_STATUS_CONFIG: Record<ShiftStatus, StatusConfig> = {
  Draft: {
    label: "Entwurf",
    collectionLabel: "Entwürfe",
    emptyLabel: "Entwürfe",
    color: "#1e40af",
    backgroundColor: "#dbeafe",
    borderColor: "#bfdbfe",
  },
  PendingApproval: {
    label: "Zur Genehmigung",
    collectionLabel: "Zur Genehmigung",
    emptyLabel: "Einsätze zur Genehmigung",
    color: "#b45309",
    backgroundColor: "#fef9c3",
    borderColor: "#fde68a",
  },
  Planned: {
    label: "Geplant",
    collectionLabel: "Geplant",
    emptyLabel: "geplante Einsätze",
    color: "#1d4ed8",
    backgroundColor: "#dbeafe",
    borderColor: "#bfdbfe",
  },
  Active: {
    label: "Aktiv",
    collectionLabel: "Aktiv",
    emptyLabel: "aktive Einsätze",
    color: "#166534",
    backgroundColor: "#dcfce7",
    borderColor: "#bbf7d0",
  },
  Completed: {
    label: "Abgeschlossen",
    collectionLabel: "Abgeschlossen",
    emptyLabel: "abgeschlossene Einsätze",
    color: "#475569",
    backgroundColor: "#f1f5f9",
    borderColor: "#cbd5e1",
  },
  Cancelled: {
    label: "Storniert",
    collectionLabel: "Storniert",
    emptyLabel: "stornierte Einsätze",
    color: "#b91c1c",
    backgroundColor: "#fee2e2",
    borderColor: "#fecaca",
  },
}

export const SHIFT_STATUS_ORDER: readonly ShiftStatus[] = [
  "Draft",
  "PendingApproval",
  "Planned",
  "Active",
  "Completed",
  "Cancelled",
]

export const CONFIRMATION_STATUS_CONFIG: Record<ConfirmationStatus, StatusConfig> = {
  Invited: {
    label: "Eingeladen",
    collectionLabel: "Eingeladen",
    emptyLabel: "eingeladene Teilnehmer",
    color: "#fff",
    backgroundColor: "#f59e0b",
    borderColor: "#f59e0b",
  },
  Accepted: {
    label: "Angenommen",
    collectionLabel: "Angenommen",
    emptyLabel: "angenommene Teilnehmer",
    color: "#fff",
    backgroundColor: "#16a34a",
    borderColor: "#16a34a",
  },
  Declined: {
    label: "Abgelehnt",
    collectionLabel: "Abgelehnt",
    emptyLabel: "abgelehnte Teilnehmer",
    color: "#fff",
    backgroundColor: "#dc2626",
    borderColor: "#dc2626",
  },
}

export type ReadinessStatus = "ready" | "not_ready"

export const READINESS_STATUS_CONFIG: Record<ReadinessStatus, Pick<StatusConfig, "label" | "color" | "backgroundColor" | "borderColor">> = {
  ready: {
    label: "Bereit",
    color: "#15803d",
    backgroundColor: "#f0fdf4",
    borderColor: "#bbf7d0",
  },
  not_ready: {
    label: "Nicht bereit",
    color: "#b45309",
    backgroundColor: "#fffbeb",
    borderColor: "#fde68a",
  },
}
