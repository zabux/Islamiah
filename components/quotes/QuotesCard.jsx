export default function QuotesCard({ quote }) {
  return (
    <div className="bg-white p-5 rounded shadow-md">
      <p className="text-xl font-semibold mb-3">"{quote.content}"</p>
      <p className="text-right text-sm text-gray-500">- {quote.author}</p>
    </div>
  )
}