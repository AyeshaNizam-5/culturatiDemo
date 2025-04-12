"use client"

import { useState, useEffect } from "react"
import { Download, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import * as XLSX from 'xlsx'
// import axios from "axios"
// import { API_BASE_URL } from "@/config/apiConfig"

import { Button } from "@/components/ui/button"
import { columns } from "@/components/route-content/columns"
import { DataTable } from "@/components/route-content/data-table"
import { sampleRouteContent } from "@/lib/sample-data"

export default function RouteContentList() {
  const [data, setData] = useState(sampleRouteContent)
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  // useEffect(() => {
  //   fetchRouteContent()
  // }, [])
  
  // const fetchRouteContent = async () => {
  //   try {
  //     setIsLoading(true)
  //     setError(null)
  //     const response = await axios.get(`${API_BASE_URL}/route-content`)
  //     setData(response.data)
  //   } catch (error) {
  //     console.error('Error fetching route content:', error)
  //     setError('Failed to load route content. Please try again later.')
  //     toast.error('Failed to load route content')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const handleEdit = (id: string) => {
    navigate(`/dashboard/content-creator/Route/edit/${id}`)
  }

  const handleDelete = (ids: string[]) => {
    if (window.confirm(`Are you sure you want to delete ${ids.length} items?`)) {
      // API Integration (uncomment when connecting to backend)
      // deleteRouteContent(ids)
      
      // Mock implementation
      setData(data.filter(item => !ids.includes(item.id)))
      toast.success(`${ids.length} items deleted successfully`)
    }
  }
  
  // const deleteRouteContent = async (ids: string[]) => {
  //   try {
  //     await Promise.all(ids.map(id => axios.delete(`${API_BASE_URL}/route-content/${id}`)))
  //     
  //     // Refresh data after deletion
  //     fetchRouteContent()
  //     toast.success(`${ids.length} items deleted successfully`)
  //   } catch (error) {
  //     console.error('Error deleting route content:', error)
  //     toast.error('Failed to delete some or all items')
  //   }
  // }

  const handleExport = () => {
    try {
      // Use the current filtered/sorted data from the table
      // In the API integration version, you might want to:
      // 1. Either export what's currently loaded
      // 2. Or make a special API call to get all data for export
      
      // Prepare data for export, excluding the id field
      const exportData = data.map(item => {
        const { id, ...rest } = item
        return {
          "Content Name": rest.contentName,
          Language: rest.language,
          Category: rest.category,
          Level: rest.level,
          "Game Type": rest.type,
          "Related Item": rest.relatedItem,
          Author: rest.author,
          "Last Editor": rest.lastEditor
        }
      })

      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(exportData)
      
      // Set column widths for better readability
      const columnWidths = [
        { wch: 40 }, // Content Name
        { wch: 15 }, // Language
        { wch: 15 }, // Category
        { wch: 10 }, // Level
        { wch: 15 }, // Game Type
        { wch: 20 }, // Related Item
        { wch: 15 }, // Author
        { wch: 15 }, // Last Editor
      ]
      worksheet['!cols'] = columnWidths
      
      // Create workbook
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Route Content")
      
      // Export to Excel file
      XLSX.writeFile(workbook, "route-content.xlsx")
      
      toast.success('Exported successfully to Excel')
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Export failed. Please try again.')
    }
  }

  return (
    <div className="container mx-auto p-4 py-10">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Route Content</h1>
          <div className="flex items-center gap-2">
            <Button 
              className="flex items-center gap-2" 
              onClick={handleExport}
              variant="outline"
            >
              <Download size={16} /> Export to Excel
            </Button>
            <Button 
              className="flex items-center gap-2" 
              onClick={() => navigate('/dashboard/content-creator/Route')}
            >
              <Plus size={16} /> Add New
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">
          Manage your route content items. You can filter, sort, and edit your content here.
        </p>
      </div>

      {/* {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )} */}

      <div className="flex flex-col gap-6">
        {/* {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <p className="text-muted-foreground">Loading route content...</p>
          </div>
        ) : */}
        {data.length > 0 ? (
          <DataTable
            columns={columns}
            data={data}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-48 bg-muted/10 rounded-lg border border-dashed">
            <p className="text-muted-foreground mb-2">No route content found</p>
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard/content-creator/Route')}
              className="flex items-center gap-2"
            >
              <Plus size={16} /> Create your first route content
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 