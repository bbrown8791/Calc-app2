import React, { useState, useEffect } from 'react';
import { PlusCircle, InfoIcon } from 'lucide-react';
import { DebtInput } from './components/DebtInput';
import { PaymentSchedule } from './components/PaymentSchedule';
import { Summary } from './components/Summary';
import type { Debt, PaymentPlan } from './types/debt';
import { calculateMinimumPayment } from './utils/debtCalculations';
import { INITIAL_DEBT } from './constants/initialDebt';

function App() {
  const [debts, setDebts] = useState<Debt[]>([INITIAL_DEBT]);
  const [totalMonthlyPayment, setTotalMonthlyPayment] = useState<number>(0);
  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[]>([]);

  const addDebt = () => {
    const newDebt: Debt = {
      id: `debt-${Date.now()}`,
      name: '',
      balance: 0,
      interestRate: 0,
      minimumPayment: 0,
      isStatic: false
    };
    setDebts([...debts, newDebt]);
  };

  const handleDebtChange = (id: string, field: keyof Debt, value: number | string) => {
    setDebts(debts.map(debt => {
      if (debt.id === id) {
        const updatedDebt = { ...debt, [field]: value };
        if (field === 'balance') {
          updatedDebt.minimumPayment = calculateMinimumPayment(Number(value), debt.interestRate);
        }
        return updatedDebt;
      }
      return debt;
    }));
  };

  const deleteDebt = (id: string) => {
    if (debts.length > 1) {
      setDebts(debts.filter(debt => debt.id !== id));
    }
  };

  const calculatePaymentPlan = () => {
    // Sort debts by interest rate (highest first) - Debt Avalanche method
    const sortedDebts = [...debts].sort((a, b) => b.interestRate - a.interestRate);
    const plans: PaymentPlan[] = [];
    
    let remainingDebts = [...sortedDebts];
    let month = 1;
    
    while (remainingDebts.length > 0 && month <= 360) { // 30-year maximum
      for (const debt of remainingDebts) {
        const monthlyInterest = (debt.balance * debt.interestRate) / 100 / 12;
        const availableForPrincipal = debt.minimumPayment - monthlyInterest;
        
        const plan: PaymentPlan = {
          monthNumber: month,
          debtId: debt.name || debt.id,
          startingBalance: debt.balance,
          payment: debt.minimumPayment,
          interestPaid: monthlyInterest,
          principalPaid: availableForPrincipal,
          endingBalance: Math.max(0, debt.balance - availableForPrincipal),
        };
        
        plans.push(plan);
        debt.balance = plan.endingBalance;
      }
      
      remainingDebts = remainingDebts.filter(debt => debt.balance > 0);
      month++;
    }
    
    setPaymentPlans(plans);
  };

  const minimumRequired = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0);

  useEffect(() => {
    // Update total monthly payment when debts change
    setTotalMonthlyPayment(Math.max(totalMonthlyPayment, minimumRequired));
  }, [debts]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Debt Payoff Calculator</h1>
          <p className="mt-2 text-gray-600">Plan your journey to becoming debt-free</p>
        </div>

        <div className="space-y-6">
          {debts.map(debt => (
            <DebtInput
              key={debt.id}
              debt={debt}
              onChange={handleDebtChange}
              onDelete={deleteDebt}
              showDeleteButton={debts.length > 1}
            />
          ))}

          {debts.length < 8 && (
            <button
              onClick={addDebt}
              className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-colors"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Another Debt
            </button>
          )}

          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                How much can you afford to pay monthly? ($)
              </label>
              <div className="group relative">
                <InfoIcon className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-help" />
                <div className="invisible group-hover:visible absolute right-0 w-64 p-2 mt-2 text-sm text-gray-600 bg-white border rounded-md shadow-lg">
                  Minimum required: ${minimumRequired.toFixed(2)}/month
                  <br />
                  Paying more will help you get out of debt faster
                </div>
              </div>
            </div>
            <input
              type="number"
              value={totalMonthlyPayment}
              onChange={(e) => setTotalMonthlyPayment(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min={minimumRequired}
              step="0.01"
              placeholder={`Minimum: $${minimumRequired.toFixed(2)}`}
            />
            <p className="mt-2 text-sm text-gray-500">
              The more you can pay each month, the faster you'll be debt-free
            </p>
          </div>

          <button
            onClick={calculatePaymentPlan}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Calculate Payment Plan
          </button>
        </div>

        {debts.length > 0 && (
          <Summary
            debts={debts}
            totalMonthlyPayment={totalMonthlyPayment}
          />
        )}

        {paymentPlans.length > 0 && (
          <PaymentSchedule paymentPlans={paymentPlans} />
        )}
      </div>
    </div>
  );
}

export default App;