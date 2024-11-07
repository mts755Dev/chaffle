'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import RichTextEditor from '@/components/shared/richTextEditor';
import { toast } from '@/components/ui/use-toast';
import { updateForm } from '@/serverActions';
import { useStateProvider } from '@/providers';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const quillClassName = 'h-48 pb-10';

type States = {
  id: number;
  name: string;
  abbreviation: string;
  capital: string;
  largest_city: string;
  population: number;
  area_sq_miles: number;
  time_zone: string;
};

type Props = {
  formData: {
    id: string;
    title: string;
    missionStatement: string;
    charityInfo: string;
    donationAmountInformation: string;
    rules: string;
    drawDate: string;
    raffleLocation: string;
  };
};

export const DonationEditForm = ({
  formData: { charityInfo, rules, title, id, drawDate, raffleLocation },
}: Props) => {
  const [usStates, setUsStates] = useState<States[]>([]);

  const fetchStates = useCallback(async () => {
    try {
      const response = await fetch(`https://freetestapi.com/api/v1/us-states`);
      const data = await response.json();

      setUsStates(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  const { dispatch } = useStateProvider();

  const formSchema = z
    .object({
      title: z.string().min(5, {
        message: 'Minimum content length is 5',
      }),

      charityInfo: z.string().min(5, {
        message: 'Minimum content length is 5',
      }),

      rules: z.string().min(5, {
        message: 'Minimum content length is 5',
      }),
      drawDate: z
        .string()
        .date('Should be a valid date')
        .refine((date) => new Date(date) >= new Date(), {
          message: 'Should be a valid future date',
        }),

      locationState: z.string(),
    })
    .required();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title ?? '',
      charityInfo: charityInfo ?? '',
      rules: rules ?? '',
      drawDate: drawDate ?? '',
      locationState: raffleLocation ?? '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const form = await updateForm({
        charity_info: data.charityInfo,
        title: data.title,
        rules: data.rules,
        draw_date: data.drawDate,
        raffleLocation: data.locationState,
        id,
      });

      dispatch({
        type: 'update',
        payload: form,
        reducer: 'raffles',
      });

      toast({
        title: 'Updated',
      });
    } catch (error: any) {
      toast({
        title: 'Failed',
        description: error?.message ?? '',
        variant: 'destructive',
      });
    }
  }

  async function createFreeTicket() {
    window.navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL}/ticket/free/${id}`
    );
    toast({ title: 'Link copied to your clipboard' });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-10 lg:space-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input className="text-black" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-5 items-center">
          <FormField
            control={form.control}
            name="drawDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Draw Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    min={new Date().toDateString()}
                    className="text-black"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="locationState"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raffle Location</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a state where raffle is going to be placed" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {usStates?.map((item, index) => (
                      <SelectItem key={index} value={item.name}>
                        {item.name} {item.abbreviation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="charityInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Raffle Info</FormLabel>
              <FormControl>
                <RichTextEditor {...field} className={quillClassName} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button type="button" onClick={createFreeTicket}>
            Generate a free ticket link
          </Button>
        </div>

        <FormField
          control={form.control}
          name="rules"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rules and Regulation</FormLabel>
              <FormControl>
                <RichTextEditor {...field} className={quillClassName} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="max-w-max" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
