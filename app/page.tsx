import Header from './components/Header';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import CtaBanner from './components/CtaBanner';
import ContactForm from './components/ContactForm';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Introduction />
      <CtaBanner />
      <ContactForm />
    </main>
  );
}
