import { Badge } from "@/components/ui/badge"
import type { ShiftStatus } from "@/lib/types"
import { SHIFT_STATUS_CONFIG } from "@/lib/status-config"

interface StatusBadgeProps {
  status: ShiftStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = SHIFT_STATUS_CONFIG[status]

  return (
    <Badge
      style={{
        backgroundColor: config.backgroundColor,
        color: config.color,
        borderColor: config.borderColor,
      }}
    >
      {config.label}
    </Badge>
  )
}
