import React from 'react';

type Props = {
  quanity: number;
  price: number;
};

export const TicketPriceCard: React.FC<Props> = ({ quanity, price }) => {
  return (
    <div className="cursor-pointer hover:scale-[1.02] transform text-center shadow-sm drop-shadow-sm p-2 bg-primary text-white rounded-md">
      <p className="font-semibold font-mono border-b">Ticket(s): {quanity}</p>
      <p className="font-semibold">${price}</p>
    </div>
  );
};
