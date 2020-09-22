import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="site-header">
        <h1>
          <Link href="/">
            <a className="logotype">Jon Stuebe</a>
          </Link>
        </h1>
      </header>
    </>
  );
}
