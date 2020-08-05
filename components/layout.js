import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>SRC Election Software</title>
      </Head>

      <header>
        <h1>SRC Election Software</h1>
        {!home && (
          <Link href="/dashboard">
            <a>← Back to dashboard</a>
          </Link>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
}
