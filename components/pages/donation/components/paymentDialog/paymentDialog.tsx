'use client';

import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import {
  createCheckoutSession,
  createTicket,
  getUserIp,
  updateTicket,
} from '@/serverActions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import PhoneInput from 'react-phone-number-input/react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import TicketPriceCard from '../ticketPriceCard';
import Image from 'next/image';
import { assets } from '@/constants/assets';

type Props = {
  raffleAccount: string;
  raffleId: string;
  freeTicket?: boolean;
  disabled?: boolean;
  iconButton?: boolean;
};

export const PaymentDialog: React.FC<Props> = ({
  raffleAccount,
  raffleId,
  freeTicket = false,
  disabled = true,
  iconButton = false,
}) => {
  const [openModal, setopenModal] = useState(false);
  const checkoutRef = useRef<HTMLInputElement>(null);
  const [selectedPrice, setSelectedPrice] = useState<{
    price: number;
    quantity: number;
  }>({ price: 5, quantity: 1 });

  const formSchema = z.object({
    name: z.string().max(25, {
      message: 'Please enter valid name',
    }),
    email: z.string().email({
      message: 'Please enter a valid name',
    }),
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
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
    address,
  }: z.infer<typeof formSchema>) {
    try {
      if (!raffleAccount) {
        toast({
          title: 'Cannot proceed! Raffle is missing information',
        });
        return;
      }

      if (!selectedPrice.price) {
        toast({
          title: 'Cannot proceed! Please select a ticket',
        });
        return;
      }

      const userIp = (await getUserIp()).value;

      if (!userIp) throw new Error('Malformed request');

      const ticket = await createTicket({
        amount: selectedPrice.price,
        email,
        name,
        phone,
        address,
        quantity: selectedPrice.quantity,
        raffleId,
        ip: userIp,
      });

      toast({ title: 'Hold on! Redirecting to stripe checkout' });

      const checkout = await createCheckoutSession({
        amount: selectedPrice.price,
        raffleAccount,
        email,
        isApplicationAmount: checkoutRef.current?.checked,
        ticketId: ticket.id,
        quantity: 1,
      });

      await updateTicket({
        id: ticket.id,
        stripeSession: checkout as any,
      });
      if (checkout.url) window.location.assign(checkout.url);
    } catch (error: any) {
      toast({
        title: error?.message,
      });
    }
  }

  const updatePrice = ({
    price,
    quantity,
  }: {
    price: number;
    quantity: number;
  }) => {
    setSelectedPrice({ price, quantity });
  };

  return (
    <Dialog
      open={openModal}
      onOpenChange={() => {
        if (disabled) {
          toast({
            title: 'Make sure to check terms and conditions',
            variant: 'destructive',
          });
          return;
        }

        setopenModal(!openModal);
      }}
    >
      <DialogTrigger asChild>
        {!iconButton ? (
          <Button disabled={disabled}>Buy Tickets Now</Button>
        ) : (
          <Image
            className="w-full h-full cursor-pointer"
            src={assets.purchaseSVG.url}
            alt={assets.purchaseSVG.alt}
            width={500}
            height={500}
          />
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[50vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Buy Tickets</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col space-y-3"
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

            {!freeTicket && (
              <>
                <div>
                  <h1 className="pb-2">Select Tickets</h1>
                  <div className="grid grid-cols-3 gap-1">
                    <div
                      className={`${selectedPrice?.price === 5 ? 'border-black border-2 rounded-lg ' : ''}`}
                      onClick={() => updatePrice({ price: 5, quantity: 1 })}
                    >
                      <TicketPriceCard price={5} quanity={1} />
                    </div>
                    <div
                      className={`${selectedPrice?.price === 10 ? 'border-black border-2 rounded-lg ' : ''}`}
                      onClick={() => updatePrice({ price: 10, quantity: 3 })}
                    >
                      <TicketPriceCard price={10} quanity={3} />
                    </div>
                    <div
                      className={`${selectedPrice?.price === 20 ? 'border-black border-2 rounded-lg ' : ''}`}
                      onClick={() => updatePrice({ price: 20, quantity: 10 })}
                    >
                      <TicketPriceCard price={20} quanity={10} />
                    </div>
                    <div
                      className={`${selectedPrice?.price === 40 ? 'border-black border-2 rounded-lg ' : ''}`}
                      onClick={() => updatePrice({ price: 40, quantity: 40 })}
                    >
                      <TicketPriceCard price={40} quanity={40} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2">
                  <Input
                    ref={checkoutRef}
                    id="check"
                    type="checkbox"
                    className="w-4 h-4"
                  />
                  <Label htmlFor="check">
                    Help support our platform by donating 10%
                  </Label>
                </div>
              </>
            )}

            <DialogFooter>
              <Button type="submit">Buy Now</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
