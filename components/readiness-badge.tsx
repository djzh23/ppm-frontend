import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { READINESS_STATUS_CONFIG, type ReadinessStatus } from "@/lib/status-config"

interface ReadinessBadgeProps {
  readiness?: ReadinessStatus
}

export function ReadinessBadge({ readiness }: ReadinessBadgeProps) {
  if (!readiness) return null

  const config = READINESS_STATUS_CONFIG[readiness]
  const Icon = readiness === "ready" ? CheckCircle2 : AlertCircle
  return (
    <Badge
      variant="outline"
      style={{
        backgroundColor: config.backgroundColor,
        color: config.color,
        borderColor: config.borderColor,
      }}
    >
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  )
}
