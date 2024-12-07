import React from 'react';
import type { PaymentPlan } from '../types/debt';

interface PaymentScheduleProps {
  paymentPlans: PaymentPlan[];
}

export const PaymentSchedule: React.FC<PaymentScheduleProps> = ({ paymentPlans }) => {
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Debt</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Starting Balance</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ending Balance</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paymentPlans.map((plan, index) => (
            <tr key={`${plan.debtId}-${plan.monthNumber}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.monthNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.debtId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${plan.startingBalance.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${plan.payment.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${plan.interestPaid.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${plan.principalPaid.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${plan.endingBalance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};