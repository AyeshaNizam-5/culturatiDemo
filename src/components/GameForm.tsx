"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
// import { useState, useEffect } from "react"
// import axios from "axios"
import { API_BASE_URL } from "@/config/apiConfig"
import api from "@/services/api"
import { useParams, useNavigate } from "react-router-dom"
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
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/combobox";
import { relatedItems, categories, levels, contentTypes, languages, answerTypes } from "@/lib/data";
import { useState } from "react"
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
  points: z.coerce.number().min(1, "Points must be at least 1"),
  category: z.string().nonempty("Please select a category"),
  level: z.string().nonempty("Please select a level"),
  type: z.string().nonempty("Please select a type"),
  additionalInfo: z.string().optional(),
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
})

const GameForm = () => {
//   const [editorData, setEditorData] = useState("");
   const [isLoading, setIsLoading] = useState(false)
   const [isEditMode, setIsEditMode] = useState(false)
   const { id } = useParams()
   const navigate = useNavigate()
//   const navigate = useNavigate()

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
      points: "",
      category: "",
      level: "",
      type: "",
      additionalInfo: "",
      multimediaContent: [{ text: "" }], 
      websiteURL: [{ text: "" }],
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

  // useEffect(() => {
  //   // Check if we're in edit mode by checking if ID exists in URL params
  //   if (id) {
  //     setIsEditMode(true)
  //     fetchGameContent(id)
  //   }
  // }, [id])

  // const fetchGameContent = async (contentId) => {
  //   try {
  //     setIsLoading(true)
  //     const response = await axios.get(`${API_BASE_URL}/game-content/${contentId}`)
  //     const gameContent = response.data
  //     
  //     // Set form values with fetched data
  //     form.reset({
  //       relatedItem: gameContent.relatedItem,
  //       contentLanguage: gameContent.language,
  //       question: gameContent.question,
  //       answerType: gameContent.answerType,
  //       choices: gameContent.choices.map(choice => ({ text: choice })),
  //       correctAnswerIndex: gameContent.correctAnswerIndex,
  //       clue: gameContent.clue,
  //       points: gameContent.points,
  //       category: gameContent.category,
  //       level: gameContent.level,
  //       type: gameContent.gameType,
  //       additionalInfo: gameContent.additionalInfo,
  //       multimediaContent: gameContent.multimediaContent?.map(url => ({ text: url })) || [{ text: "" }],
  //       websiteURL: gameContent.websiteURL?.map(url => ({ text: url })) || [{ text: "" }],
  //     })
  //   } catch (error) {
  //     console.error('Error fetching game content:', error)
  //     toast.error('Failed to load game content')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log("Form Submitted:", values); 
    console.log("Form Errors:", form.formState.errors); 
    toast("You have created a new game content question!");

    // API Integration code (uncomment when connecting to backend)
    submitGameContent(values)
  }

  const submitGameContent = async (values) => {
    try {
      setIsEditMode(false)
      setIsLoading(true)
      // Format data for API
      const gameContentData = {
        relatedItem: values.relatedItem,
        language: values.contentLanguage,
        question: values.question,
        answerType: values.answerType,
        multipleChoiceOptions: values.choices.map(choice => choice.text),
        correctAnswerIndex: values.correctAnswerIndex,
        clue: values.clue,
        points: values.points,
        category: values.category,
        level: values.level,
        type: values.type,
        additionalInfo: values.additionalInfo,
        multimediaContent: values.multimediaContent?.filter(item => item.text).map(item => item.text) || [],
        websiteURL: values.websiteURL?.filter(item => item.text).map(item => item.text) || []
      }
      
      // Add author info (from auth state)
      // gameContentData.authorId = user.id
      
      let response;
      if (isEditMode) {
        // Update existing content
        response = await api.put(`${API_BASE_URL}/game-content/${id}`, gameContentData)
        toast.success('Game content updated successfully')
      } else {
        // Create new content
        response = await api.post(`${API_BASE_URL}/tenant/game-content`, gameContentData)
        toast.success('Game content created successfully')
      }
      
      // Redirect to game content list
      navigate('/dashboard/content-creator/Game')
    } catch (error) {
      console.error('Error submitting game content:', error)
      toast.error(isEditMode ? 'Failed to update game content' : 'Failed to create game content')
    } finally {
      setIsLoading(false)
    }
  }

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
              <Combobox
                options={answerTypes}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select answer type"
                emptyMessage="No answer type found."
                searchPlaceholder="Search answer types..."
              />
              <FormMessage />
            </FormItem>
          )}
        />

     
        <div>
          <FormLabel className="block mb-2">Answer Choices</FormLabel>
          <div className="space-y-3">
            {fields.map((choice, index) => (
              <div key={choice.id} className="flex flex-wrap md:flex-nowrap gap-2 items-center">
                <div className="flex items-center mr-2">
                  <input 
                    type="radio" 
                    name="correctAnswerIndex" 
                    className="mr-2 h-4 w-4"
                    onChange={() => form.setValue("correctAnswerIndex", index)} 
                  />
                  <span className="text-sm whitespace-nowrap">Choice {index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <Input {...form.register(`choices.${index}.text`)} placeholder={`Enter choice text`} />
                </div>
                {fields.length > 2 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => remove(index)}
                    className="shrink-0"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button onClick={() => append({ text: "" })} className="mt-3" size="sm">Add Choice</Button>
        </div>

        
        <FormField control={form.control} name="clue" render={({ field }) => <FormItem><FormLabel>Clue</FormLabel><Input placeholder="Write the clue here" {...field} /></FormItem>} />
        <FormField control={form.control} name="points" render={({ field }) => <FormItem><FormLabel>Points</FormLabel><Input type="number" placeholder="Enter points" min={0} {...field} /></FormItem>} />

       
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
                              <Input {...form.register(`multimediaContent.${index}.text`)} placeholder="Paste multimedia URL" />
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
                <Button onClick={() => addMultimedia({ text: "" })} className="mt-3" size="sm">+ Add Multimedia</Button>
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
                              <Input {...form.register(`websiteURL.${index}.text`)} placeholder="Paste website URL" />
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
                <Button onClick={() => addWebsite({ text: "" })} className="mt-3" size="sm">+ Add Website</Button>
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
export default GameForm;
  















