"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react"
// import axios from "axios"
// import { API_BASE_URL } from "@/config/apiConfig"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Combobox } from "@/components/ui/combobox"
import { relatedItems, categories, levels, contentTypes, languages } from "@/lib/data"
import { sampleRouteContent } from "@/lib/sample-data"

const FormSchema = z.object({
  contentName: z.string().nonempty("Content name is required"),
  relatedItem: z.string().nonempty("Please select a related item"),
  contentLanguage: z.string().nonempty("Please select a language"),
  description: z.string().nonempty("Description is required"),
  category: z.string().nonempty("Please select a category"),
  level: z.string().nonempty("Please select a level"),
  type: z.string().nonempty("Please select a type"),
  multimediaContent: z.array(
    z.object({
      text: z.string().refine(
        (url) => url === "" || url.startsWith("http"), 
        { message: "Must be a valid URL or empty" }
      )
    })
  ).optional(),
  websiteURL: z.array(
    z.object({
      text: z.string().refine(
        (url) => url === "" || url.startsWith("http"), 
        { message: "Must be a valid URL or empty" }
      )
    })
  ).optional(),
  additionalInfo: z.string().optional(),
})

export default function RouteContentEdit() {
  const [isLoading, setIsLoading] = useState(false)
  const [routeContentData, setRouteContentData] = useState<any>(null)
  const { id } = useParams()
  const navigate = useNavigate()
  
  // Create dynamic options that include both the standard options and any custom values from the data
  const [dynamicRelatedItems, setDynamicRelatedItems] = useState(relatedItems)
  const [dynamicCategories, setDynamicCategories] = useState(categories)
  const [dynamicLevels, setDynamicLevels] = useState(levels)
  const [dynamicRouteTypes, setDynamicRouteTypes] = useState(contentTypes)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      contentName: "",
      relatedItem: "",
      contentLanguage: "English",
      description: "",
      category: "",
      level: "",
      type: "",
      additionalInfo: "",
      multimediaContent: [{ text: "" }], 
      websiteURL: [{ text: "" }],
    },
  })

  const { fields: multimediaFields, append: addMultimedia, remove: removeMultimedia } = useFieldArray({
    control: form.control,
    name: "multimediaContent",
  })

  const { fields: websiteFields, append: addWebsite, remove: removeWebsite } = useFieldArray({
    control: form.control,
    name: "websiteURL",
  })

  useEffect(() => {
    if (id) {
      fetchRouteContent(id)
    }
  }, [id])

  // Helper function to find or create an option value
  const findOrCreateOption = (value: string, options: any[], setOptions: any) => {
    // First try exact match
    const option = options.find(opt => opt.value === value);
    if (option) return option.value;
    
    // Try case-insensitive match on label
    const caseInsensitiveOption = options.find(
      opt => opt.label.toLowerCase() === value.toLowerCase()
    );
    if (caseInsensitiveOption) return caseInsensitiveOption.value;
    
    // If no match, create a new option
    const newOption = { value, label: value };
    setOptions((prev: any[]) => [...prev, newOption]);
    return value;
  };

  // Update the options when routeContentData changes to include any custom values
  useEffect(() => {
    if (routeContentData) {
      // Add the related item to options if needed
      if (routeContentData.relatedItem) {
        setDynamicRelatedItems(prev => {
          if (!prev.some(item => item.label === routeContentData.relatedItem)) {
            return [...prev, { value: routeContentData.relatedItem, label: routeContentData.relatedItem }];
          }
          return prev;
        });
      }
      
      // Add the category to options if needed
      if (routeContentData.category) {
        setDynamicCategories(prev => {
          if (!prev.some(item => item.label === routeContentData.category)) {
            return [...prev, { value: routeContentData.category, label: routeContentData.category }];
          }
          return prev;
        });
      }
      
      // Add the level to options if needed
      if (routeContentData.level) {
        setDynamicLevels(prev => {
          if (!prev.some(item => item.label === routeContentData.level)) {
            return [...prev, { value: routeContentData.level, label: routeContentData.level }];
          }
          return prev;
        });
      }
      
      // Add the route type to options if needed
      if (routeContentData.type) {
        setDynamicRouteTypes(prev => {
          if (!prev.some(item => item.label === routeContentData.type)) {
            return [...prev, { value: routeContentData.type, label: routeContentData.type }];
          }
          return prev;
        });
      }
    }
  }, [routeContentData]);

  // Update form values when routeContentData changes
  useEffect(() => {
    if (routeContentData) {
      // After a short delay to ensure the options are updated
      setTimeout(() => {
        form.setValue('contentName', routeContentData.contentName || "");
        form.setValue('relatedItem', routeContentData.relatedItem || "");
        form.setValue('contentLanguage', routeContentData.language || "English");
        form.setValue('description', routeContentData.description || "");
        form.setValue('category', routeContentData.category || "");
        form.setValue('level', routeContentData.level || "");
        form.setValue('type', routeContentData.type || "");
        form.setValue('additionalInfo', routeContentData.additionalInfo || "");
        
        // Set multimedia content if available
        if (routeContentData.multimediaContent && routeContentData.multimediaContent.length > 0) {
          form.setValue('multimediaContent', 
            routeContentData.multimediaContent.map((url: string) => ({ text: url }))
          );
        }
        
        // Set website URLs if available
        if (routeContentData.websiteURL && routeContentData.websiteURL.length > 0) {
          form.setValue('websiteURL', 
            routeContentData.websiteURL.map((url: string) => ({ text: url }))
          );
        }
      }, 100);
    }
  }, [routeContentData, form]);

  const fetchRouteContent = async (contentId: string) => {
    try {
      setIsLoading(true)
      
      // For demo purposes, we'll use the sample data
      const routeContent = sampleRouteContent.find(item => item.id === contentId)
      
      if (!routeContent) {
        toast.error('Route content not found')
        navigate('/dashboard/content-creator/Route')
        return
      }
      
      // Store the fetched data in state
      setRouteContentData(routeContent)
      
      // Uncomment for actual API implementation
      // const response = await axios.get(`${API_BASE_URL}/route-content/${contentId}`)
      // setRouteContentData(response.data)
    } catch (error) {
      console.error('Error fetching route content:', error)
      toast.error('Failed to load route content')
    } finally {
      setIsLoading(false)
    }
  }

  function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true)
      
      // Format data for API
      const routeContentData = {
        id: id,
        contentName: values.contentName,
        relatedItem: values.relatedItem,
        language: values.contentLanguage,
        description: values.description,
        category: values.category,
        level: values.level,
        type: values.type,
        additionalInfo: values.additionalInfo,
        multimediaContent: values.multimediaContent?.filter(item => item.text).map(item => item.text) || [],
        websiteURL: values.websiteURL?.filter(item => item.text).map(item => item.text) || []
      }
      
      // For demo purposes
      toast.success('Route content updated successfully')
      
      // Uncomment for actual API implementation
      // await axios.put(`${API_BASE_URL}/route-content/${id}`, routeContentData)
      // toast.success('Route content updated successfully')
      
      // Redirect to route content list
      navigate('/dashboard/content-creator/Route')
    } catch (error) {
      console.error('Error submitting route content:', error)
      toast.error('Failed to update route content')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => navigate('/dashboard/content-creator/Route')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Route Content
        </Button>
        <h1 className="text-3xl font-bold">Edit Route Content</h1>
        <p className="text-muted-foreground mt-2">
          Update route content information below.
        </p>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading route content...</span>
        </div>
      ) : (
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Route Content Details</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Edit the route and related fields for this content.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="contentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter content name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="relatedItem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Related Item</FormLabel>
                      <Combobox
                        options={dynamicRelatedItems}
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        placeholder="Select related item"
                        emptyMessage="No related item found."
                        searchPlaceholder="Search related items..."
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Combobox
                        options={dynamicCategories}
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
                        options={dynamicLevels}
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
              </div>
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Route Type</FormLabel>
                    <Combobox
                      options={dynamicRouteTypes}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select route type"
                      emptyMessage="No route type found."
                      searchPlaceholder="Search route types..."
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <Textarea placeholder="Enter route description" {...field} className="min-h-[100px]" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <FormLabel>Multimedia Content (URLs)</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addMultimedia({ text: "" })}
                    className="flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add URL
                  </Button>
                </div>
                
                {multimediaFields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <FormField
                      control={form.control}
                      name={`multimediaContent.${index}.text`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="https://example.com/image.jpg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {multimediaFields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMultimedia(index)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <FormLabel>Website URLs</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addWebsite({ text: "" })}
                    className="flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add URL
                  </Button>
                </div>
                
                {websiteFields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <FormField
                      control={form.control}
                      name={`websiteURL.${index}.text`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="https://example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {websiteFields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeWebsite(index)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <Textarea placeholder="Enter any additional information" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard/content-creator/Route')}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  )
} 