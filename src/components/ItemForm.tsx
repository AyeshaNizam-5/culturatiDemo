// components/ItemForm.tsx
"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

const ItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  location: z.string().optional(),
  description: z.string().optional(),
  image: z.any().optional()
})

export type ItemFormType = z.infer<typeof ItemSchema>

interface ItemFormProps {
  initialData?: ItemFormType
  onSubmit: (data: ItemFormType) => void
  onClose: () => void
}

export const ItemForm: React.FC<ItemFormProps> = ({ initialData, onSubmit, onClose }) => {
  const form = useForm<ItemFormType>({
    resolver: zodResolver(ItemSchema),
    defaultValues: initialData || {
      name: "",
      code: "",
      location: "",
      description: "",
      image: undefined
    }
  })

  const handleSubmit = (data: ItemFormType) => {
    onSubmit(data)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-xl p-6 border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#0b6085]">
            {initialData ? "Edit" : "Create"} Item
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField name="name" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl><Input {...field} placeholder="Item name" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="code" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Item Code</FormLabel>
                <FormControl><Input {...field} placeholder="Unique item code" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="location" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl><Input {...field} placeholder="e.g. Storage Room A" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="description" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl><Textarea {...field} placeholder="Describe this item" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="image" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input type="file" onChange={(e) => field.onChange(e.target.files?.[0])} />
                </FormControl>
              </FormItem>
            )} />
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit">{initialData ? "Update" : "Create"}</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
