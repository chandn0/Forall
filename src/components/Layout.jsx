import React, { useState } from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

export default function Layout({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [address, setAddress] = useState("");
  function handleClick() {
    setIsExpanded(!isExpanded);
  }

  async function connect() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log({ accounts });
    setAddress(accounts[0]);
  }

  return (
    <>
      <header>
        <nav className={styles.navbar}>
          <span className={styles.logo}>
            <Link href={"/"}>Proof</Link>
          </span>
          <ul
            className={
              isExpanded === false
                ? styles.navmenu
                : styles.navmenu + " " + styles.active
            }
          >
            <li className={styles.navitem}>
              <Link href="/">
                <a className={styles.navlink}>Home</a>
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/create">
                <a className={styles.navlink}>Submit</a>
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/library">
                <a className={styles.navlink}>View</a>
              </Link>
            </li>
            <li className={styles.navitem}>
              <a className={styles.navlink}>
                {" "}
                {!address ? (
                  <button className={styles.button} onClick={connect}>
                    Connect
                  </button>
                ) : (
                  <a className={styles.connectButtontext}>
                    {" "}
                    {address.slice(0, 6)}.{address.slice(38)}{" "}
                  </a>
                )}
              </a>
            </li>
          </ul>
          <button
            onClick={handleClick}
            className={
              isExpanded === false
                ? styles.hamburger
                : styles.hamburger + " " + styles.active
            }
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </nav>
      </header>

      {children}

      {/* footer */}
      <div className={styles.container}>
        <footer className={styles.footer}>
          Built by{" "}
          <a
            target="_blank"
            href="https://twitter.com/Chandan1_"
            rel="noopener noreferrer"
          >
            Chandan
          </a>
        </footer>
      </div>
    </>
  );
}
