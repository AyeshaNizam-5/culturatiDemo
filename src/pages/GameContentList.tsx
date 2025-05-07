"use client"

import { useState,  useRef } from "react"
import { Download, Plus, Upload } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
// import axios from "axios"
// import { API_BASE_URL } from "@/config/apiConfig"
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button"
import { columns } from "@/components/game-content/columns"
import { DataTable } from "@/components/game-content/data-table"
import { sampleGameContent } from "@/lib/sample-data"
import { ImportAction } from "@/components/ui/import-dialog"
import { GameImportDialog } from "@/components/ui/game-import-dialog"
import { ErrorDialog } from "@/components/ui/error-dialog"

export default function GameContentList() {
  const [data, setData] = useState(sampleGameContent)
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { user } = useSelector((state) => state.auth);
  const rolePath = user?.role === "editor" ? "editor" : "content-creator";

  // Import dialog state
  const [importDialogOpen, setImportDialogOpen] = useState(false)
  const [importData, setImportData] = useState<any[]>([])
  const [conflictCount, setConflictCount] = useState(0)
  const [duplicateCount, setDuplicateCount] = useState(0)
  
  // Error dialog state
  const [errorDialogOpen, setErrorDialogOpen] = useState(false)
  const [errorType, setErrorType] = useState('')
  const [errorDetails, setErrorDetails] = useState('')

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

  const handleStatusChange = (ids: string[], newStatus: "Pending" | "Approved" | "Rejected") => {
    const updatedData = data.map(item =>
      ids.includes(item.id) ? { ...item, status: newStatus } : item
    )
    setData(updatedData)
    toast.success(`Status updated to "${newStatus}" for ${ids.length} item(s)`)
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

  const handleEdit = (id: string) => {
    navigate(`/dashboard/${rolePath}/Game/edit/${id}`);
  };
  
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

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Check if an item already exists (simplistic approach)
  const findConflicts = (importedItem: any) => {
    // Track if this is an exact duplicate (all fields match)
    const duplicates = data.filter(item => {
      const isExactDuplicate = 
        item.question.toLowerCase().trim() === importedItem.question.toLowerCase().trim() &&
        item.language === importedItem.language &&
        item.category === importedItem.category &&
        item.level === importedItem.level &&
        item.gameType === importedItem.gameType &&
        item.relatedItem === importedItem.relatedItem;
      
      return isExactDuplicate;
    });
    
    // If we found exact duplicates, mark it as a duplicate
    if (duplicates.length > 0) {
      return { isDuplicate: true, id: duplicates[0].id };
    }
    
    // Otherwise, check if there's a content conflict (same question but different metadata)
    const contentConflicts = data.some(item => 
      item.question.toLowerCase().trim() === importedItem.question.toLowerCase().trim() &&
      (
        item.language !== importedItem.language ||
        item.category !== importedItem.category ||
        item.level !== importedItem.level ||
        item.gameType !== importedItem.gameType ||
        item.relatedItem !== importedItem.relatedItem
      )
    );
    
    return contentConflicts ? { isConflict: true } : false;
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const buffer = e.target?.result;
          if (!buffer) {
            console.error('File buffer is empty');
            setErrorType('Empty File');
            setErrorDetails('The file appears to be empty or could not be read.');
            setErrorDialogOpen(true);
            return;
          }
          
          console.log('File loaded successfully, attempting to parse as Excel...');
          
          // Load workbook from file
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(buffer as ArrayBuffer);
          
          // Get first worksheet
          const worksheet = workbook.getWorksheet(1);
          if (!worksheet) {
            console.error('No worksheet found in the workbook');
            setErrorType('Invalid Worksheet');
            setErrorDetails('No worksheet found in the Excel file. Please make sure the file contains at least one sheet.');
            setErrorDialogOpen(true);
            return;
          }
          
          console.log('Worksheet found, checking headers...');
          
          // Check if worksheet has rows
          if (worksheet.rowCount <= 1) {
            console.error('Excel file has less than 2 rows (header + data)');
            setErrorType('Empty Data');
            setErrorDetails('The Excel file contains no data rows. Please make sure the file has headers and at least one data row.');
            setErrorDialogOpen(true);
            return;
          }

          // Extract headers to ensure correct mapping
          const headers: Record<number, string> = {};
          const headerRow = worksheet.getRow(1);
          
          // Check if header row has any cells
          let headerCellCount = 0;
          headerRow.eachCell((cell, colNumber) => {
            const headerValue = cell.value?.toString().toLowerCase() || '';
            headers[colNumber] = headerValue;
            headerCellCount++;
            console.log(`Header found: ${colNumber} = "${headerValue}"`);
          });
          
          if (headerCellCount === 0) {
            console.error('No headers found in the first row');
            setErrorType('Missing Headers');
            setErrorDetails('The Excel file has no header row or headers are empty. The first row must contain column headers.');
            setErrorDialogOpen(true);
            return;
          }

          // Define required headers
          const requiredHeaders = ['question', 'language', 'category', 'level', 'game type', 'related item'];
          
          // Validate headers
          const missingHeaders = requiredHeaders.filter(
            header => !Object.values(headers).some(h => h.toLowerCase() === header.toLowerCase())
          );
          
          if (missingHeaders.length > 0) {
            console.error('Missing headers:', missingHeaders);
            console.log('Available headers:', Object.values(headers));
            setErrorType('Invalid Headers');
            setErrorDetails(`Missing required headers: ${missingHeaders.join(', ')}. Please ensure your file has all required columns.`);
            setErrorDialogOpen(true);
            return;
          }
          
          console.log('Headers validated, processing data rows...');

          // Process rows
          const importedData: any[] = [];
          const rowErrors: string[] = [];
          
          worksheet.eachRow((row, rowNumber) => {
            // Skip header row
            if (rowNumber === 1) return;
            
            const rowData: Record<string, any> = {};
            let cellsProcessed = 0;
            
            // Map column headers to field names
            row.eachCell((cell, colNumber) => {
              const header = headers[colNumber];
              if (!header) return;
              
              const value = cell.value?.toString() || '';
              cellsProcessed++;
              
              switch (header.toLowerCase()) {
                case 'question':
                  rowData.question = value;
                  break;
                case 'language':
                  rowData.language = value;
                  break;
                case 'category':
                  rowData.category = value;
                  break;
                case 'level':
                  rowData.level = value;
                  break;
                case 'game type':
                  rowData.gameType = value;
                  break;
                case 'related item':
                  rowData.relatedItem = value;
                  break;
                case 'author':
                  rowData.author = value;
                  break;
                case 'last editor':
                  rowData.lastEditor = value;
                  break;
              }
            });
            
            if (cellsProcessed === 0) {
              // Skip empty rows silently
              return;
            }
            
            // Check for required fields
            if (!rowData.question) {
              rowErrors.push(`Row ${rowNumber}: Missing question`);
              return;
            }
            
            // Generate a unique ID for each new item
            rowData.id = `import-${Date.now()}-${rowNumber}`;
            
            // Set default values for missing optional fields
            rowData.author = rowData.author || 'Imported';
            rowData.lastEditor = rowData.lastEditor || 'Imported';
            
            importedData.push(rowData);
          });
          
          if (rowErrors.length > 0) {
            console.error('Import row errors:', rowErrors);
            setErrorType('Data Validation Errors');
            setErrorDetails(`Found ${rowErrors.length} rows with errors. First error: ${rowErrors[0]}`);
            setErrorDialogOpen(true);
            return;
          }
          
          if (importedData.length === 0) {
            console.error('No valid data rows were processed');
            setErrorType('No Valid Data');
            setErrorDetails('No valid data found in the Excel file. Please check that your file contains valid data rows.');
            setErrorDialogOpen(true);
            return;
          }
          
          console.log(`Successfully processed ${importedData.length} data rows`);
          
          // Check for duplicates and conflicts
          let exactDuplicates = 0;
          let contentConflicts = 0;
          
          importedData.forEach(item => {
            const result = findConflicts(item);
            if (result) {
              if (result.isDuplicate) {
                exactDuplicates++;
                item._isDuplicate = true;
                item._existingId = result.id;
              } else if (result.isConflict) {
                contentConflicts++;
                item._hasConflict = true;
              }
            }
          });
          
          console.log(`Found ${exactDuplicates} exact duplicates and ${contentConflicts} content conflicts`);
          
          // Open the import dialog with the parsed data
          setImportData(importedData);
          setDuplicateCount(exactDuplicates);
          setConflictCount(exactDuplicates + contentConflicts);
          setImportDialogOpen(true);
        } catch (innerError: unknown) {
          console.error('Error processing Excel file:', innerError);
          setErrorType('Processing Error');
          setErrorDetails(innerError instanceof Error ? innerError.message : 'Unknown error occurred while processing the Excel file');
          setErrorDialogOpen(true);
        }
      };
      
      reader.onerror = (error: ProgressEvent<FileReader>) => {
        console.error('FileReader error:', error);
        setErrorType('File Reading Error');
        setErrorDetails('Failed to read the file. The file may be corrupted or in an unsupported format.');
        setErrorDialogOpen(true);
      };
      
      reader.readAsArrayBuffer(file);
      
      // Reset file input
      if (event.target) {
        event.target.value = '';
      }
    } catch (error: unknown) {
      console.error('Import error:', error);
      setErrorType('Import Error');
      setErrorDetails(error instanceof Error ? error.message : 'Failed to import Excel file. Check the file format.');
      setErrorDialogOpen(true);
    }
  };

  const handleImportAction = (action: ImportAction) => {
    if (importData.length === 0) return;

    try {
      console.log(`Applying import action: ${action} on ${importData.length} items`);
      
      // Get only selected items for import (non-selected items will be filtered out)
      const selectedItems = importData.filter(item => item._selected !== false);
      
      if (selectedItems.length === 0) {
        toast.warning("No items selected for import");
        return;
      }
      
      console.log(`Processing ${selectedItems.length} selected items out of ${importData.length} total items`);
      
      switch (action) {
        case 'append':
          // Add all selected imported data
          console.log(`Appending ${selectedItems.length} selected items to existing data`);
          setData([...data, ...selectedItems]);
          toast.success(`Added ${selectedItems.length} new questions`);
          break;
          
        case 'skip-conflicts':
          // Add only non-duplicate selected items (skip exact duplicates)
          const nonDuplicateItems = selectedItems.filter(item => !item._isDuplicate);
          console.log(`Adding ${nonDuplicateItems.length} non-duplicate selected items, skipping duplicates`);
          setData([...data, ...nonDuplicateItems]);
          toast.success(`Added ${nonDuplicateItems.length} questions, skipped duplicates`);
          break;
          
        case 'replace-conflicts':
          // First identify items with content conflicts
          const itemsWithContentConflicts = selectedItems.filter(item => item._hasConflict);
          
          // Get the questions with conflicts
          const conflictingQuestions = itemsWithContentConflicts.map(item => 
            item.question.toLowerCase().trim()
          );
          
          console.log(`Found ${conflictingQuestions.length} items with content conflicts to replace`);
          
          // Remove items with content conflicts from existing data
          const filteredData = data.filter(item => 
            !conflictingQuestions.includes(item.question.toLowerCase().trim())
          );
          
          console.log(`Removed ${data.length - filteredData.length} conflicting items from existing data`);
          
          // For duplicates, don't add them again
          const nonDuplicateImports = selectedItems.filter(item => !item._isDuplicate);
          
          console.log(`Adding ${nonDuplicateImports.length} non-duplicate selected items after handling conflicts`);
          
          setData([...filteredData, ...nonDuplicateImports]);
          toast.success(`Added ${nonDuplicateImports.length} questions, replaced ${conflictingQuestions.length} conflicting items`);
          break;
      }
      
      console.log('Import action completed successfully');
      
      // API Integration (uncomment when connecting to backend)
      // const apiData = importData.map(({ id, _isDuplicate, _hasConflict, _existingId, _selected, ...rest }) => rest); // Remove client-side data
      // await axios.post(`${API_BASE_URL}/game-content/bulk`, apiData);
      
      // Close the dialog and clear import data
      setImportDialogOpen(false);
      setImportData([]);
      setConflictCount(0);
      setDuplicateCount(0);
    } catch (error: unknown) {
      console.error('Error applying import action:', error);
      setErrorType('Import Processing Error');
      setErrorDetails(error instanceof Error ? error.message : 'Failed to complete the import action. Please try again.');
      setErrorDialogOpen(true);
    }
  };

  return (
    <div className="container mx-auto p-4 py-10">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Game Content</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              className="flex items-center gap-2" 
              onClick={handleImportClick}
              variant="outline"
              size="sm"
            >
              <Download size={16} /> Import Excel
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImport}
              accept=".xlsx, .xls"
              className="hidden"
            />
            <Button 
              className="flex items-center gap-2" 
              onClick={handleExport}
              variant="outline"
              size="sm"
            >
              <Upload size={16} /> Export to Excel
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
          onStatusChange={handleStatusChange}
          meta={{
            onEdit: handleEdit,
            onDelete: handleDelete
          }}
        />
               
        ) : (
          <div className="flex flex-col items-center justify-center h-48 bg-muted/10 rounded-lg border border-dashed">
            <p className="text-muted-foreground mb-2">No game content found</p>
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard/content-creator')}
              className="flex items-center gap-2"
            >
              <Plus size={16} /> Create your first game content
            </Button>
          </div>
        )}
      </div>

      {/* Import Dialog */}
      <GameImportDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        title="Import Game Content"
        description="Review and confirm the game content questions to be imported from Excel."
        importData={importData}
        existingDataCount={data.length}
        conflictCount={conflictCount}
        duplicateCount={duplicateCount}
        onImport={handleImportAction}
        columns={[
          { key: 'question', header: 'Question', width: 300 },
          { key: 'language', header: 'Language' },
          { key: 'category', header: 'Category' },
          { key: 'level', header: 'Level' },
          { key: 'gameType', header: 'Game Type' },
          { key: 'relatedItem', header: 'Related Item' }
        ]}
      />

      {/* Error Dialog */}
      <ErrorDialog
        open={errorDialogOpen}
        onOpenChange={setErrorDialogOpen}
        title="Excel Import Failed"
        description="There was a problem with the Excel file you uploaded."
        errorType={errorType}
        errorDetails={errorDetails}
      />
    </div>
  )
} 