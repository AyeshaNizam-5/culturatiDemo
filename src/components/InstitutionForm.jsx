"use client"

import React, { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
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
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const institutionTypes = [
  { label: "Museum", value: "Museum" },
  { label: "Heritage Site", value: "Heritage Site" },
  { label: "Castle", value: "Castle" },
  { label: "Art Gallery", value: "Art Gallery" },
  { label: "Theater", value: "Theater" },
  { label: "Cultural Center", value: "Cultural Center" },
]

const FormSchema = z.object({
  institutionName: z.string().min(1, "Institution Name is required"),
  institutionCode: z.string().min(1, "Institution Code is required"),
  type: z.string().min(1, "Institution Type is required"),
  address: z.string().optional(),
  about: z.string().optional(),
  logo: z.any().optional(),
  image: z.any().optional(),
  funFacts: z.array(z.object({ text: z.string().min(0) })).optional(),
})

const InstitutionForm = ({ institution, onClose, onSubmit }) => {
  const [showOptions, setShowOptions] = useState(false)
  console.log("InstitutionForm", institution)
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      institutionName: institution?.institutionName || "",
      institutionCode: institution?.institutionCode || "",
      type: institution?.institutionType || "",
      address: institution?.address || "",
      about: institution?.about || "",
      logo: null,
      image: null,
      funFacts: institution?.funFacts || [{ text: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "funFacts",
  })

  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      logo: form.watch("logo"),
      image: form.watch("image"),
    }

    onSubmit(payload)
    toast.success(institution ? "Institution updated" : "Institution created")
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white text-[#0b6085] overflow-auto max-h-screen">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 p-4 md:p-6">
            <h2 className="text-2xl font-bold">
              {institution ? "Edit Cultural Institution" : "Add Cultural Institution"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <FormItem className="relative">
                    <FormLabel>Institution Type</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g., Museum"
                          onFocus={() => setShowOptions(true)}
                          onBlur={() => setTimeout(() => setShowOptions(false), 150)}
                        />
                      </FormControl>
                      {showOptions && (
                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-60 overflow-auto">
                          {institutionTypes
                            .filter(opt =>
                              opt.label.toLowerCase().includes(field.value.toLowerCase())
                            )
                            .map(opt => (
                              <div
                                key={opt.value}
                                onMouseDown={() => field.onChange(opt.value)}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              >
                                {opt.label}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 History Ave, City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the institution..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Fun Facts</FormLabel>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 mt-2">
                  <Input {...form.register(`funFacts.${index}.text`)} placeholder={`Fun fact #${index + 1}`} />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                className="mt-2"
                onClick={() => append({ text: "" })}
              >
                + Add Fun Fact
              </Button>
            </div>

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
                      onChange={(e) => onChange(e.target.files?.[0])}
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
                      onChange={(e) => onChange(e.target.files?.[0])}
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
