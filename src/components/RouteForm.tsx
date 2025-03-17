"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
})

const RouteForm = () => {
//   const [editorData, setEditorData] = useState("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      relatedItem: "",
      contentLanguage: "English",
      contentName: "",
      category: "",
      level: "",
      type: "",
    },
  })
  
  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log("Form Submitted:", values); 
    console.log("Form Errors:", form.formState.errors); 
    toast("You have created a new route content question!");
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
      <FormField
          control={form.control}
          name="relatedItem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Related Item</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger><SelectValue placeholder="Select the option" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="item1">Item 1</SelectItem>
                  <SelectItem value="item2">Item 2</SelectItem>
                </SelectContent>
              </Select>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger><SelectValue placeholder="Select language" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Turkish">Turkish</SelectItem>
                </SelectContent>
              </Select>
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

       
        <div className="flex gap-4 overflow-auto">
          <FormField control={form.control} name="category" render={({ field }) => <FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger><SelectContent><SelectItem value="cat1">Category 1</SelectItem></SelectContent></Select><FormMessage /></FormItem>} />
          <FormField control={form.control} name="level" render={({ field }) => <FormItem><FormLabel>Level</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger><SelectContent><SelectItem value="level1">Level 1</SelectItem></SelectContent></Select><FormMessage /></FormItem>} />
          <FormField control={form.control} name="type" render={({ field }) => <FormItem><FormLabel>Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue placeholder="Type of game" /></SelectTrigger><SelectContent><SelectItem value="type1">Type 1</SelectItem></SelectContent></Select><FormMessage /></FormItem>} />
        </div>

                
               
       
         
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
    
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
export default RouteForm;
  















