"use client";

import React, { useState } from "react";
import { X, Pencil, Upload } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Zod schema
const institutionSchema = z.object({
  institutionName: z.string().min(1, "Name is required"),
  institutionCode: z.string().min(1, "Code is required"),
  type: z.string().min(1, "Type is required"),
  address: z.string().optional(),
  about: z.string().optional(),
  logo: z.any().optional(),
  image: z.any().optional(),
  funFacts: z.array(z.object({ text: z.string().min(1) })),
});

type InstitutionFormType = z.infer<typeof institutionSchema>;

// Mock data
const initialMockData: InstitutionFormType = {
  institutionName: "National Museum of History",
  institutionCode: "NMH001",
  type: "Museum",
  about:
    "The National Museum of History houses a vast collection of artifacts that span centuries of human civilization.",
  address: "123 History Ave, Oldtown, Country",
  logo: "https://placehold.co/150x150",
  image: "https://placehold.co/800x400",
  funFacts: [{ text: "Founded in 1901" }, { text: "Over 1 million artifacts" }],
};

const AboutInstitution = () => {
  const [institution, setInstitution] = useState(initialMockData);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<InstitutionFormType>({
    resolver: zodResolver(institutionSchema),
    defaultValues: institution,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "funFacts",
  });

  const handleSubmit = (values: InstitutionFormType) => {
    setInstitution({
      ...values,
      logo:
        typeof values.logo === "string"
          ? values.logo
          : values.logo instanceof File
          ? URL.createObjectURL(values.logo)
          : institution.logo,
      image:
        typeof values.image === "string"
          ? values.image
          : values.image instanceof File
          ? URL.createObjectURL(values.image)
          : institution.image,
    });
    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Display Section */}
      {!isEditing && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#0b6085]">Institution Info</h1>
            <Button onClick={() => setIsEditing(true)} className="flex gap-2">
              <Pencil size={18} /> Edit Info
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-[#0b6085]">Name:</p>
              <p className="text-[#6193a9]">{institution.institutionName}</p>
            </div>
            <div>
              <p className="font-semibold text-[#0b6085]">Code:</p>
              <p className="text-[#6193a9]">{institution.institutionCode}</p>
            </div>
            <div>
              <p className="font-semibold text-[#0b6085]">Type:</p>
              <p className="text-[#6193a9]">{institution.type}</p>
            </div>
            <div>
              <p className="font-semibold text-[#0b6085]">Address:</p>
              <p className="text-[#6193a9]">{institution.address}</p>
            </div>
          </div>

          <div>
            <p className="font-semibold text-[#0b6085]">About:</p>
            <p className="text-[#6193a9]">{institution.about}</p>
          </div>

          <div>
            <p className="font-semibold text-[#0b6085] mb-1">Fun Facts:</p>
            <ul className="list-disc list-inside text-[#6193a9]">
              {institution.funFacts.map((fact, idx) => (
                <li key={idx}>{fact.text}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-6 mt-4">
            <img
              src={institution.logo}
              alt="Logo"
              className="w-24 h-24 object-cover rounded-lg border"
            />
            <img
              src={institution.image}
              alt="Cover"
              className="w-64 h-32 object-cover rounded-lg border"
            />
          </div>
        </div>
      )}

      {/* Modal Form */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-4 overflow-auto">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative">
            <button onClick={() => setIsEditing(false)} className="absolute top-4 right-4">
              <X />
            </button>
            <h2 className="text-xl font-bold mb-4 text-[#0b6085]">Edit Institution</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="institutionName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Institution Name" {...field} />
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
                        <FormLabel>Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Institution Code" {...field} />
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
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input placeholder="Type" {...field} />
                        </FormControl>
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
                          <Input placeholder="Address" {...field} />
                        </FormControl>
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
                        <Textarea placeholder="About the institution..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Fun Facts</FormLabel>
                  {fields.map((fact, index) => (
                    <div key={fact.id} className="flex gap-2 mt-2">
                      <Input {...form.register(`funFacts.${index}.text`)} />
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutInstitution;
