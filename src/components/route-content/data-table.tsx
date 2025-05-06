"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn,
} from "@tanstack/react-table"
import { Check, ChevronDown, MoreHorizontal, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Combobox } from "@/components/ui/combobox"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { categories, contentTypes, languages, levels } from "@/lib/data"
import { RouteContentActionHandlers } from "./columns"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onDelete: (ids: string[]) => void
  onEdit: (id: string) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onDelete,
  onEdit,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [searchQuery, setSearchQuery] = React.useState("")
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10, 
  })
  
  
  // Enhanced filter options that match the sample data
  const [languageOptions] = React.useState(languages)
  const [categoryOptions] = React.useState([
    ...categories,
    { value: "Test-category", label: "Test Category" },
    { value: "Tarih", label: "Tarih" },
    { value: "Arts", label: "Arts" },
    { value: "Locations", label: "Locations" },
  ])
  const [levelOptions] = React.useState([
    ...levels,
    { value: "Test-Level", label: "Test Level" },
    { value: "Professional", label: "Professional" },
    { value: "kolay", label: "Kolay" },
    { value: "Strange", label: "Strange" },
  ])
  const [gameTypeOptions] = React.useState([
    ...contentTypes,
    { value: "Individual", label: "Individual" },
    { value: "Group", label: "Group" },
    { value: "Family", label: "Family" },
  ])
  const [statusOptions] = React.useState([
    { value: "Pending", label: "Pending" },
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
  ])
  
  const [showFilters, setShowFilters] = React.useState(true)

  // Create a custom case-insensitive filter function
  const caseInsensitiveFilterFn: FilterFn<any> = (row, columnId, filterValues) => {
    if (!filterValues || !filterValues.length) return true;
    
    const value = row.getValue(columnId);
    if (!value) return false;
    
    return (filterValues as string[]).some((filterValue) => 
      String(value).toLowerCase().includes(String(filterValue).toLowerCase())
    );
  };

  const table = useReactTable({
    data,
    columns,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    filterFns: {
      caseInsensitive: caseInsensitiveFilterFn,
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter: searchQuery,
      pagination,
    },
    meta: {
      onEdit,
      onDelete
    } as RouteContentActionHandlers,
  })

  const handleGlobalFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    table.setGlobalFilter(e.target.value)
  }

  const handleDeleteSelected = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows
    if (selectedRows.length === 0) {
      toast("No rows selected")
      return
    }
    
    const ids = selectedRows.map(row => (row.original as any).id)
    onDelete(ids)
    setRowSelection({})
  }
  
  // Function to update a filter
  const updateFilter = (columnId: string, value: string) => {
    const column = table.getColumn(columnId)
    if (!column) return
    
    const currentFilters = column.getFilterValue() as string[] || []
    
    // If value is already in filter, remove it, otherwise add it
    if (currentFilters.includes(value)) {
      column.setFilterValue(currentFilters.filter(f => f !== value))
    } else {
      column.setFilterValue([...currentFilters, value])
    }
  }

  // Function to clear all filters
  const clearAllFilters = () => {
    table.getAllColumns().forEach(column => {
      if (column.getCanFilter()) {
        column.setFilterValue(undefined)
      }
    })
  }

  // Get the current filter values
  const languageFilter = table.getColumn("language")?.getFilterValue() as string[] || []
  const categoryFilter = table.getColumn("category")?.getFilterValue() as string[] || []
  const levelFilter = table.getColumn("level")?.getFilterValue() as string[] || []
  const gameTypeFilter = table.getColumn("type")?.getFilterValue() as string[] || []
  const statusFilter = table.getColumn("status")?.getFilterValue() as string[] || []


  // Check if any filters are active
  const hasActiveFilters = languageFilter.length > 0 || 
                          categoryFilter.length > 0 || 
                          levelFilter.length > 0 || 
                          gameTypeFilter.length > 0

  return (
    <div className="w-full">
      {showFilters && (
        <div className="flex flex-col gap-4 p-4 border rounded-md bg-white mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Filters</h3>
            <div className="flex gap-2">
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  onClick={clearAllFilters}
                  className="h-8 px-2 lg:px-3 text-sm"
                >
                  Clear all
                  <X className="ml-2 h-4 w-4" />
                </Button>
              )}
              <Button 
                variant="ghost"
                onClick={() => setShowFilters(false)}
                className="h-8 px-2 lg:px-3 text-sm"
              >
                Hide Filters
                <X className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Language</label>
              <Combobox
                options={languageOptions}
                value=""
                onChange={(value) => updateFilter("language", value)}
                placeholder="Filter by language"
                emptyMessage="No languages found"
                searchPlaceholder="Search languages"
              />
              <div className="flex flex-wrap gap-1 mt-2">
                {languageFilter.map(language => (
                  <Badge 
                    key={language} 
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {languageOptions.find(l => l.value.toLowerCase() === language.toLowerCase())?.label || language}
                    <span 
                      className="ml-1 flex items-center justify-center cursor-pointer hover:bg-muted rounded-full p-0.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateFilter("language", language);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </span>
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Combobox
                options={categoryOptions}
                value=""
                onChange={(value) => updateFilter("category", value)}
                placeholder="Filter by category"
                emptyMessage="No categories found"
                searchPlaceholder="Search categories"
              />
              <div className="flex flex-wrap gap-1 mt-2">
                {categoryFilter.map(category => (
                  <Badge 
                    key={category} 
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {categoryOptions.find(c => c.value.toLowerCase() === category.toLowerCase())?.label || category}
                    <span 
                      className="ml-1 flex items-center justify-center cursor-pointer hover:bg-muted rounded-full p-0.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateFilter("category", category);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </span>
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Level</label>
              <Combobox
                options={levelOptions}
                value=""
                onChange={(value) => updateFilter("level", value)}
                placeholder="Filter by level"
                emptyMessage="No levels found"
                searchPlaceholder="Search levels"
              />
              <div className="flex flex-wrap gap-1 mt-2">
                {levelFilter.map(level => (
                  <Badge 
                    key={level} 
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {levelOptions.find(l => l.value.toLowerCase() === level.toLowerCase())?.label || level}
                    <span 
                      className="ml-1 flex items-center justify-center cursor-pointer hover:bg-muted rounded-full p-0.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateFilter("level", level);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </span>
                  </Badge>
                ))}
              </div>
            </div>

            
            <div className="space-y-2">
              <label className="text-sm font-medium">Game Type</label>
              <Combobox
                options={gameTypeOptions}
                value=""
                onChange={(value) => updateFilter("type", value)}
                placeholder="Filter by game type"
                emptyMessage="No game types found"
                searchPlaceholder="Search game types"
              />
              <div className="flex flex-wrap gap-1 mt-2">
                {gameTypeFilter.map(gameType => (
                  <Badge 
                    key={gameType} 
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {gameTypeOptions.find(t => t.value.toLowerCase() === gameType.toLowerCase())?.label || gameType}
                    <span 
                      className="ml-1 flex items-center justify-center cursor-pointer hover:bg-muted rounded-full p-0.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateFilter("type", gameType);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </span>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Combobox
                options={statusOptions}
                value=""
                onChange={(value) => updateFilter("status", value)}
                placeholder="Filter by status"
                emptyMessage="No statuses found"
                searchPlaceholder="Search status"
              />
              <div className="flex flex-wrap gap-1 mt-2">
                {statusFilter.map(status => (
                  <Badge 
                    key={status} 
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {status}
                    <span 
                      className="ml-1 flex items-center justify-center cursor-pointer hover:bg-muted rounded-full p-0.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateFilter("status", status);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </span>
                  </Badge>
                ))}
              </div>
            </div>



          </div>

        </div>
      )}

      <div className="flex items-center justify-between py-4">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={handleGlobalFilter}
            className="max-w-sm"
          />
          {!showFilters && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowFilters(true)}
              className="h-8 px-2 lg:px-3 text-sm"
            >
              Show Filters
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8 px-2 lg:px-3 text-sm">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id === "contentName" ? "Content Name" : 
                       column.id === "language" ? "Language" : 
                       column.id === "category" ? "Category" : 
                       column.id === "level" ? "Level" : 
                       column.id === "type" ? "Game Type" : 
                       column.id === "relatedItem" ? "Related Item" : 
                       column.id === "author" ? "Author" : 
                       column.id === "lastEditor" ? "Last Editor" : 
                       column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="destructive"
            onClick={handleDeleteSelected}
            disabled={table.getFilteredSelectedRowModel().rows.length === 0}
          >
            Delete Selected
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <div className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value))
              }}
              className="border rounded px-2 py-1 text-sm">
              {[10, 20, 50, 100].map(size => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>

        </div>
      </div>
    </div>
  )
} 