import { useEffect, useState } from 'react'
import QuotesCard from '../../components/quotes/QuotesCard'
import ErrorCard from '../../components/ErrorCards'
import Layout from '../../components/Layouts'
import Loading from '../../components/Loading'

export default function Quotes() {
  const [quotes, setQuotes] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null) // Mengubah tipe error menjadi objek untuk detail

  // Fetch data
  useEffect(() => {
    setLoading(true)
    setError(null) // Reset error sebelum melakukan fetch
    fetch('https://api.hadithapi.com/v1/hadiths/random', {
      headers: {
        'Authorization': 'Bearer $2y$10$eQoMPZw9CmQ11eJDgSLaOI34keRpudEW8Phsci3tNHgacAmDSb6i' // Ganti YOUR_API_KEY dengan API key Anda
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setQuotes([data.hadith]) // Mengubah data menjadi array agar sesuai dengan map
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        setError(err.message)
      })
  }, [])

  return (
    <Layout name="Quotes">
      <h1 className="text-3xl font-bold text-rose-500 mb-3">Kumpulan Quotes Islami</h1>

      <p>Berikut ini adalah kumpulan quotes inspiratif Islami.</p>

      {loading && <Loading message="Memuat quotes..." />}
      {error && (
        <ErrorCard message={`Gagal memuat data: ${error}`} />
      )}

      {quotes && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mt-4">
          {quotes.map((quote, i) => (
            <QuotesCard quote={quote} key={i} />
          ))}
        </div>
      )}
    </Layout>
  )
}