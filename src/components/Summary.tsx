import React from 'react';
import type { Debt } from '../types/debt';
import { calculatePayoffTime } from '../utils/debtCalculations';

interface SummaryProps {
  debts: Debt[];
  totalMonthlyPayment: number;
}

export const Summary: React.FC<SummaryProps> = ({ debts, totalMonthlyPayment }) => {
  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const averageInterestRate = debts.reduce((sum, debt) => sum + debt.interestRate, 0) / debts.length;
  const estimatedMonths = calculatePayoffTime(totalDebt, averageInterestRate, totalMonthlyPayment);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Total Debt</p>
          <p className="text-2xl font-bold text-blue-900">${totalDebt.toFixed(2)}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Monthly Payment</p>
          <p className="text-2xl font-bold text-green-900">${totalMonthlyPayment.toFixed(2)}</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-600 font-medium">Estimated Payoff Time</p>
          <p className="text-2xl font-bold text-purple-900">{estimatedMonths} months</p>
        </div>
      </div>
    </div>
  );
};