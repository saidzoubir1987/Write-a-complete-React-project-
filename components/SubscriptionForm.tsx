import React, { useState, useEffect } from 'react';
import { Subscription, BillingCycle } from '../types';
import { BILLING_CYCLES, CATEGORIES } from '../constants';
import Card from './common/Card';
import Input from './common/Input';
import Select from './common/Select';
import Button from './common/Button';
import { GoogleGenAI } from '@google/genai';
import { SparklesIcon } from './icons/SparklesIcon';

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
  const [isCategorizing, setIsCategorizing] = useState(false);

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

  const handleAiCategorize = async () => {
    if (!formData.name) {
      alert('Please enter a service name first.');
      return;
    }
    setIsCategorizing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Based on the subscription name "${formData.name}", which of the following categories is the most appropriate?
      Categories: ${CATEGORIES.join(', ')}
      Please respond with only the single most relevant category name from the list provided.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      // FIX: The `response.text` is the correct way to get the text from the response.
      // It returns `string | undefined`. The optional chaining was not incorrect, but it's cleaner to handle the undefined case.
      const suggestedCategory = response.text?.trim();

      if (suggestedCategory && CATEGORIES.includes(suggestedCategory)) {
        setFormData(prev => ({ ...prev, category: suggestedCategory }));
      } else {
        alert(`AI suggestion ("${suggestedCategory}") is not a valid category. Please select one manually.`);
      }

    } catch (error) {
      console.error("AI categorization failed:", error);
      alert('AI categorization failed. Please select a category manually.');
    } finally {
      setIsCategorizing(false);
    }
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
              <div className="flex justify-between items-baseline mb-2">
                  <label htmlFor="category" className="block text-sm font-medium leading-6 text-slate-300">
                      Category
                  </label>
                  <button
                      type="button"
                      onClick={handleAiCategorize}
                      disabled={!formData.name || isCategorizing}
                      className="flex items-center gap-1.5 rounded-md bg-indigo-500/10 px-2 py-1 text-xs font-semibold text-indigo-400 ring-1 ring-inset ring-indigo-500/20 hover:bg-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                      <SparklesIcon />
                      <span>{isCategorizing ? 'Working...' : 'AI Suggest'}</span>
                  </button>
              </div>
              <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-slate-100 shadow-sm ring-1 ring-inset ring-slate-600 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:bg-slate-800"
              >
                  <option value="" disabled>Select a category</option>
                  {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                  ))}
              </select>
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