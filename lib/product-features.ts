import { GitBranch, Inbox, ShieldCheck, Users, type LucideIcon } from "lucide-react"

export type ProductFeature = {
  icon: LucideIcon
  title: string
  description: string
}

export const productFeatures: readonly ProductFeature[] = [
  {
    icon: ShieldCheck,
    title: "Rollenbasierter Zugriff",
    description: "Vier Rollen mit eigenen Rechten",
  },
  {
    icon: GitBranch,
    title: "Einsatz-Workflow",
    description: "Von Entwurf bis Abgeschlossen",
  },
  {
    icon: Users,
    title: "Benutzerverwaltung",
    description: "Registrierung mit Admin-Freigabe",
  },
  {
    icon: Inbox,
    title: "Leader-Inbox",
    description: "Einsätze, die du als Leader leitest",
  },
]
