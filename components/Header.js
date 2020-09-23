import Link from "next/link";
import dynamic from "next/dynamic";

const ThemeSwitcher = dynamic(() => import("./ThemeSwitcher"), { ssr: false });

export default function Header() {
  return (
    <>
      <header className="site-header">
        <h1>
          <Link href="/">
            <a className="logotype">Jon Stuebe</a>
          </Link>
        </h1>
        <ThemeSwitcher />
      </header>
    </>
  );
}
