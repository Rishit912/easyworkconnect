
import React from 'react';
import PaymentTracker from '@/components/PaymentTracker';

interface PaymentTrackerSectionProps {
  userType: 'worker' | 'employer';
}

const PaymentTrackerSection: React.FC<PaymentTrackerSectionProps> = ({ userType }) => {
  // Mock data for the payment tracker
  const mockPayments = [
    {
      id: "1",
      amount: 2500,
      status: 'completed' as const,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      employer: "BuildTech Construction",
      worker: "Rajesh Kumar"
    },
    {
      id: "2",
      amount: 1800,
      status: 'pending' as const,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      employer: "Urban Homes",
      worker: "Sunil Verma"
    },
    {
      id: "3",
      amount: 3200,
      status: 'processing' as const,
      date: new Date(),
      employer: "MK Constructions",
      worker: "Anita Patel"
    }
  ];

  const totalAmount = 7500;
  const nextPaymentDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Weekly Earnings</h2>
      <PaymentTracker 
        payments={mockPayments}
        totalAmount={totalAmount}
        nextPaymentDate={nextPaymentDate}
        userType={userType}
      />
    </div>
  );
};

export default PaymentTrackerSection;
