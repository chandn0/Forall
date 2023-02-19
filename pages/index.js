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
        <h3 className={styles.heading}>
          Did you find someone misusing their power, but you do not have the courage to speak up?
          <br />
          <br />
          Submit the proof and let others take charge.
        </h3>
      </main>
      <div className={styles.features}>
        {/* <h2 className={styles.heading}>Key Features</h2> */}
        <ul className={styles.feature}>
          <li>You real world identity can not  be traced</li>
          <li>Proofs are stored in form of NFT allowing you to trade</li>
          <li>All the proofs are stored on-chain can not be Destroyed</li>
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
