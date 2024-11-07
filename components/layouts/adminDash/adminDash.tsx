import React from 'react';
import NavItems from '@/components/shared/navItems';
import { AwardIcon, ReceiptIcon, TicketIcon } from 'lucide-react';

const navItems: NavItem[] = [
  {
    title: 'Raffles',
    icon: <ReceiptIcon />,
    url: `/admin/dashboard`,
  },
  {
    title: 'Tickets',
    icon: <TicketIcon />,
    url: `/admin/tickets`,
  },
  {
    title: 'Winner Tickets',
    icon: <AwardIcon />,
    url: `/admin/winner-tickets`,
  },
];

export const AdminDash = ({ children }: ReactChildren) => {
  return (
    <div className="w-full pt-20 flex flex-col overflow-auto lg:flex-row max-h-max">
      <div className="lg:max-w-[20%] xl:max-w-[16%] min-h-max overflow-auto flex border-b lg:border-b-0 lg:border-r px-5">
        <NavItems
          orientation="vertical"
          navItems={navItems}
          className="h-full flex !flex-row space-y-0 space-x-5 w-full lg:space-x-0 lg:space-y-5 lg:!flex-col"
        />
      </div>

      <div className="flex-1 h-full overflow-y-auto w-full px-8 py-10 lg:py-1">
        {children}
      </div>
    </div>
  );
};
