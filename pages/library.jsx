import React from "react";
import Song from "../src/components/Song";
import styles from "../styles/Home.module.css";
import { ListNFT } from "../src/components/ListNFT";
import { FetchNFTs } from "../src/components/ListNFT2";
import { Fetch } from "../src/components/Fetch";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import nftdata from "../abi.json";
import Viewcard from "../src/components/Viewcard";
// import { AudioPlayer } from "reactjs-media";


export default function Library() {
  const [songs, setSongs] = useState([]);
  const [data, setData] = useState({});
  async function create() {

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(nftdata.address, nftdata.abi, provider);
      let ledger = await contract.tokencounter();

      const tt = [];
      for (let i = 0; i < parseInt(ledger); i++) {
        tt.push(i);
      }
      setSongs(tt);
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
        <h1 className={styles.heading}>Song Library</h1>
        <div >
          {songs ? (songs.map((song, key) => {
            return (
              <Viewcard data={song} key={key} />
            )
          }))
            : (
              <a>No Songs Found </a>
            )}
          {/* <Song /> */}
        </div>
      </div>
    </>
  );
}
