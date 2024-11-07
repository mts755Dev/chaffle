'use client';

import { assets } from '@/constants/assets';
import {
  GlobeLockIcon,
  LayoutDashboardIcon,
  MenuIcon,
  WrenchIcon,
} from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import NavItems from '../navItems';
import AuthDialog from '../authDialog';
import Login from '@/components/forms/login';
import {
  HandCoinsIcon,
  MessageCircleQuestionIcon,
  UsersRoundIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useStateProvider } from '@/providers';
import { signout } from '@/serverActions';
import { toast } from '@/components/ui/use-toast';
import { usePathname } from 'next/navigation';

const userItems: NavItem[] = [
  {
    title: 'Donate Now',
    url: '/#donate-now',
    icon: <HandCoinsIcon className="navlink-icon" />,
  },
  {
    title: 'About Us',
    icon: <UsersRoundIcon className="navlink-icon" />,
    url: '/#about-us',
  },
  {
    title: 'Contact Us',
    url: '/#support-form',
    icon: <MessageCircleQuestionIcon className="navlink-icon" />,
  },
];

const adminItems: NavItem[] = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboardIcon className="navlink-icon" />,
    url: '/admin/dashboard',
  },
];

const donationItems: NavItem[] = [
  {
    title: 'Troubleshoot',
    icon: <WrenchIcon className="navlink-icon" />,
    url: '/troubleshoot',
  },
  {
    title: 'Privacy Policy',
    icon: <GlobeLockIcon className="navlink-icon" />,
    url: '/privacy-policy',
  },
];

export const Navbar = () => {
  const pathname = usePathname();

  const {
    state: { user },
    dispatch,
  } = useStateProvider();

  const [navItems, setnavItems] = useState(userItems);

  useEffect(() => {
    let items = [...userItems];

    if (user && user?.role === 'admin') items = [...adminItems, ...items];
    if (pathname.includes('donation')) {
      items = [...items, ...donationItems];
    }

    setnavItems(items);
  }, [user, pathname]);

  async function handleSignout() {
    const error = await signout();
    dispatch({
      payload: null,
      reducer: 'user',
      type: 'set',
    });
    if (error)
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
  }

  return (
    <div className="w-full flex space-x-10 justify-between items-center h-28 pl-8 z-50 ">
      <Link href={'/'} className="flex flex-col items-center">
        <Image
          height={500}
          width={500}
          alt={assets.chaffleSVG.alt}
          src={assets.chaffleSVG.url}
          className="pt-10 w-28 sm:w-40 lg:w-48 h-auto"
        />
      </Link>

      <div className="hidden overflow-auto w-full lg:flex justify-between space-x-10 items-center h-full bg-gray-50 px-8">
        <div className="flex-1 w-full overflow-auto scrollbar-none">
          <NavItems navItems={navItems} />
        </div>
        {pathname === '/' || pathname.includes('admin') ? (
          !user ? (
            <>
              <AuthDialog buttonText="Login" authForm={<Login />} />
            </>
          ) : (
            <Button onClick={handleSignout}>Sign out</Button>
          )
        ) : (
          <></>
        )}
      </div>

      <div className="lg:hidden bg-gray-50 pr-8">
        <Drawer>
          <DrawerTrigger>
            <MenuIcon className="w-7 h-7" />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerDescription className="flex flex-col space-y-5 w-full">
                <NavItems
                  className="flex flex-wrap !space-x-0 items-center"
                  navItems={navItems}
                />
                {pathname === '/' || pathname.includes('admin') ? (
                  !user ? (
                    <AuthDialog buttonText="Login" authForm={<Login />} />
                  ) : (
                    <Button onClick={handleSignout}>Sign out</Button>
                  )
                ) : (
                  <></>
                )}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};
