import Head from "next/head";
import Image from "next/image";
import nftstorage from "../src/assets/nftstorage.svg";
import web3storage from "../src/assets/web3storage.svg";
import polygon from "../src/assets/polygon.svg";
import ipfs from "../src/assets/ipfs.png";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Proof</title>
        <meta name="description" content="ipfs and NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.hero_img}>
          {/* <Image src={landing} /> */}
        </div>
        <h3 className={styles.mainheading}>
          If you have evidence of someone misusing their power but feel hesitant to speak up due to concerns about potential repercussions, our platform provides a safe and anonymous way to report the misconduct. By submitting your proof, you can empower others to take action and hold the individual accountable
        </h3>
      </main>
      <div className={styles.features}>
        {/* <h2 className={styles.heading}>Key Features</h2> */}
        <ul className={styles.mainfeature}>
          <li>To ensure your anonymity, we do not require you to reveal your real-world identity when submitting your evidence. We take this protection very seriously and use a variety of security measures to safeguard your identity.</li>
          <li>In addition, all proofs submitted to our platform are stored in the form of NFTs (Non-Fungible Tokens), a type of digital asset that provides unique ownership and authenticity to the content. This means that you can retain ownership of your proof and even trade it if you wish to do so.</li>
          <li>Moreover, all the proofs submitted to our platform are stored on-chain, meaning that they are recorded on a blockchain, a decentralized and tamper-proof digital ledger. This ensures that your proof cannot be destroyed, altered, or lost.</li>
          <li>With our platform, you can take a stand against misconduct and make a difference while protecting your anonymity and your evidence.</li>
        </ul>
      </div>
      <div className={styles.features}>
        <h2 className={styles.heading}>How you can Upload</h2>
        <ul className={styles.feature}>
          <li>First upload you proofs to IPFS and save CIDs </li>
          <li>Move to submit page </li>
          <li>Add Title,Description and create an image and add the CID links </li>
          <li>Click on mint </li>
          <li>The contract Address: <a
            target="_blank"
            href={"https://etherscan.io/address/0x5f64a2f3c1b0e7b6e6b7b3d5a6f5afef099e4b36"}
            rel="noopener noreferrer"
          >Etherscan</a></li>
        </ul>

      </div>

      <div className={styles.sponsors}>
        <h2 className={styles.heading}>Powered By</h2>

        <div className={styles.sponsor_images}>
          <div className={styles.sponsor}>
            <Image src={polygon} />
          </div>
          <div className={`${styles.sponsor} ${styles.ipfs}`}>
            <Image src={ipfs} />
          </div>
          <div className={styles.sponsor}>
            <Image src={nftstorage} />
          </div>
          <div className={styles.sponsor}>
            <Image src={web3storage} />
            Web3.Storage
          </div>
        </div>
      </div>
    </div>
  );
}
