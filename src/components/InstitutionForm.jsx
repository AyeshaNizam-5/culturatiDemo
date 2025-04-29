
import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Combobox } from "@/components/ui/combobox"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const institutionTypes = [
  { label: "Museum", value: "Museum" },
  { label: "Heritage Site", value: "Heritage Site" },
  { label: "Castle", value: "Castle" },
  { label: "Art Gallery", value: "Art Gallery" },
  { label: "Theater", value: "Theater" },
  { label: "Cultural Center", value: "Cultural Center" }
]


const FormSchema = z.object({
  institutionName: z.string().min(1, "Institution Name is required"),
  institutionCode: z.string().min(1, "Institution Code is required"),
  type: z.string().min(1, "Institution Type is required"),
  logo: z.any().optional(),
  image: z.any().optional(),
})

const InstitutionForm = ({ institution, onClose, onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      institutionName: institution?.institutionName || "",
      institutionCode: institution?.institutionCode || "",
      type: institution?.type || "",
      logo: null,
      image: null,
    },
  })

  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      logo: form.watch("logo"),
      image: form.watch("image"),
    }

    onSubmit(payload)
    toast.success(institution ? "Institution updated" : "Institution created")

    // Uncomment and connect to backend later:
    // try {
    //   const formData = new FormData()
    //   formData.append("institutionName", values.institutionName)
    //   formData.append("institutionCode", values.institutionCode)
    //   formData.append("type", values.type)
    //   if (values.logo) formData.append("logo", values.logo)
    //   if (values.image) formData.append("image", values.image)
    //
    //   const response = await axios.post("/api/institutions", formData)
    //   toast.success("Institution saved successfully")
    // } catch (err) {
    //   toast.error("Failed to save institution")
    // }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white text-[#0b6085]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 p-4 md:p-6"
          >
            <h2 className="text-2xl font-bold">
              {institution ? "Edit Cultural Institution" : "Add Cultural Institution"}
            </h2>

            <FormField
              control={form.control}
              name="institutionName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., National Museum of History" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="institutionCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution Code</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., NMH001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution Type</FormLabel>
                  <Combobox
                    options={institutionTypes}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select or type institution type"
                    emptyMessage="No institution type found."
                    searchPlaceholder="Search institution types..."
                  />

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>Logo (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => onChange(e.target.files[0])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>Cover Image (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => onChange(e.target.files[0])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {institution ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default InstitutionForm
