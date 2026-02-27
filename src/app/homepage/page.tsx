import type { Metadata } from 'next';
import HomepageInteractive from './components/HomepageInteractive';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'SalamTech - Votre Tech, Simplement',
  description: 'Découvrez les derniers smartphones, laptops et accessoires tech au Maroc. Commander directement via WhatsApp.',
};

export default function Homepage() {
  return (
    <>
      <HomepageInteractive />
      <Footer />
    </>
  );
}