'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import React from 'react';
import Link from 'next/link';

type Props = {
  className?: string;
  navItems: NavItem[];
  orientation?: 'horizontal' | 'vertical';
};

const styles = {
  menuList: {
    vertical: `flex flex-col lg:space-y-5`,
    horizontal: `flex space-x-5`,
  },
};

export const NavItems = ({
  navItems,
  className = '',
  orientation = 'horizontal',
}: Props) => {
  return (
    <NavigationMenu data-orientation={orientation} className="justify-start">
      <ul className={`${styles.menuList[orientation]} ${className}`}>
        {navItems.map(({ title, icon, url, disabled }, index) => (
          <NavigationMenuItem aria-disabled={disabled} key={index}>
            <Link
              href={url ?? `/`}
              className={`${navigationMenuTriggerStyle()} flex items-center space-x-2`}
            >
              {icon && icon}

              <span className="text-primary overflow-hidden">{title}</span>
            </Link>
          </NavigationMenuItem>
        ))}
      </ul>
    </NavigationMenu>
  );
};
