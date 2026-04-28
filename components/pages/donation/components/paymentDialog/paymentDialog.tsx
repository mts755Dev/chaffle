'use client';

import React, { useEffect, useRef, useState } from 'react';
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

import PhoneInput from 'react-phone-number-input/react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import TicketPriceCard from '../ticketPriceCard';
import Image from 'next/image';
import { assets } from '@/constants/assets';

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
] as const;

type Props = {
  raffleAccount: string;
  raffleId: string;
  freeTicket?: boolean;
  disabled?: boolean;
  iconButton?: boolean;
  autoCheckDonation?: boolean;
};

export const PaymentDialog: React.FC<Props> = ({
  raffleAccount,
  raffleId,
  freeTicket = false,
  disabled = true,
  iconButton = false,
  autoCheckDonation = false,
}) => {
  const [openModal, setopenModal] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
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
    address: z.string().min(1, { message: 'Address is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().refine((val) => US_STATES.includes(val as any), {
      message: 'Please select a valid US state',
    }),
    zipCode: z.string().regex(/^\d{5}$/, { message: 'Zip code must be 5 digits' }),
  });

  const STORAGE_KEY = `chaffle-ticket-${raffleId}`;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.entries(parsed).forEach(([key, value]) => {
          if (value) form.setValue(key as any, value as string);
        });
      }
    } catch {}
  }, []);

  useEffect(() => {
    const subscription = form.watch((values) => {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(values));
      } catch {}
    });
    return () => subscription.unsubscribe();
  }, [form, STORAGE_KEY]);

  async function onSubmit({
    name,
    email,
    phone,
    address,
    city,
    state,
    zipCode,
  }: z.infer<typeof formSchema>) {
    const fullAddress = `${address}, ${city}, ${state} ${zipCode}`;
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
        address: fullAddress,
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
          <Button
            disabled={disabled}
            className={!disabled ? 'bg-orange-500 hover:bg-orange-600' : ''}
          >
            Buy Tickets Now
          </Button>
        ) : (
          <div className="relative w-full max-w-[400px] aspect-[2/1] mx-auto">
            <Image
              className="cursor-pointer object-contain"
              src={!disabled ? assets.buyNowPNG.url : assets.purchaseSVG.url}
              alt={!disabled ? assets.buyNowPNG.alt : assets.purchaseSVG.alt}
              fill
              sizes="(max-width: 400px) 100vw, 400px"
            />
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
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
                    <Input
                      required
                      className="text-black"
                      placeholder="123 Main St"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      required
                      className="text-black"
                      placeholder="New York"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <Controller
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setStateOpen(!stateOpen)}
                          className="h-10 w-full rounded-md border border-input bg-background px-3 text-left text-sm text-black flex items-center justify-between"
                        >
                          <span>{field.value || 'Select state'}</span>
                          <span className="text-gray-500">▼</span>
                        </button>
                        {stateOpen && (
                          <div className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto rounded-md border border-input bg-white shadow-lg">
                            {US_STATES.map((st) => (
                              <div
                                key={st}
                                onClick={() => {
                                  field.onChange(st);
                                  setStateOpen(false);
                                }}
                                className={`px-3 py-2 text-sm text-black cursor-pointer hover:bg-gray-100 ${field.value === st ? 'bg-gray-100 font-semibold' : ''}`}
                              >
                                {st}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input
                        required
                        className="text-black"
                        placeholder="10001"
                        maxLength={5}
                        inputMode="numeric"
                        {...field}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          field.onChange(val);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {!freeTicket && (
              <>
                <div>
                  <h1 className="pb-2">Select Tickets</h1>
                  <div className="grid grid-cols-3 gap-2">
                    <div onClick={() => updatePrice({ price: 5, quantity: 1 })}>
                      <TicketPriceCard price={5} quanity={1} isSelected={selectedPrice?.price === 5} />
                    </div>
                    <div onClick={() => updatePrice({ price: 10, quantity: 3 })}>
                      <TicketPriceCard price={10} quanity={3} isSelected={selectedPrice?.price === 10} />
                    </div>
                    <div onClick={() => updatePrice({ price: 20, quantity: 10 })}>
                      <TicketPriceCard price={20} quanity={10} isSelected={selectedPrice?.price === 20} />
                    </div>
                    <div onClick={() => updatePrice({ price: 40, quantity: 40 })}>
                      <TicketPriceCard price={40} quanity={40} isSelected={selectedPrice?.price === 40} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2">
                  <Input
                    ref={checkoutRef}
                    id="check"
                    type="checkbox"
                    className="w-4 h-4"
                    defaultChecked={autoCheckDonation}
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
