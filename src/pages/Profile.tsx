import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile: React.FC = () => {
  const { auth } = useAuth();
  const { handleUpdateProfile } = useUpdateProfile();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (!auth.token) {
      console.log('Redirecting to login');
      navigate('/login');
    } else if (auth.user) {
      setFirstName(auth.user.firstName);
      setLastName(auth.user.lastName);
    }
  }, [auth, navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (auth.token) {
      await handleUpdateProfile(auth.token, { firstName, lastName });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFirstName(auth.user?.firstName || '');
    setLastName(auth.user?.lastName || '');
    setIsEditing(false);
  };

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

  if (!auth.user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header isAuthenticated={!!auth.token} userName={auth.user.firstName} />
      <main className="main bg-lightdark">
        <div className="header">
          <h1 className="welcome-message">Welcome back</h1>
          {isEditing ? (
            <>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="name-display"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="name-display"
              />
            </>
          ) : (
            <h2 className="name-display">
              {firstName} {lastName}
            </h2>
          )}
          <div className="button-group">
            {isEditing ? (
              <>
                <button className="save-button" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="edit-button" onClick={handleEdit}>
                Edit
              </button>
            )}
          </div>
        </div>
        <div className="transaction-list">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <div className="transaction-info">
                <p className="transaction-title">
                  {transaction.accountType} ({transaction.accountNumber})
                </p>
                <p className="transaction-amount">{transaction.amount}</p>
                <p className="transaction-balance">{transaction.balance}</p>
              </div>
              <button
                className="transaction-button"
                onClick={() => navigate(`/transaction/${transaction.id}`)}
              >
                View Transactions
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
