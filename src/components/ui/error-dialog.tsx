"use client"

import * as React from "react"
import { AlertCircle, XCircle } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export interface ErrorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  errorType: string
  errorDetails?: string
}

export function ErrorDialog({
  open,
  onOpenChange,
  title,
  description,
  errorType,
  errorDetails
}: ErrorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <XCircle className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Import Error: {errorType}</AlertTitle>
          <AlertDescription>
            {errorDetails || "The Excel file could not be imported. Please check the file format and try again."}
          </AlertDescription>
        </Alert>

        <DialogFooter className="mt-4">
          <Button variant="default" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 