import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Feature from '../components/Feature';
import chatIcon from '../assets/icon-chat.png';
import moneyIcon from '../assets/icon-money.png';
import securityIcon from '../assets/icon-security.png';
import { useAuth } from '../hooks/useAuth';

const Home: React.FC = () => {
  const { auth } = useAuth();

  return (
    <>
      <Header isAuthenticated={!!auth.token} />
      <main>
        <Hero />
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <Feature icon={chatIcon} title="You are our #1 priority" description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes." />
          <Feature icon={moneyIcon} title="More savings means higher rates" description="The more you save with us, the higher your interest rate will be!" />
          <Feature icon={securityIcon} title="Security you can trust" description="We use top of the line encryption to make sure your data and money is always safe." />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
