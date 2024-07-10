import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "./ContactUs.css";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  userName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  userEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  userMobile: z.string().min(10, {
    message: "Mobile number must be at least 10 digits.",
  }),
  comment: z.string().min(5, {
    message: "Comment must be at least 5 characters.",
  }),
});

const ContactUs = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userName: "",
      userEmail: "",
      userMobile: "",
      comment: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div className=" bg-black p-8 text-white rounded-lg">
      <div className="flex justify-center items-center">
        <hr className="border border-orange-500 w-full" />
        <h1 className="text-center text-5xl font-extrabold mx-4">Contact Us</h1>
        <hr className="border border-orange-500 w-full" />
      </div>
      <div className="md:flex justify-center items-center">
        <div className="loader flex-1 my-8">
          <div className="modelViewPort">
            <div className="eva">
              <div className="head">
                <div className="eyeChamber">
                  <div className="eye"></div>
                  <div className="eye"></div>
                </div>
              </div>
              <div className="body">
                <div className="hand"></div>
                <div className="hand"></div>
                <div className="scannerThing"></div>
                <div className="scannerOrigin"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 md:p-8 w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" space-y-6 "
            >
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userMobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Mobile</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your mobile number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea
                        className="text-black"
                        placeholder="Enter your comment"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-[#F14902] hover:bg-orange-700 text-white text-xl font-bold py-3 px-8 rounded-lg animate-pulse border "
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
