"use client"

import { useState, useEffect } from "react"
import { Download, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
// import axios from "axios"
// import { API_BASE_URL } from "@/config/apiConfig"

import { Button } from "@/components/ui/button"
import { columns } from "@/components/game-content/columns"
import { DataTable } from "@/components/game-content/data-table"
import { sampleGameContent } from "@/lib/sample-data"

export default function GameContentList() {
  const [data, setData] = useState(sampleGameContent)
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  // useEffect(() => {
  //   fetchGameContent()
  // }, [])
  
  // const fetchGameContent = async () => {
  //   try {
  //     setIsLoading(true)
  //     setError(null)
  //     const response = await axios.get(`${API_BASE_URL}/game-content`)
  //     setData(response.data)
  //   } catch (error) {
  //     console.error('Error fetching game content:', error)
  //     setError('Failed to load game content. Please try again later.')
  //     toast.error('Failed to load game content')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const handleEdit = (id: string) => {
    navigate(`/dashboard/content-creator/Game/edit/${id}`)
  }

  const handleDelete = (ids: string[]) => {
    if (window.confirm(`Are you sure you want to delete ${ids.length} items?`)) {
      // API Integration (uncomment when connecting to backend)
      // deleteGameContent(ids)
      
      // Mock implementation
      setData(data.filter(item => !ids.includes(item.id)))
      toast.success(`${ids.length} items deleted successfully`)
    }
  }
  
  // const deleteGameContent = async (ids: string[]) => {
  //   try {
  //     await Promise.all(ids.map(id => axios.delete(`${API_BASE_URL}/game-content/${id}`)))
  //     
  //     // Refresh data after deletion
  //     fetchGameContent()
  //     toast.success(`${ids.length} items deleted successfully`)
  //   } catch (error) {
  //     console.error('Error deleting game content:', error)
  //     toast.error('Failed to delete some or all items')
  //   }
  // }

  const handleExport = async () => {
    try {
      // Create a new workbook
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Game Content');
      
      // Define columns with widths
      worksheet.columns = [
        { header: 'Question', key: 'question', width: 40 },
        { header: 'Language', key: 'language', width: 15 },
        { header: 'Category', key: 'category', width: 15 },
        { header: 'Level', key: 'level', width: 10 },
        { header: 'Game Type', key: 'gameType', width: 15 },
        { header: 'Related Item', key: 'relatedItem', width: 20 },
        { header: 'Author', key: 'author', width: 15 },
        { header: 'Last Editor', key: 'lastEditor', width: 15 }
      ];
      
      // Style the header row
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE9ECEF' }
      };
      
      // Add the data rows, excluding ID
      data.forEach(item => {
        const { id, ...rest } = item;
        worksheet.addRow(rest);
      });
      
      // Auto-filter
      worksheet.autoFilter = {
        from: { row: 1, column: 1 },
        to: { row: 1, column: 8 }
      };
      
      // Generate buffer and save to file
      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), 'game-content.xlsx');
      
      toast.success('Exported successfully to Excel');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Export failed. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4 py-10">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Game Content</h1>
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
              onClick={() => navigate('/dashboard/content-creator/Game')}
            >
              <Plus size={16} /> Add New
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">
          Manage your game content questions. You can filter, sort, and edit your content here.
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
            <p className="text-muted-foreground">Loading game content...</p>
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
            <p className="text-muted-foreground mb-2">No game content found</p>
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard/content-creator/Game')}
              className="flex items-center gap-2"
            >
              <Plus size={16} /> Create your first game content
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 