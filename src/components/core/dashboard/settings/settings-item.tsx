"use client"

import type React from "react"

import { Button } from "@/components/ui/button"

interface SettingsItemProps {
  label: string
  value: string | React.ReactNode
  description?: string
  actionLabel?: string
  onAction?: () => void
  showEdit?: boolean
}

export function SettingsItem({
  label,
  value,
  description,
  actionLabel = "Edit",
  onAction,
  showEdit = true,
}: SettingsItemProps) {
  return (
    <div className="flex items-center justify-between py-6 border-b border-border last:border-0">
      <div className="grid gap-1">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <div className="flex flex-col">
          <span className="text-sm font-bold">{value}</span>
          {description && <span className="text-xs text-muted-foreground">{description}</span>}
        </div>
      </div>
      {showEdit && (
        <Button
          variant="outline"
          size="sm"
          onClick={onAction}
          className="h-8 px-4 text-xs font-semibold bg-transparent"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
