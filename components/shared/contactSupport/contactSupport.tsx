'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { sendEmail } from '@/serverActions';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const ContactSupport = () => {
  const formSchema = z.object({
    name: z.string().min(2, {
      message: 'A name should be of minimum 2 letters',
    }),
    email: z.string().email({ message: 'Please provide a valid email' }),
    subject: z.string().min(5, {
      message: 'Subject length should be more than 5',
    }),
    message: z.string().min(5, {
      message: 'Message length should be more than 5',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const messageId = await sendEmail({
        email: process.env.NEXT_PUBLIC_ADMIN_EMAIL!,
        body: `
        Name: ${data.name}
        Email: ${data.email}
        Subject: ${data.subject}
        Body: ${data.message}
        `,
        subject: `Chaffle Support`,
      });

      if (!messageId) throw new Error('Message delivery failed');

      toast({
        title: "Your message has been recorded. We'll get back to you soon",
      });

      form.reset();
    } catch (error) {
      toast({
        title: 'Sorry! Failed to deliver your message',
      });
    }
  }

  return (
    <Form {...form}>
      <form
        className="w-full lg:w-1/2 flex flex-col space-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <p className="text-primary text-4xl font-semibold text-center">
          Tell Us What&apos;s On Your Mind
        </p>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className="text-black"
                  placeholder="John Doe"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="text-black"
                  placeholder="johndoe@gmail.com"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input
                  className="text-black"
                  placeholder="What's going on"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  className="text-black"
                  rows={7}
                  placeholder="How can we help you?"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="bg-primary" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
