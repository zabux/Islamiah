import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layouts';
import Loading from '../../components/Loading';
import ErrorCard from '../../components/ErrorCards';
import QuotesCard from '../../components/quotes/QuotesCard';

const quotes = [
  "Sesungguhnya sesudah kesulitan itu ada kemudahan. - QS. Al-Insyirah: 6",
  "Dan mintalah pertolongan (kepada Allah) dengan sabar dan shalat. - QS. Al-Baqarah: 45",
  "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya. - QS. Al-Baqarah: 286",
  "Bersabarlah, sesungguhnya Allah bersama orang-orang yang sabar. - QS. Al-Anfal: 46",
  "Dan barangsiapa bertawakkal kepada Allah, niscaya Allah akan mencukupkan (keperluannya). - QS. At-Talaq: 3",
  "Sesungguhnya Allah tidak akan mengubah keadaan suatu kaum sebelum mereka mengubah keadaan diri mereka sendiri. - QS. Ar-Ra'd: 11",
  "Dan apabila hamba-hamba-Ku bertanya kepadamu tentang Aku, maka (jawablah), bahwasanya Aku adalah dekat. - QS. Al-Baqarah: 186",
  "Dan janganlah kamu berputus asa dari rahmat Allah. - QS. Az-Zumar: 53",
  "Maka sesungguhnya bersama kesulitan ada kemudahan. - QS. Al-Insyirah: 5",
  "Dan janganlah kamu berjalan di muka bumi ini dengan sombong. - QS. Luqman: 18"
];

const QuotesPage = () => {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); // Change quote every 5 seconds

    setLoading(false); // Simulate loading complete
    setError(null); // Simulate no error

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout name="Islamic Quotes">
      <h1 className="text-3xl font-bold text-rose-500 mb-3">Islamic Quotes</h1>
      <p>Find inspiration and guidance from the words of the Quran.</p>

      {loading && <Loading message="Loading quotes..." />}
      {error && <ErrorCard message={`Failed to load: ${error}`} />}

      {!loading && !error && (
        <QuotesCard quote={quotes[index]} />
      )}
    </Layout>
  );
};

export default QuotesPage;