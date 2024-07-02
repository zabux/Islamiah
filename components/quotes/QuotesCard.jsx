export default function QuotesCard({ quote }) {
  return (
    <div className="shadow rounded-xl overflow-hidden hover:scale-105 duration-300">
      <div className="p-3">
        <h2 className="font-bold text-lg md:text-xl text-rose-400 mb-3">
          Islamic Quote
        </h2>
        <p className="text-right text-sm text-gray-500">
          {quote}
        </p>
      </div>
    </div>
  )
}