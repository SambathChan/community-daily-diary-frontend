import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "./ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea, TextareaProps } from "./ui/textarea";
import { Input, InputProps } from "./ui/input";
import { IPost } from "../models";
import { createPost } from "../services/postService";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { useContext, useState } from "react";
import { GlobalContext } from "@/AppContext";

const FormSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  body: z.string().min(15, {
    message: "Body must be at least 15 characters.",
  })
});

function CreatePost() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateError } = useContext(GlobalContext);
  // For use with controlled component
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      body: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const postData: IPost = { ...data };
    // Change to controlled component data
    postData.title = title;
    postData.body = body;

    try {
      const createdPost = await createPost(postData);
      if (createdPost) {
        form.reset();

        toast({
          description: "Post created successfully!"
        });

        navigate(`/`);
      }
    } catch (error) {
      updateError((error as Error).message);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
      //set value for validation
      form.setValue('title', e.target.value);
    } else if (e.target.name === 'body') {
      setBody(e.target.value);
      //set value for validation
      form.setValue('body', e.target.value);
    }
  };

  return (
    <div className="my-5 mx-0 sm:mx-auto">
      <Card className="p-2 sm:w-[600px] lg:w-[750px]">
        <CardHeader>
          <CardTitle className="leading-8">Create Post</CardTitle>
          <CardDescription>

          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
              <div>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }: { field: InputProps; }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input autoFocus placeholder="Enter title" {...field} onChange={onChange} value={title} />
                      </FormControl>
                      <FormDescription>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }: { field: TextareaProps; }) => (
                    <FormItem>
                      <FormLabel>Body</FormLabel>
                      <FormControl>
                        <Textarea rows={6} placeholder="Enter body" {...field} onChange={onChange} value={body} />
                      </FormControl>
                      <FormDescription>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export { CreatePost };
