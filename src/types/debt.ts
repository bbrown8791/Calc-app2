export interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
  isStatic?: boolean;
}

export interface PaymentPlan {
  monthNumber: number;
  debtId: string;
  startingBalance: number;
  payment: number;
  interestPaid: number;
  principalPaid: number;
  endingBalance: number;
}