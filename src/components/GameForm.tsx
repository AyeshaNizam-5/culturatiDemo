"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
// import { useState } from "react";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from 'ckeditor5';
// import { FormatPainter } from 'ckeditor5-premium-features';

const FormSchema = z.object({
  relatedItem: z.string().nonempty("Please select a related item"),
  contentLanguage: z.string().nonempty("Please select a language"),
  question: z.string().nonempty("Question is required"),
  answerType: z.enum(["single", "trueFalse"]),
  choices: z.array(z.object({ text: z.string() })).min(2, "At least 2 choices are required"),
  correctAnswerIndex: z.number().min(0, "Please select a correct answer"),
  clue: z.string().optional(),
  points: z.number(),
  category: z.string().nonempty("Please select a category"),
  level: z.string().nonempty("Please select a level"),
  type: z.string().nonempty("Please select a type"),
  additionalInfo: z.string().optional(),
  multimediaContent: z.array(z.object({ value: z.string().url("Enter a valid URL") })).default([]),
  websiteURL: z.array(z.object({ value: z.string().url("Enter a valid URL") })).default([]),
})

const GameForm = () => {
//   const [editorData, setEditorData] = useState("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      relatedItem: "",
      contentLanguage: "English",
      question: "",
      answerType: "single",
      choices: [{ text: "" }, { text: "" }],
      correctAnswerIndex: 0,
      clue: "",
      points: 1,
      category: "",
      level: "",
      type: "",
      additionalInfo: "",
      multimediaContent: [{ value: "" }], 
      websiteURL: [{ value: "" }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "choices",
  });

  const { fields: multimediaFields, append: addMultimedia, remove: removeMultimedia } = useFieldArray({
    control: form.control,
    name: "multimediaContent",
  });

  const { fields: websiteFields, append: addWebsite, remove: removeWebsite } = useFieldArray({
    control: form.control,
    name: "websiteURL",
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log("Form Submitted:", values); 
    console.log("Form Errors:", form.formState.errors); 
    toast("You have created a new game content question!");
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
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <Textarea placeholder="Type your question in this field" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

       
        <FormField
          control={form.control}
          name="answerType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger><SelectValue placeholder="Select answer type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single answer MCQ</SelectItem>
                  <SelectItem value="trueFalse">True or False</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

     
        <div>
          <FormLabel>Answer Choices</FormLabel>
          {fields.map((choice, index) => (
            <div key={choice.id} className="flex gap-4 items-center">
              <input type="radio" name="correctAnswerIndex" onChange={() => form.setValue("correctAnswerIndex", index)} />
              <Input {...form.register(`choices.${index}.text`)} placeholder={`Choice ${index + 1}`} />
              {fields.length > 2 && <Button  onClick={() => remove(index)}>Remove</Button>}
            </div>
          ))}
          <Button onClick={() => append({ text: "" })} className="mt-2">Add Choice</Button>
        </div>

        
        <FormField control={form.control} name="clue" render={({ field }) => <FormItem><FormLabel>Clue</FormLabel><Input placeholder="Write the clue here" {...field} /></FormItem>} />
        <FormField control={form.control} name="points" render={({ field }) => <FormItem><FormLabel>Points</FormLabel><Input type="number" placeholder="Enter points" min={1} {...field} /></FormItem>} />

       
        <div className="flex gap-4 overflow-auto">
          <FormField control={form.control} name="category" render={({ field }) => <FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger><SelectContent><SelectItem value="cat1">Category 1</SelectItem></SelectContent></Select></FormItem>} />
          <FormField control={form.control} name="level" render={({ field }) => <FormItem><FormLabel>Level</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger><SelectContent><SelectItem value="level1">Level 1</SelectItem></SelectContent></Select></FormItem>} />
          <FormField control={form.control} name="type" render={({ field }) => <FormItem><FormLabel>Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue placeholder="Type of game" /></SelectTrigger><SelectContent><SelectItem value="type1">Type 1</SelectItem></SelectContent></Select></FormItem>} />
        </div>

                
               
        <FormField
            control={form.control}
            name="multimediaContent"
            render={() => (
                <FormItem>
                <FormLabel>Multimedia Content</FormLabel>
                {multimediaFields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-center">
                    <FormControl>
                        <Input {...form.register(`multimediaContent.${index}.value`)} placeholder="Paste multimedia URL" />
                    </FormControl>
                    {multimediaFields.length > 1 && (
                        <Button onClick={() => removeMultimedia(index)}>Remove</Button>
                    )}
                    </div>
                ))}
                <Button onClick={() => addMultimedia({ value: "" })} className="mt-2">+ Add Multimedia</Button>
                </FormItem>
            )}
        />

           
        <FormField
            control={form.control}
            name="websiteURL"
            render={() => (
                <FormItem>
                <FormLabel>Website URL</FormLabel>
                {websiteFields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-center">
                    <FormControl>
                        <Input {...form.register(`websiteURL.${index}.value`)} placeholder="Paste website URL" />
                    </FormControl>
                    {websiteFields.length > 1 && (
                        <Button onClick={() => removeWebsite(index)}>Remove</Button>
                    )}
                    </div>
                ))}
                <Button onClick={() => addWebsite({ value: "" })} className="mt-2">+ Add Website</Button>
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
    
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
export default GameForm;
  















