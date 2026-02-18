import React from 'react';
import { Subscription } from '../types';
import Card from './common/Card';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';

interface SubscriptionItemProps {
  subscription: Subscription;
  onEdit: (subscription: Subscription) => void;
  onDelete: (id: string) => void;
}

const SubscriptionItem: React.FC<SubscriptionItemProps> = ({ subscription, onEdit, onDelete }) => {
  const { name, price, billingCycle, category, iconUrl } = subscription;

  const formattedPrice =
    billingCycle === 'monthly' ? `$${price.toFixed(2)}/mo` :
    billingCycle === 'yearly' ? `$${price.toFixed(2)}/yr` :
    `$${price.toFixed(2)}`;

  return (
    <Card className="p-4 transition-all hover:bg-slate-700/50 hover:shadow-indigo-500/10">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          {iconUrl ? (
            <img src={iconUrl} alt={`${name} logo`} className="h-12 w-12 rounded-lg object-contain bg-white p-1" />
          ) : (
            <div className="h-12 w-12 rounded-lg bg-slate-700 flex items-center justify-center font-bold text-xl">{name.charAt(0)}</div>
          )}
        </div>
        <div className="flex-grow">
          <h3 className="font-semibold text-slate-50">{name}</h3>
          <p className="text-sm text-slate-400">{category}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-lg text-slate-50">{formattedPrice}</p>
          <p className="text-sm capitalize text-slate-400">{billingCycle}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 ml-4">
            <button
                onClick={() => onEdit(subscription)}
                className="p-2 text-slate-400 hover:text-indigo-400 transition-colors"
                aria-label={`Edit ${name}`}
            >
                <EditIcon />
            </button>
            <button
                onClick={() => onDelete(subscription.id)}
                className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                aria-label={`Delete ${name}`}
            >
                <TrashIcon />
            </button>
        </div>
      </div>
    </Card>
  );
};

export default SubscriptionItem;
