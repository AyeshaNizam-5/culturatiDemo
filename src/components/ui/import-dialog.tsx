"use client"

import * as React from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Info } from "lucide-react"

export type ImportAction = "append" | "replace" | "skip-conflicts" | "replace-conflicts"

export interface ImportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  importData: any[]
  existingDataCount: number
  onImport: (action: ImportAction) => void
  columns: {
    key: string
    header: string
    width?: number
  }[]
  conflictCount?: number
  duplicateCount?: number
}

export function ImportDialog({
  open,
  onOpenChange,
  title,
  description,
  importData,
  existingDataCount,
  onImport,
  columns,
  conflictCount = 0,
  duplicateCount = 0
}: ImportDialogProps) {
  const [importAction, setImportAction] = React.useState<ImportAction>("append")
  const hasExistingData = existingDataCount > 0
  const hasConflicts = conflictCount > 0

  // Handle display of preview data (limit to 5 rows for the preview)
  const previewData = importData.slice(0, 5)
  const hasMoreRows = importData.length > 5

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {importData.length > 0 ? (
            <>
              <div className="flex items-center space-x-2 text-sm">
                <Info size={16} className="text-blue-500" />
                <span>Found {importData.length} items to import</span>
              </div>

              {hasExistingData && (
                <Alert variant="default">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    {existingDataCount} items already exist in your data.
                    {duplicateCount > 0 && ` ${duplicateCount} items are exact duplicates.`}
                    {conflictCount > 0 && duplicateCount < conflictCount && 
                      ` ${conflictCount - duplicateCount} items have content conflicts with different metadata.`}
                  </AlertDescription>
                </Alert>
              )}

              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {columns.map((column) => (
                        <TableHead key={column.key} style={column.width ? { width: `${column.width}px` } : undefined}>
                          {column.header}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewData.map((row, index) => (
                      <TableRow key={index}>
                        {columns.map((column) => (
                          <TableCell key={column.key}>
                            {row[column.key] || "-"}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {hasMoreRows && (
                <p className="text-sm text-muted-foreground italic text-center">
                  Showing 5 of {importData.length} rows. {importData.length - 5} more rows not shown.
                </p>
              )}

              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-medium">Import Options</h4>
                <RadioGroup 
                  value={importAction} 
                  onValueChange={(value) => setImportAction(value as ImportAction)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="append" id="append" />
                    <Label htmlFor="append">
                      Append all items to existing data {duplicateCount > 0 && `(including ${duplicateCount} duplicates)`}
                    </Label>
                  </div>

                  {hasExistingData && duplicateCount > 0 && (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="skip-conflicts" id="skip-conflicts" />
                      <Label htmlFor="skip-conflicts">
                        Skip {duplicateCount} exact duplicates
                      </Label>
                    </div>
                  )}

                  {hasExistingData && (conflictCount - duplicateCount) > 0 && (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="replace-conflicts" id="replace-conflicts" />
                      <Label htmlFor="replace-conflicts">
                        Replace {conflictCount - duplicateCount} items with content conflicts
                      </Label>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="replace" id="replace" />
                    <Label htmlFor="replace" className="text-red-600 font-medium">
                      Replace all existing data with imported data
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </>
          ) : (
            <p className="text-center py-8 text-muted-foreground">
              No valid data found to import.
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={() => onImport(importAction)}
            disabled={importData.length === 0}
          >
            Import {importData.length} Items
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 