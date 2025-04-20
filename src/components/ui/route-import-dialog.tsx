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
import { AlertTriangle, Info, Check, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export type ImportAction = "append" | "skip-conflicts" | "replace-conflicts"

export interface RouteImportDialogProps {
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

export function RouteImportDialog({
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
}: RouteImportDialogProps) {
  const [importAction, setImportAction] = React.useState<ImportAction>("append")
  const hasExistingData = existingDataCount > 0
  const hasConflicts = conflictCount > 0
  
  // State for selected items
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set())
  const [selectAll, setSelectAll] = React.useState(true)
  
  // Reset selection when dialog opens or data changes
  React.useEffect(() => {
    if (open && importData.length > 0) {
      // Select all by default
      const allIds = new Set(importData.map((item, index) => index.toString()))
      setSelectedRows(allIds)
      setSelectAll(true)
    } else {
      setSelectedRows(new Set())
      setSelectAll(false)
    }
  }, [open, importData])
  
  // Handle select all toggle
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked)
    if (checked) {
      const allIds = new Set(importData.map((item, index) => index.toString()))
      setSelectedRows(allIds)
    } else {
      setSelectedRows(new Set())
    }
  }
  
  // Handle individual row selection
  const handleRowSelect = (rowId: string, checked: boolean) => {
    const newSelection = new Set(selectedRows)
    if (checked) {
      newSelection.add(rowId)
    } else {
      newSelection.delete(rowId)
    }
    setSelectedRows(newSelection)
    
    // Update selectAll state
    setSelectAll(newSelection.size === importData.length)
  }
  
  // Filter importData to get only selected items
  const getSelectedItems = () => {
    return importData.filter((_, index) => selectedRows.has(index.toString()))
  }
  
  // Handle import with selected items
  const handleImport = () => {
    const selectedItems = getSelectedItems()
    if (selectedItems.length === 0) return
    
    // Mark items as selected or not selected in the original data
    importData.forEach((item, index) => {
      item._selected = selectedRows.has(index.toString())
    })
    
    // Call the onImport function with selected items marked
    onImport(importAction)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] w-[1200px] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-grow overflow-auto">
          {importData.length > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm">
                  <Info size={16} className="text-blue-500" />
                  <span>Found {importData.length} items to import</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    Selected: {selectedRows.size} of {importData.length}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSelectAll(true)}
                    className="h-8"
                  >
                    Select All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSelectAll(false)}
                    className="h-8"
                  >
                    Deselect All
                  </Button>
                </div>
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
                  <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={selectAll}
                          onCheckedChange={handleSelectAll}
                          aria-label="Select all"
                        />
                      </TableHead>
                      <TableHead className="w-[50px]">Status</TableHead>
                      {columns.map((column) => (
                        <TableHead key={column.key} style={column.width ? { width: `${column.width}px` } : undefined}>
                          {column.header}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {importData.map((row, index) => (
                      <TableRow 
                        key={index} 
                        className={row._isDuplicate ? "bg-yellow-50" : (row._hasConflict ? "bg-orange-50" : "")}
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.has(index.toString())}
                            onCheckedChange={(checked) => handleRowSelect(index.toString(), !!checked)}
                            aria-label={`Select row ${index + 1}`}
                          />
                        </TableCell>
                        <TableCell>
                          {row._isDuplicate ? (
                            <span className="inline-flex items-center text-amber-600 text-xs font-medium">
                              <AlertTriangle className="h-3 w-3 mr-1" /> Duplicate
                            </span>
                          ) : row._hasConflict ? (
                            <span className="inline-flex items-center text-orange-600 text-xs font-medium">
                              <AlertTriangle className="h-3 w-3 mr-1" /> Conflict
                            </span>
                          ) : (
                            <span className="inline-flex items-center text-green-600 text-xs font-medium">
                              <Check className="h-3 w-3 mr-1" /> New
                            </span>
                          )}
                        </TableCell>
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

              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-medium">Import Options</h4>
                <RadioGroup 
                  value={importAction} 
                  onValueChange={(value) => setImportAction(value as ImportAction)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="append" id="route-append" />
                    <Label htmlFor="route-append">
                      Append selected items to existing data {duplicateCount > 0 && `(including duplicates)`}
                    </Label>
                  </div>

                  {hasExistingData && duplicateCount > 0 && (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="skip-conflicts" id="route-skip-conflicts" />
                      <Label htmlFor="route-skip-conflicts">
                        Skip duplicates from selected items
                      </Label>
                    </div>
                  )}

                  {hasExistingData && (conflictCount - duplicateCount) > 0 && (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="replace-conflicts" id="route-replace-conflicts" />
                      <Label htmlFor="route-replace-conflicts">
                        Replace conflicting items with selected items
                      </Label>
                    </div>
                  )}
                </RadioGroup>
              </div>
            </>
          ) : (
            <p className="text-center py-8 text-muted-foreground">
              No valid data found to import.
            </p>
          )}
        </div>

        <DialogFooter className="mt-4 border-t pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleImport}
            disabled={selectedRows.size === 0}
          >
            Import {selectedRows.size} Items
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 