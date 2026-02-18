import React from 'react';
import Card from './common/Card';

interface DashboardSummaryProps {
  subscriptionCount: number;
  totalMonthlyCost: number;
}

const StatCard: React.FC<{ title: string; value: string | number; }> = ({ title, value }) => (
  <Card className="p-6">
    <h3 className="text-sm font-medium text-slate-400">{title}</h3>
    <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-50">{value}</p>
  </Card>
);


const DashboardSummary: React.FC<DashboardSummaryProps> = ({ subscriptionCount, totalMonthlyCost }) => {
  return (
    <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">Dashboard</h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <StatCard title="Active Subscriptions" value={subscriptionCount} />
            <StatCard title="Total Monthly Cost" value={`$${totalMonthlyCost.toFixed(2)}`} />
        </div>
    </div>
  );
};

export default DashboardSummary;
