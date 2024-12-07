import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Debt } from '../types/debt';

interface DebtInputProps {
  debt: Debt;
  onChange: (id: string, field: keyof Debt, value: number | string) => void;
  onDelete: (id: string) => void;
  showDeleteButton?: boolean;
}

export const DebtInput: React.FC<DebtInputProps> = ({ 
  debt, 
  onChange, 
  onDelete,
  showDeleteButton = true 
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm mb-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={debt.name}
            onChange={(e) => onChange(debt.id, 'name', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Credit Card Name"
            disabled={debt.isStatic}
          />
        </div>
        
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">Balance ($)</label>
          <input
            type="number"
            value={debt.balance}
            onChange={(e) => onChange(debt.id, 'balance', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            step="0.01"
            disabled={debt.isStatic}
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
          <input
            type="number"
            value={debt.interestRate}
            onChange={(e) => onChange(debt.id, 'interestRate', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            step="0.01"
            disabled={debt.isStatic}
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">Min. Payment ($)</label>
          <input
            type="number"
            value={debt.minimumPayment}
            onChange={(e) => onChange(debt.id, 'minimumPayment', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            step="0.01"
            disabled={debt.isStatic}
          />
        </div>

        <div className="col-span-1 flex items-end justify-end">
          {showDeleteButton && !debt.isStatic && (
            <button
              onClick={() => onDelete(debt.id)}
              className="p-2 text-red-600 hover:text-red-800 transition-colors"
              aria-label="Delete debt"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};