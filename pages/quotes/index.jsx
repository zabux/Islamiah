import { useEffect, useState } from 'react'
import QuotesCard from '../../components/quotes/QuotesCard'
import ErrorCard from '../../components/ErrorCards'
import Layout from '../../components/Layouts'
import Loading from '../../components/Loading'

export default function Quotes() {
  const [quotes, setQuotes] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // Fetch data
  useEffect(() => {
    setLoading(true)
    fetch('https://api.quotable.io/quotes')
      .then((res) => res.json())
      .then(({ results }) => {
        setQuotes(results)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }, [])

  return (
    <Layout name="Quotes">
      <h1 className="text-3xl font-bold text-rose-500 mb-3">Kumpulan Quotes</h1>

      <p>Berikut ini adalah kumpulan quotes inspiratif.</p>

      {loading && <Loading message="Memuat quotes..." />}
      {error && (
        <ErrorCard message="Gagal memuat data, silakan periksa koneksi internet Anda lalu refresh halaman ini." />
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