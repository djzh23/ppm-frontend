"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { register } from "@/lib/auth"
import { BackToHome } from "@/components/back-to-home"
import { LoginIllustration } from "@/components/login-illustration"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [eyesClosed, setEyesClosed] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      await register(firstname, lastname, email, password)
      toast({
        title: "Registrierung erfolgreich",
        description: "Dein Konto wird nach der Freigabe durch einen Admin aktiviert.",
      })
      router.push("/auth/login")
    } catch (error) {
      toast({
        title: "Registrierung fehlgeschlagen",
        description: error instanceof Error ? error.message : "Bitte versuche es erneut.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="relative flex min-h-screen flex-col overflow-x-hidden"
      style={{ backgroundColor: "hsl(var(--background))" }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: [
            "linear-gradient(rgba(100,100,100,0.12) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(100,100,100,0.12) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "48px 48px",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 70% at 70% 50%, transparent 20%, hsl(var(--background)) 100%)",
          zIndex: 1,
        }}
      />

      <div className="relative z-[2] px-[clamp(1.5rem,5vw,4rem)] pt-5">
        <BackToHome />
      </div>

      <div className="relative z-[2] flex flex-1 flex-col items-center justify-center px-6 py-8">
        <div className="flex w-full max-w-5xl flex-col gap-16 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:w-[340px] md:shrink-0">
            <p
              className="mb-3 text-[11px] font-normal uppercase tracking-[0.2em] text-muted-foreground"
              style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
            >
              Shift Management System
            </p>
            <h1
              className="text-[36px] font-bold leading-[1.1] tracking-[-0.03em] text-foreground"
              style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
            >
              Play Pal Manager
            </h1>
            <p className="mt-3 text-[14.5px] leading-[1.65] text-muted-foreground">
              Lege dein Konto an, um loszulegen.
            </p>
          </div>

          <div className="w-full shrink-0 md:w-[28rem]">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Registrieren</CardTitle>
          <CardDescription>Trage deine Daten ein.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname">Vorname</Label>
                <Input
                  id="firstname"
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname">Nachname</Label>
                <Input
                  id="lastname"
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@beispiel.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setEyesClosed(true)}
                onBlur={() => setEyesClosed(false)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Wird erstellt …" : "Konto erstellen"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Schon ein Konto?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Anmelden
            </Link>
          </div>
        </CardContent>
      </Card>
          </div>
        </div>
      </div>
      <LoginIllustration className="relative z-[2] mb-10 mt-8" eyesClosed={eyesClosed} />
    </div>
  )
}
