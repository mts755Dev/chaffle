'use client';

import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
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
import { createTicket, getTicketWhere, getUserIp } from '@/serverActions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import PhoneInput from 'react-phone-number-input/react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { isValidLocationState } from '@/lib/locationHelper';

type Props = {
  raffleId: string;
  locationCode?: string;
};

export const FreeTicket = ({ raffleId, locationCode }: Props) => {
  const router = useRouter();

  const formSchema = z.object({
    name: z.string().max(25, {
      message: 'Please enter valid name',
    }),
    email: z.string().email({
      message: 'Please enter a valid name',
    }),
    quantity: z
      .string()
      .min(1, {
        message: 'Should be a valid number',
      })
      .transform((string) => Number(string)),
    phone: z.string(),
    address: z.string().min(5),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      quantity: String(1) as unknown as number,
    },
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        if (
          !locationCode ||
          !isValidLocationState(
            locationCode,
            data.coords.latitude,
            data.coords.longitude
          )
        )
          router.replace('/');
      },
      () => {
        console.log('Not allowed');
        router.replace('/');
      }
    );
  }, []);

  async function hasUserAlreadyATicket({
    ip,
    email,
  }: {
    ip: string;
    email: string;
  }) {
    let hasTicket = false;

    if (ip) {
      hasTicket = !!(
        await getTicketWhere({
          ip,
          isFree: true,
          donation_formId: raffleId,
        })
      )?.id;
    }

    if (!hasTicket && email) {
      hasTicket = !!(
        await getTicketWhere({
          buyerEmail: email,
          isFree: true,
          donation_formId: raffleId,
        })
      )?.id;
    }

    return hasTicket;
  }

  async function onSubmit({
    name,
    email,
    quantity,
    address,
    phone,
  }: z.infer<typeof formSchema>) {
    try {
      const userIp = (await getUserIp()).value!;

      if (!userIp) throw new Error('Malformed request');

      if (await hasUserAlreadyATicket({ email, ip: userIp })) {
        toast({ title: 'Unable to process' });
        return;
      }

      await createTicket({
        amount: 0,
        email,
        name,
        phone,
        address,
        quantity,
        raffleId,
        isFree: true,
        paid: true,
        ip: userIp,
      });

      toast({ title: 'Hooray! You got a free ticket' });

      router.replace('/');
    } catch (error: any) {
      console.log(error);
      toast({
        title: error?.message,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container w-full max-w-3xl py-10 mx-auto flex flex-col space-y-3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  required
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
                  type="email"
                  className="text-black"
                  placeholder="john@email.com"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <label htmlFor="phone-input">Phone Number</label>
          <Controller
            name="phone"
            control={form.control}
            rules={{
              validate: (value) => isValidPhoneNumber(value),
            }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                className="border p-2"
                name="phone"
                value={value}
                onChange={onChange}
                defaultCountry="US"
                id="phone-input"
              />
            )}
          />
          {form.formState.errors['phone'] && (
            <p className="error-message">Invalid Phone</p>
          )}
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  rows={7}
                  className="text-black"
                  placeholder="H-XXX St-XXX Zip Code"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="submit">Get a free ticket</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
