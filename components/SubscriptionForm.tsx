import React, { useState, useEffect } from 'react';
import { Subscription, BillingCycle } from '../types';
import { BILLING_CYCLES, CATEGORIES } from '../constants';
import Card from './common/Card';
import Input from './common/Input';
import Select from './common/Select';
import Button from './common/Button';

interface SubscriptionFormProps {
  onSubmit: (subscription: Subscription | Omit<Subscription, 'id'>) => void;
  onCancel: () => void;
  initialData?: Subscription | null;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    billingCycle: 'monthly' as BillingCycle,
    startDate: '',
    category: '',
    iconUrl: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        price: initialData.price.toString(),
        billingCycle: initialData.billingCycle,
        startDate: initialData.startDate,
        category: initialData.category,
        iconUrl: initialData.iconUrl || '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      price: parseFloat(formData.price),
    };
    if (initialData) {
      onSubmit({ ...submissionData, id: initialData.id });
    } else {
      onSubmit(submissionData);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-slate-50">
            {initialData ? 'Edit Subscription' : 'Add New Subscription'}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <Input
                label="Service Name"
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <Input
                label="Price"
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="sm:col-span-3">
              <Select
                label="Billing Cycle"
                id="billingCycle"
                name="billingCycle"
                value={formData.billingCycle}
                onChange={handleChange}
                required
              >
                {BILLING_CYCLES.map(cycle => (
                  <option key={cycle} value={cycle}>
                    {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                  </option>
                ))}
              </Select>
            </div>
            <div className="sm:col-span-3">
              <Input
                label="Start Date"
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="sm:col-span-3">
              <Select
                label="Category"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select a category</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Select>
            </div>
            <div className="sm:col-span-3">
              <Input
                label="Icon URL (Optional)"
                id="iconUrl"
                name="iconUrl"
                type="url"
                value={formData.iconUrl}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-slate-700 bg-slate-800/50 px-8 py-4 rounded-b-xl">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? 'Save Changes' : 'Add Subscription'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default SubscriptionForm;
