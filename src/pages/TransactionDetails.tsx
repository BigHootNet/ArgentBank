import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TransactionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { auth } = useAuth();

  if (!auth.user) {
    return <div>Loading...</div>;
  }

  const transactions = [
    {
      id: '1',
      accountType: 'Argent Bank Checking',
      accountNumber: 'x8349',
      amount: '$2,082.79',
      balance: 'Available Balance',
    },
    {
      id: '2',
      accountType: 'Argent Bank Savings',
      accountNumber: 'x6712',
      amount: '$10,928.42',
      balance: 'Available Balance',
    },
    {
      id: '3',
      accountType: 'Argent Bank Credit Card',
      accountNumber: 'x8349',
      amount: '$184.30',
      balance: 'Current Balance',
    },
    {
      id: '4',
      accountType: 'Argent Bank Credit Card',
      accountNumber: 'x8349',
      amount: '$3484.30',
      balance: 'Available Balance',
    },
    {
      id: '5',
      accountType: 'Argent Bank Credit Card',
      accountNumber: 'x8349',
      amount: '$666.666',
      balance: 'Available Balance',
    },
  ];

  const transaction = transactions.find((t) => t.id === id);

  if (!transaction) {
    return <div>Transaction not found</div>;
  }

  return (
    <>
      <Header isAuthenticated={!!auth.token} userName={auth.user.firstName} />
      <main className="main bg-lightdark">
        <div className="header">
          <h1 className="welcome-message">Transaction Details</h1>
          <div className="transaction-details">
            <p>Account Type: {transaction.accountType}</p>
            <p>Account Number: {transaction.accountNumber}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Balance: {transaction.balance}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TransactionDetails;
