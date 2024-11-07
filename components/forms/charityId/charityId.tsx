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
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { getDonationFormById } from '@/serverActions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const CharityId = () => {
  const router = useRouter();

  const formSchema = z.object({
    charityId: z.string().uuid({
      message: 'Please enter valid charity Id',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      charityId: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const raffle = await getDonationFormById(values.charityId);

      if (!raffle?.id || new Date(raffle.draw_date!) < new Date()) {
        toast({
          title: 'Raffle against this id does not exists',
        });

        return;
      }
      return router.push(`/donation/${values.charityId}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full lg:w-1/2 flex flex-col space-y-3"
      >
        <FormField
          control={form.control}
          name="charityId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Charity ID</FormLabel>
              <FormControl>
                <Textarea
                  className="text-black"
                  rows={7}
                  placeholder="Enter unique charity ID here"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-black" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
