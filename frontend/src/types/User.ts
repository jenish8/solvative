type HistoryType = { amount: number; dateStamp: string; _id: string };

export type User = {
  _id: string;
  name: string;
  P5: {
    balance: number;
    history: (HistoryType & { givenTo: User })[];
  };
  Reward: {
    balance: number;
    history: (HistoryType & { givenBy: User })[];
  };
};
