
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar, CreditCard, ArrowUpRight, Clock, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Payment {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed';
  date: Date;
  employer?: string;
  worker?: string;
}

interface PaymentTrackerProps {
  payments: Payment[];
  totalAmount: number;
  nextPaymentDate: Date;
  userType: 'worker' | 'employer';
  className?: string;
}

const PaymentTracker: React.FC<PaymentTrackerProps> = ({
  payments,
  totalAmount,
  nextPaymentDate,
  userType,
  className
}) => {
  // Calculate statistics
  const completedPayments = payments.filter(p => p.status === 'completed');
  const pendingPayments = payments.filter(p => p.status === 'pending');
  const processingPayments = payments.filter(p => p.status === 'processing');
  
  const completedAmount = completedPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = pendingPayments.reduce((sum, payment) => sum + payment.amount, 0);
  
  const percentComplete = totalAmount > 0 ? (completedAmount / totalAmount) * 100 : 0;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Paid';
      case 'processing':
        return 'Processing';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="bg-primary-foreground border-b pb-4">
        <CardTitle className="text-lg">Weekly Payment Tracker</CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          <div className="sm:w-1/2">
            <p className="text-sm text-muted-foreground mb-1.5">
              Total {userType === 'worker' ? 'Earnings' : 'Payments'} This Week
            </p>
            <div className="text-3xl font-bold mb-1">
              {formatCurrency(totalAmount)}
            </div>
            <div className="flex items-center mb-4">
              <Progress value={percentComplete} className="h-2" />
              <span className="ml-2 text-xs font-medium">
                {Math.round(percentComplete)}%
              </span>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Completed</span>
                <span className="font-medium">{formatCurrency(completedAmount)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Pending</span>
                <span className="font-medium">{formatCurrency(pendingAmount)}</span>
              </div>
            </div>
          </div>
          
          <div className="sm:w-1/2 sm:border-l sm:pl-6">
            <p className="text-sm text-muted-foreground mb-4">Next Payment</p>
            
            <div className="flex items-start gap-4 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{formatDate(nextPaymentDate)}</p>
                <p className="text-sm text-muted-foreground">
                  {userType === 'worker' ? 'You will receive payment' : 'Payment will be processed'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Weekly Automatic Payments</p>
                <p className="text-sm text-muted-foreground">
                  {userType === 'worker' ? 'Direct deposit to your account' : 'Automatic debits from your account'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Recent Transactions</h4>
            <a href="#" className="text-sm text-primary flex items-center">
              View All
              <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </a>
          </div>
          
          <div className="space-y-3">
            {payments.slice(0, 3).map((payment) => (
              <div 
                key={payment.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-foreground">
                    {payment.employer ? payment.employer[0] : payment.worker ? payment.worker[0] : 'P'}
                  </div>
                  <div>
                    <p className="font-medium">
                      {userType === 'worker' ? payment.employer : payment.worker}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(payment.date)}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-medium">
                    {formatCurrency(payment.amount)}
                  </div>
                  <div className="flex items-center justify-end gap-1 text-xs">
                    {getStatusIcon(payment.status)}
                    <span className={cn(
                      payment.status === 'completed' && "text-green-600",
                      payment.status === 'processing' && "text-amber-600",
                      payment.status === 'pending' && "text-muted-foreground"
                    )}>
                      {getStatusText(payment.status)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentTracker;
