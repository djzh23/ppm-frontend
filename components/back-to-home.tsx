import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function BackToHome() {
  return (
    <Link
      href="/"
      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-white px-3 text-[13px] font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <ArrowLeft aria-hidden="true" size={15} />
      Startseite
    </Link>
  )
}
