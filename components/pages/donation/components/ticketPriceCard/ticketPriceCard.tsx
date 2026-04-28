import React from 'react';

type Props = {
  quanity: number;
  price: number;
  isSelected?: boolean;
};

export const TicketPriceCard: React.FC<Props> = ({ quanity, price, isSelected = false }) => {
  return (
    <div className={`cursor-pointer hover:scale-[1.02] transform text-center shadow-sm drop-shadow-sm p-2 text-white rounded-md transition-colors duration-200 ${isSelected ? 'bg-orange-500 ring-2 ring-orange-600' : 'bg-primary'}`}>
      <p className="font-semibold font-mono border-b">Ticket(s): {quanity}</p>
      <p className="font-semibold">${price}</p>
    </div>
  );
};
