import React from "react";
import Song from "../src/components/Song";
import styles from "../styles/Home.module.css";
import { ListNFT } from "../src/components/ListNFT";
import { FetchNFTs } from "../src/components/ListNFT2";
import { Fetch } from "../src/components/Fetch";
import { useState, useEffect } from "react";
// import { AudioPlayer } from "reactjs-media";


export default function Library() {
  const [songs, setSongs] = useState([]);
  const [data, setData] = useState({});
  const fetchNFTs = async () => {
    try {
      const data = await Fetch("bafyreiafppw5smhbb33ir7tikl4tsfswq2zde5usrmm7sctzclj5yvyruu");
      console.log(data);
      setData(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <>
      <div className={styles.song_section}>
        <h1 className={styles.heading}>Song Library</h1>
        {data ? (
          <div>
            <audio src="https://ipfs.io/ipfs/bafybeiddb247eescxntb5eu4jlwvok6657533trfm47n3sk4ipfbnyk62a/Recording.m4a"
              controls />
            <video controls width="100%">
              <source src="https://ipfs.io/ipfs/bafybeibkifu2rr27v6bxsuseahewfermn4emab7zrnnbiq3d7qbdy22gra/2022-11-02-15-07-14.mp4" type="video/mp4" />
              Sorry, your browser doesnt support embedded videos.
            </video>
          </div>
        ) : (
          <a>No Songs Found </a>
        )}
        <div className={styles.songs}>
          {data ? (
            <div>
              {/* <AudioPlayer
                src="https://ipfs.io/ipfs/bafybeiddb247eescxntb5eu4jlwvok6657533trfm47n3sk4ipfbnyk62a/Recording.m4a"
              /> */}
            </div>
          ) : (
            <a>No Songs Found </a>
          )}
          <Song />
        </div>
      </div>
    </>
  );
}
