"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
// import { useState, useEffect } from "react"
// import axios from "axios"
// import { API_BASE_URL } from "@/config/apiConfig"
// import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";
import { relatedItems, categories, levels, contentTypes, languages } from "@/lib/data";
// import { useState } from "react";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from 'ckeditor5';
// import { FormatPainter } from 'ckeditor5-premium-features';

const FormSchema = z.object({
  relatedItem: z.string().nonempty("Please select a related item"),
  contentLanguage: z.string().nonempty("Please select a language"),
  contentName: z.string().nonempty("Type the content name here for route"),
  category: z.string().nonempty("Please select a category"),
  level: z.string().nonempty("Please select a level"),
  type: z.string().nonempty("Please select a type"),
  additionalInfo: z.string().optional(),
  multimediaContent: z.array(
    z.object({
      value: z.string().refine(
        (url) => url === "" || url.startsWith("http"), 
        { message: "Must be a valid URL or empty" }
      )
    })
  ).optional(),
  websiteURL: z.array(
    z.object({
      value: z.string().refine(
        (url) => url === "" || url.startsWith("http"), 
        { message: "Must be a valid URL or empty" }
      )
    })
  ).optional(),
})

const RouteForm = () => {
//   const [editorData, setEditorData] = useState("");
//   const [isLoading, setIsLoading] = useState(false)
//   const [isEditMode, setIsEditMode] = useState(false)
//   const { id } = useParams()
//   const navigate = useNavigate()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      relatedItem: "",
      contentLanguage: "English",
      contentName: "",
      category: "",
      level: "",
      type: "",
      additionalInfo: "",
      multimediaContent: [{ value: "" }], 
      websiteURL: [{ value: "" }],
    },
  })

  const { fields: multimediaFields, append: addMultimedia, remove: removeMultimedia } = useFieldArray({
      control: form.control,
      name: "multimediaContent",
  });
  
  const { fields: websiteFields, append: addWebsite, remove: removeWebsite } = useFieldArray({
      control: form.control,
      name: "websiteURL",
  });
  
  // useEffect(() => {
  //   // Check if we're in edit mode by checking if ID exists in URL params
  //   if (id) {
  //     setIsEditMode(true)
  //     fetchRouteContent(id)
  //   }
  // }, [id])

  // const fetchRouteContent = async (contentId) => {
  //   try {
  //     setIsLoading(true)
  //     const response = await axios.get(`${API_BASE_URL}/route-content/${contentId}`)
  //     const routeContent = response.data
  //     
  //     // Set form values with fetched data
  //     form.reset({
  //       relatedItem: routeContent.relatedItem,
  //       contentLanguage: routeContent.language,
  //       contentName: routeContent.contentName,
  //       category: routeContent.category,
  //       level: routeContent.level,
  //       type: routeContent.type,
  //       additionalInfo: routeContent.additionalInfo,
  //       multimediaContent: routeContent.multimediaContent?.map(url => ({ value: url })) || [{ value: "" }],
  //       websiteURL: routeContent.websiteURL?.map(url => ({ value: url })) || [{ value: "" }],
  //     })
  //   } catch (error) {
  //     console.error('Error fetching route content:', error)
  //     toast.error('Failed to load route content')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }
  
  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log("Form Submitted:", values); 
    console.log("Form Errors:", form.formState.errors); 
    toast("You have created a new route content question!");

    // API Integration code (uncomment when connecting to backend)
    // submitRouteContent(values)
  }

  // const submitRouteContent = async (values) => {
  //   try {
  //     setIsLoading(true)
  //     
  //     // Format data for API
  //     const routeContentData = {
  //       relatedItem: values.relatedItem,
  //       language: values.contentLanguage,
  //       contentName: values.contentName,
  //       category: values.category,
  //       level: values.level,
  //       type: values.type,
  //       additionalInfo: values.additionalInfo,
  //       multimediaContent: values.multimediaContent?.filter(item => item.value).map(item => item.value) || [],
  //       websiteURL: values.websiteURL?.filter(item => item.value).map(item => item.value) || []
  //     }
  //     
  //     // Add author info (from auth state)
  //     // routeContentData.authorId = user.id
  //     
  //     let response
  //     if (isEditMode) {
  //       // Update existing content
  //       response = await axios.put(`${API_BASE_URL}/route-content/${id}`, routeContentData)
  //       toast.success('Route content updated successfully')
  //     } else {
  //       // Create new content
  //       response = await axios.post(`${API_BASE_URL}/route-content`, routeContentData)
  //       toast.success('Route content created successfully')
  //     }
  //     
  //     // Redirect to route content list
  //     navigate('/dashboard/content-creator/Route')
  //   } catch (error) {
  //     console.error('Error submitting route content:', error)
  //     toast.error(isEditMode ? 'Failed to update route content' : 'Failed to create route content')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto space-y-6">
      <FormField
          control={form.control}
          name="relatedItem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Related Item</FormLabel>
              <Combobox
                options={relatedItems}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select related item"
                emptyMessage="No related item found."
                searchPlaceholder="Search related items..."
              />
              <FormMessage />
            </FormItem>
          )}
        />

        
        <FormField
          control={form.control}
          name="contentLanguage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content Language</FormLabel>
              <Combobox
                options={languages}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select language"
                emptyMessage="No language found."
                searchPlaceholder="Search languages..."
              />
              <FormMessage />
            </FormItem>
          )}
        />

       
        <FormField
          control={form.control}
          name="contentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <Textarea placeholder="Type your question in this field" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField 
            control={form.control} 
            name="category" 
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Combobox
                  options={categories}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select category"
                  emptyMessage="No category found."
                  searchPlaceholder="Search categories..."
                />
                <FormMessage />
              </FormItem>
            )} 
          />
          <FormField 
            control={form.control} 
            name="level" 
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <Combobox
                  options={levels}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select level"
                  emptyMessage="No level found."
                  searchPlaceholder="Search levels..."
                />
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
                <Combobox
                  options={contentTypes}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select content type"
                  emptyMessage="No content type found."
                  searchPlaceholder="Search content types..."
                />
                <FormMessage />
              </FormItem>
            )} 
          />
        </div>

        <FormField
            control={form.control}
            name="multimediaContent"
            render={() => (
                <FormItem>
                <FormLabel>Multimedia Content</FormLabel>
                <div className="space-y-3">
                  {multimediaFields.map((field, index) => (
                      <div key={field.id} className="flex flex-wrap md:flex-nowrap gap-2 items-center">
                        <div className="flex-1 min-w-0">
                          <FormControl>
                              <Input {...form.register(`multimediaContent.${index}.value`)} placeholder="Paste multimedia URL" />
                          </FormControl>
                        </div>
                        {multimediaFields.length > 1 && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => removeMultimedia(index)}
                              className="shrink-0"
                            >
                              Remove
                            </Button>
                        )}
                      </div>
                  ))}
                </div>
                <Button onClick={() => addMultimedia({ value: "" })} className="mt-3" size="sm">+ Add Multimedia</Button>
                </FormItem>
            )}
        />

           
        <FormField
            control={form.control}
            name="websiteURL"
            render={() => (
                <FormItem>
                <FormLabel>Website URL</FormLabel>
                <div className="space-y-3">
                  {websiteFields.map((field, index) => (
                      <div key={field.id} className="flex flex-wrap md:flex-nowrap gap-2 items-center">
                        <div className="flex-1 min-w-0">
                          <FormControl>
                              <Input {...form.register(`websiteURL.${index}.value`)} placeholder="Paste website URL" />
                          </FormControl>
                        </div>
                        {websiteFields.length > 1 && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => removeWebsite(index)}
                              className="shrink-0"
                            >
                              Remove
                            </Button>
                        )}
                      </div>
                  ))}
                </div>
                <Button onClick={() => addWebsite({ value: "" })} className="mt-3" size="sm">+ Add Website</Button>
                </FormItem>
            )}
        />
               
       
         
        {/* <div>
          <FormLabel>Add Information</FormLabel>
          <CKEditor
            editor={ ClassicEditor }
            config={ {
                licenseKey: '<YOUR_LICENSE_KEY>', // Or 'GPL'.
                plugins: [ Essentials, Paragraph, Bold, Italic, FormatPainter ],
                toolbar: [ 'undo', 'redo', '|', 'bold', 'italic', '|', 'formatPainter' ],
                initialData: '<p>Hello from CKEditor 5 in React!</p>',
            } }
        />
        </div> */}
    
        <Button type="submit" /* disabled={isLoading} */>
          {/* {isLoading ? 'Saving...' : isEditMode ? 'Update' : 'Submit'} */}
          Submit
        </Button>
      </form>
    </Form>
  )
}
export default RouteForm;
  















