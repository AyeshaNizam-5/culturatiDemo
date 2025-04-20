import { useState } from "react"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { ItemForm, ItemFormType } from "@/components/ItemForm"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

const mockItems = [
  { id: "1", name: "Painting", code: "ART-001", location: "Gallery A", description: "Classic artwork" },
  { id: "2", name: "Statue", code: "HIST-002", location: "Exhibit B", description: "Historic sculpture" }
]

type Item = {
    id: string
    name: string
    code: string
    location: string
    description: string
  }
  

export default function Items() {
  const [items, setItems] = useState(mockItems)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ItemFormType | null>(null)
  const [search, setSearch] = useState("")

  const handleAdd = () => {
    setEditingItem(null)
    setIsFormOpen(true)
  }

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setIsFormOpen(true)
  }
  const closeForm = () => {
    setIsFormOpen(false)
    setEditingItem(null)
  }
  

  const handleSubmit = (data: ItemFormType) => {
    const completeData = {
      ...data,
      location: data.location ?? '',
      description: data.description ?? '',
    }
  
    if (editingItem) {
      setItems((prev) =>
        prev.map((item) =>
          item.code === editingItem.code
            ? { ...item, ...completeData }
            : item
        )
      )
      toast.success("Item updated successfully")
    } else {
      const newItem: Item = {
        id: Date.now().toString(),
        ...completeData
      }
      setItems((prev) => [...prev, newItem])
      toast.success("Item added successfully")
    }
  
    setIsFormOpen(false)
  }
  

  const handleDelete = (code: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setItems((prev) => prev.filter((item) => item.code !== code))
      toast.success("Item deleted")
    }
  }

  const filteredItems = items.filter((item) =>
    `${item.name} ${item.code}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#0b6085]">Items</h1>
          <p className="text-[#6193a9]">Manage your cultural items</p>
        </div>
        <Button onClick={handleAdd} className="flex gap-2">
          <Plus size={18} /> Add Item
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6193a9]" size={20} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or code..."
          className="w-full pl-10 pr-4 py-2.5 bg-[#eff8fb] rounded-lg text-[#0b6085] border border-[#cde4ed]
                     placeholder:text-[#88b8c4] focus:outline-none focus:ring-2 focus:ring-[#5ec5f1]"
        />
      </div>

      <div className="overflow-hidden border border-[#cde4ed] rounded-lg">
        <table className="w-full text-left">
          <thead className="bg-[#eff8fb]">
            <tr>
              <th className="p-3 text-sm font-semibold text-[#0b6085]">Name</th>
              <th className="p-3 text-sm font-semibold text-[#0b6085]">Code</th>
              <th className="p-3 text-sm font-semibold text-[#0b6085]">Location</th>
              <th className="p-3 text-sm font-semibold text-[#0b6085]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td className="p-3 text-[#0b6085]">{item.name}</td>
                <td className="p-3 text-[#6193a9]">{item.code}</td>
                <td className="p-3 text-[#6193a9]">{item.location}</td>
                <td className="p-3 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                    <Pencil size={16} />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.code)}>
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <ItemForm
        initialData={editingItem || undefined}
        onSubmit={handleSubmit}
        onClose={closeForm}
      />
      )}
    </div>
  )
}
