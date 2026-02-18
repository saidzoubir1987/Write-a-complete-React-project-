import React from 'react';
import { Subscription } from '../types';
import SubscriptionItem from './SubscriptionItem';

interface SubscriptionListProps {
  subscriptions: Subscription[];
  onEdit: (subscription: Subscription) => void;
  onDelete: (id: string) => void;
}

const SubscriptionList: React.FC<SubscriptionListProps> = ({ subscriptions, onEdit, onDelete }) => {
  if (subscriptions.length === 0) {
    return (
      <div className="mt-8 text-center text-slate-400">
        <h3 className="text-lg font-semibold">No subscriptions yet!</h3>
        <p>Click "Add Subscription" to get started.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      {subscriptions
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(sub => (
          <SubscriptionItem
            key={sub.id}
            subscription={sub}
            onEdit={onEdit}
            onDelete={onDelete}
          />
      ))}
    </div>
  );
};

export default SubscriptionList;
