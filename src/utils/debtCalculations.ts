export const calculateMinimumPayment = (balance: number, rate: number): number => {
  // Most credit cards require minimum payment of 1-3% of balance or $25-35, whichever is greater
  const percentageBasedMin = balance * 0.02; // Using 2% as standard
  return Math.max(percentageBasedMin, 25);
};

export const calculateMonthlyInterest = (balance: number, annualRate: number): number => {
  const monthlyRate = annualRate / 100 / 12;
  return balance * monthlyRate;
};

export const calculatePayoffTime = (
  balance: number,
  annualRate: number,
  monthlyPayment: number
): number => {
  let remainingBalance = balance;
  let months = 0;
  
  while (remainingBalance > 0 && months < 360) { // 30-year maximum
    const interest = calculateMonthlyInterest(remainingBalance, annualRate);
    const principal = monthlyPayment - interest;
    remainingBalance -= principal;
    months++;
  }
  
  return months;
};