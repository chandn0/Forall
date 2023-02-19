import React from "react";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import nftdata from "../abi.json";
import Viewcard from "../src/components/Viewcard";
import Head from "next/head";


export default function Library() {
  const [data, setdata] = useState([]);
  async function create() {

    try {
      var customHttpProvider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com/v1/d0d3166eb686b4ef12177368021eb1043b95c067");
      // const provider = new ethers.providers.Web3Provider("https://rpc-mumbai.maticvigil.com/v1/d0d3166eb686b4ef12177368021eb1043b95c067");
      const contract = new ethers.Contract(nftdata.address, nftdata.abi, customHttpProvider);
      let ledger = await contract.tokencounter();

      const tt = [];
      for (let i = 0; i < parseInt(ledger); i++) {
        tt.push(i);
      }
      setdata(tt);
      console.log(parseInt(ledger));
    } catch (err) {
      console.error(err);
    }
  };
  useState(() => {
    create();
  }, []);

  return (
    <>
      <div className={styles.song_section}>
        <Head>
          <title>Proof</title>
          <meta name="description" content="ipfs and NFTs" />
          <link rel="icon" href="/power.png" />
        </Head>
        <div >
          {data ? (data.map((song, key) => {
            return (
              <Viewcard data={song} key={key} />
            )
          }))
            : (
              <div className={styles.card} >
                <div>Loading...</div>
              </div>
            )}
        </div>
      </div>
    </>
  );
}
