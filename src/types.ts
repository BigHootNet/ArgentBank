export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }
  
  export interface ApiResponse<T> {
    body: T;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
  }
  
  export interface Transaction {
    accountType: string;
    accountNumber: string;
    amount: string;
    balance: string;
  }
  
  export interface User {
    firstName: string;
    lastName: string;
    transactions: Transaction[];
    // autres propriétés
  }