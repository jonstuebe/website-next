import Link from "next/link";
import dynamic from "next/dynamic";

const ThemeSwitcher = dynamic(() => import("./ThemeSwitcher"), {
  ssr: false,
  loading: () => <div className="py-0 px-2 m-0" style={{ width: 20 }} />,
});

export function Header() {
  return (
    <header className="flex justify-between items-center">
      <Link passHref href="/">
        <a className="dark:text-white text-black no-underline select-none">
          <h2 className="">Jon Stuebe</h2>
        </a>
      </Link>
      <nav className="flex space-x-4">
        <Link passHref href="/">
          <a className="hidden md:inline-flex text-base text-gray-800 dark:text-gray-400 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium no-underline select-none">
            home
          </a>
        </Link>

        <Link passHref href="/blog">
          <a className="text-base text-gray-800 dark:text-gray-400 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium no-underline select-none">
            blog
          </a>
        </Link>

        <Link passHref href="/notes">
          <a className="text-base text-gray-800 dark:text-gray-400 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium no-underline select-none">
            notes
          </a>
        </Link>

        <ThemeSwitcher />
      </nav>
    </header>
  );
}
