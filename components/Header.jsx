import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-rose-500 p-3 flex justify-between items-center">
      <div>
        <Link href="/">
          <a className="text-lg font-bold text-rose-50">𝐐𝐮𝐨𝐭𝐞𝐬 𝐈𝐬𝐥𝐚𝐦𝐢𝐜</a>
        </Link>
      </div>

      <nav className="text-rose-50">
        <ul className="flex space-x-4">
          <li>
            <Link href="/kalender">
              <a>Kalender</a>
            </Link>
          </li>
          <li>
            <Link href="/quotes">
              <a>Quotes</a>
            </Link>
          </li>
          <li>
            <Link href="/berita">
              <a>Berita</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}