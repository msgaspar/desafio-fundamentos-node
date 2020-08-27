import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface GroupedTransactions {
  [key: string]: Transaction[];
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const groupedTransactions = this.transactions.reduce(
      (acc: GroupedTransactions, obj: Transaction): GroupedTransactions => {
        acc[obj.type].push(obj);
        return acc;
      },
      {
        income: [],
        outcome: [],
      },
    );

    const totalIncome = groupedTransactions.income.reduce(
      (acc: number, obj: Transaction): number => {
        return acc + obj.value;
      },
      0,
    );

    const totalOutcome = groupedTransactions.outcome.reduce(
      (acc: number, obj: Transaction): number => {
        return acc + obj.value;
      },
      0,
    );

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
