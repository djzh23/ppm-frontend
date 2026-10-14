import { format } from "date-fns"
import { de } from "date-fns/locale"

// e.g. "16. Okt. 2026, 15:54"
export function formatDateTime(iso: string): string {
  return format(new Date(iso), "d. MMM yyyy, HH:mm", { locale: de })
}
