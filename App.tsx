import React, { useState, useCallback, useMemo } from 'react';
import { MOCK_SUBSCRIPTIONS, MOCK_USER } from './constants';
import { Subscription, User, View } from './types';
import LoginScreen from './components/LoginScreen';
import Header from './components/Header';
import DashboardSummary from './components/DashboardSummary';
import SubscriptionList from './components/SubscriptionList';
import SubscriptionForm from './components/SubscriptionForm';
import { PlusIcon } from './components/icons/PlusIcon';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(MOCK_SUBSCRIPTIONS);
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);

  const handleLogin = useCallback((username: string, password: string) => {
    if (username === MOCK_USER.username && password === 'password') {
      setUser(MOCK_USER);
      return true;
    }
    return false;
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
  }, []);

  const handleAddSubscription = useCallback((subscription: Omit<Subscription, 'id'>) => {
    setSubscriptions(prev => [
      ...prev,
      { ...subscription, id: Date.now().toString() }
    ]);
    setCurrentView(View.DASHBOARD);
  }, []);

  const handleUpdateSubscription = useCallback((updatedSubscription: Subscription) => {
    setSubscriptions(prev =>
      prev.map(sub => (sub.id === updatedSubscription.id ? updatedSubscription : sub))
    );
    setCurrentView(View.DASHBOARD);
    setEditingSubscription(null);
  }, []);

  const handleDeleteSubscription = useCallback((id: string) => {
    setSubscriptions(prev => prev.filter(sub => sub.id !== id));
  }, []);

  const handleEditClick = useCallback((subscription: Subscription) => {
    setEditingSubscription(subscription);
    setCurrentView(View.FORM);
  }, []);

  const handleAddNewClick = useCallback(() => {
    setEditingSubscription(null);
    setCurrentView(View.FORM);
  }, []);

  const handleCancelForm = useCallback(() => {
    setCurrentView(View.DASHBOARD);
    setEditingSubscription(null);
  }, []);

  const totalMonthlyCost = useMemo(() => {
    return subscriptions.reduce((total, sub) => {
      if (sub.billingCycle === 'monthly') {
        return total + sub.price;
      }
      if (sub.billingCycle === 'yearly') {
        return total + sub.price / 12;
      }
      return total;
    }, 0);
  }, [subscriptions]);

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Header user={user} onLogout={handleLogout} />
      <main className="container mx-auto max-w-5xl px-4 py-8">
        {currentView === View.DASHBOARD && (
          <>
            <DashboardSummary
              subscriptionCount={subscriptions.length}
              totalMonthlyCost={totalMonthlyCost}
            />
            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleAddNewClick}
                    className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    <PlusIcon />
                    Add Subscription
                </button>
            </div>
            <SubscriptionList
              subscriptions={subscriptions}
              onEdit={handleEditClick}
              onDelete={handleDeleteSubscription}
            />
          </>
        )}
        {currentView === View.FORM && (
          <SubscriptionForm
            onSubmit={editingSubscription ? handleUpdateSubscription : handleAddSubscription}
            onCancel={handleCancelForm}
            initialData={editingSubscription}
          />
        )}
      </main>
    </div>
  );
};

export default App;
