"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray, useWatch } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react"
// import axios from "axios"
// import { API_BASE_URL } from "@/config/apiConfig"
import { useSelector } from "react-redux";

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
import { relatedItems, categories, levels, contentTypes, languages, answerTypes } from "@/lib/data"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { sampleGameContent } from "@/lib/sample-data"

const FormSchema = z.object({
  relatedItem: z.string().nonempty("Please select a related item"),
  contentLanguage: z.string().nonempty("Please select a language"),
  question: z.string().nonempty("Question is required"),
  answerType: z.enum(["single", "trueFalse"]),
  choices: z.array(z.object({ text: z.string() })).min(2, "At least 2 choices are required"),
  correctAnswerIndex: z.number().min(0, "Please select a correct answer"),
  trueFalseAnswer: z.boolean().optional(),
  clue: z.string().optional(),
  points: z.number(),
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

export default function GameContentEdit() {
  const [isLoading, setIsLoading] = useState(false)
  const [gameContentData, setGameContentData] = useState<any>(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth);
  const rolePath = user?.role === "editor" ? "editor" : "content-creator";
  
  // Create dynamic options that include both the standard options and any custom values from the data
  const [dynamicRelatedItems, setDynamicRelatedItems] = useState(relatedItems)
  const [dynamicCategories, setDynamicCategories] = useState(categories)
  const [dynamicLevels, setDynamicLevels] = useState(levels)
  const [dynamicGameTypes, setDynamicGameTypes] = useState(contentTypes)

  const handleEdit = (id: string) => {
    navigate(`/dashboard/${rolePath}/Game/edit/${id}`);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      relatedItem: "",
      contentLanguage: "English",
      question: "",
      answerType: "single",
      choices: [{ text: "" }, { text: "" }],
      correctAnswerIndex: 0,
      trueFalseAnswer: true,
      clue: "",
      points: 1,
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
  })

  const { fields: multimediaFields, append: addMultimedia, remove: removeMultimedia } = useFieldArray({
    control: form.control,
    name: "multimediaContent",
  })

  const { fields: websiteFields, append: addWebsite, remove: removeWebsite } = useFieldArray({
    control: form.control,
    name: "websiteURL",
  })

  // Watch for changes in the answer type
  const answerType = useWatch({
    control: form.control,
    name: "answerType",
  });

  useEffect(() => {
    if (id) {
      fetchGameContent(id)
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

  // Update the options when gameContentData changes to include any custom values
  useEffect(() => {
    if (gameContentData) {
      // Add the related item to options if needed
      if (gameContentData.relatedItem) {
        setDynamicRelatedItems(prev => {
          if (!prev.some(item => item.label === gameContentData.relatedItem)) {
            return [...prev, { value: gameContentData.relatedItem, label: gameContentData.relatedItem }];
          }
          return prev;
        });
      }
      
      // Add the category to options if needed
      if (gameContentData.category) {
        setDynamicCategories(prev => {
          if (!prev.some(item => item.label === gameContentData.category)) {
            return [...prev, { value: gameContentData.category, label: gameContentData.category }];
          }
          return prev;
        });
      }
      
      // Add the level to options if needed
      if (gameContentData.level) {
        setDynamicLevels(prev => {
          if (!prev.some(item => item.label === gameContentData.level)) {
            return [...prev, { value: gameContentData.level, label: gameContentData.level }];
          }
          return prev;
        });
      }
      
      // Add the game type to options if needed
      if (gameContentData.gameType) {
        setDynamicGameTypes(prev => {
          if (!prev.some(item => item.label === gameContentData.gameType)) {
            return [...prev, { value: gameContentData.gameType, label: gameContentData.gameType }];
          }
          return prev;
        });
      }
    }
  }, [gameContentData]);

  // Update form values when gameContentData changes
  useEffect(() => {
    if (gameContentData) {
      // After a short delay to ensure the options are updated
      setTimeout(() => {
        // For dropdowns, use the actual string values from the data
        // The Combobox component is now enhanced to handle these values
        form.setValue('relatedItem', gameContentData.relatedItem || "");
        form.setValue('contentLanguage', gameContentData.language || "English");
        form.setValue('question', gameContentData.question || "");
        form.setValue('answerType', "single");
        form.setValue('choices', [
          { text: "Option 1" }, 
          { text: "Option 2" },
          { text: "Option 3" },
          { text: "Option 4" }
        ]);
        form.setValue('correctAnswerIndex', 0);
        form.setValue('clue', "");
        form.setValue('points', 1);
        form.setValue('category', gameContentData.category || "");
        form.setValue('level', gameContentData.level || "");
        form.setValue('type', gameContentData.gameType || "");
        form.setValue('additionalInfo', "");
        form.setValue('multimediaContent', [{ text: "" }]);
        form.setValue('websiteURL', [{ text: "" }]);
        
        // Force form to update
        form.trigger();
      }, 300);
    }
  }, [gameContentData, form]);

  const fetchGameContent = async (contentId: string) => {
    try {
      setIsLoading(true)
      
      // For demo purposes, using sample data instead of API
      const gameContent = sampleGameContent.find(item => item.id === contentId)
      
      if (!gameContent) {
        toast.error('Game content not found')
        navigate('/dashboard/content-creator/Game')
        return
      }
      
      // Store the fetched data in state
      setGameContentData(gameContent)
      
      // Uncomment for actual API implementation
      // const response = await axios.get(`${API_BASE_URL}/game-content/${contentId}`)
      // setGameContentData(response.data)
    } catch (error) {
      console.error('Error fetching game content:', error)
      toast.error('Failed to load game content')
    } finally {
      setIsLoading(false)
    }
  }

  function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true)
      
      // Format data for API
      const gameContentData = {
        id: id,
        relatedItem: values.relatedItem,
        language: values.contentLanguage,
        question: values.question,
        answerType: values.answerType,
        choices: values.choices.map(choice => choice.text),
        correctAnswerIndex: values.correctAnswerIndex,
        clue: values.clue,
        points: values.points,
        category: values.category,
        level: values.level,
        gameType: values.type,
        additionalInfo: values.additionalInfo,
        multimediaContent: values.multimediaContent?.filter(item => item.text).map(item => item.text) || [],
        websiteURL: values.websiteURL?.filter(item => item.text).map(item => item.text) || []
      }
      
      // For demo purposes
      toast.success('Game content updated successfully')
      
      // Uncomment for actual API implementation
      // await axios.put(`${API_BASE_URL}/game-content/${id}`, gameContentData)
      // toast.success('Game content updated successfully')
      
      // Redirect to game content list
      navigate('/dashboard/content-creator/Game')
    } catch (error) {
      console.error('Error submitting game content:', error)
      toast.error('Failed to update game content')
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
          onClick={() => navigate('/dashboard/content-creator/Game')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Game Content
        </Button>
        <h1 className="text-3xl font-bold">Edit Game Content</h1>
        <p className="text-muted-foreground mt-2">
          Update game content information below.
        </p>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading game content...</span>
        </div>
      ) : (
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Game Content Details</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Edit the question and related fields for this game content.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>
              
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <Textarea placeholder="Type your question in this field" {...field} className="min-h-[100px]" />
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
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        // Reset choices when switching to trueFalse
                        if (value === "trueFalse") {
                          form.setValue('choices', [{ text: "True" }, { text: "False" }]);
                          form.setValue('correctAnswerIndex', 0); // Default to True
                        }
                      }}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="single" id="single" />
                        <Label htmlFor="single">Multiple Choice</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="trueFalse" id="trueFalse" />
                        <Label htmlFor="trueFalse">True/False</Label>
                      </div>
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {answerType === "single" ? (
                <div className="space-y-4">
                  <FormLabel>Choices</FormLabel>
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center space-x-2">
                      <FormField
                        control={form.control}
                        name={`choices.${index}.text`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <div className="flex items-center">
                                <Input placeholder={`Option ${index + 1}`} {...field} />
                                <div className="ml-2 flex items-center space-x-2">
                                  <FormField
                                    control={form.control}
                                    name="correctAnswerIndex"
                                    render={({ field: radioField }) => (
                                      <FormItem>
                                        <FormControl>
                                          <RadioGroup
                                            onValueChange={(value) => radioField.onChange(parseInt(value))}
                                            defaultValue={radioField.value.toString()}
                                            className="flex"
                                          >
                                            <div className="flex items-center space-x-1">
                                              <RadioGroupItem 
                                                value={index.toString()} 
                                                id={`choice-${index}`} 
                                                checked={radioField.value === index}
                                              />
                                              <Label htmlFor={`choice-${index}`} className="text-sm">Correct</Label>
                                            </div>
                                          </RadioGroup>
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {fields.length > 2 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ text: "" })}
                  >
                    Add Choice
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="trueFalseAnswer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correct Answer</FormLabel>
                        <div className="flex space-x-4">
                          <RadioGroup
                            onValueChange={(value) => {
                              field.onChange(value === "true");
                              form.setValue('correctAnswerIndex', value === "true" ? 0 : 1);
                            }}
                            defaultValue={field.value ? "true" : "false"}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="true" id="answer-true" />
                              <Label htmlFor="answer-true">True</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="false" id="answer-false" />
                              <Label htmlFor="answer-false">False</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Combobox
                        options={dynamicCategories}
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
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
                        onChange={(value) => {
                          field.onChange(value);
                        }}
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
                      <FormLabel>Game Type</FormLabel>
                      <Combobox
                        options={dynamicGameTypes}
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        placeholder="Select type"
                        emptyMessage="No type found."
                        searchPlaceholder="Search types..."
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="clue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clue (Optional)</FormLabel>
                    <Textarea placeholder="Add a clue or hint" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="points"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Points</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information (Optional)</FormLabel>
                    <Textarea placeholder="Add any additional information" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4">
                <FormLabel>Multimedia Content (Optional)</FormLabel>
                {multimediaFields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <FormField
                      control={form.control}
                      name={`multimediaContent.${index}.text`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="https://example.com/media.jpg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {multimediaFields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeMultimedia(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addMultimedia({ text: "" })}
                >
                  Add Multimedia URL
                </Button>
              </div>
              
              <div className="space-y-4">
                <FormLabel>Website URLs (Optional)</FormLabel>
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
                        variant="outline"
                        size="sm"
                        onClick={() => removeWebsite(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addWebsite({ text: "" })}
                >
                  Add Website URL
                </Button>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/dashboard/content-creator/Game')}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Update Game Content
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  )
} 