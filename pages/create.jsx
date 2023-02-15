import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { StoreContent } from "../src/components/StoreContent";
import { StoreMetadata } from "../src/components/StoreMetadata";
import { MintNFT2 } from "../src/components/MintNFT2";
import { MintNFT3 } from "../src/components/MintNFT3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import data from "../abi.json";

export default function Create() {
  const [minted, setMinted] = useState(false);
  // const [bannerUrl, updateBannerUrl] = useState(``);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  /// can be shared with friends to show the NFT
  const [musicCID, setMusicCID] = useState("");
  const [name, setName] = useState("");
  const [banner, setBanner] = useState([]);
  const [audio, setAudio] = useState([]);
  const [description, setDescription] = useState("");
  const [metadata, setMetadata] = useState("");
  const [txURL, setTxURL] = useState("");
  const [video, setVideo] = useState([]);
  const [folder, setFolder] = useState("");

  const notify = (message) => toast(`${message}`);

  async function connect() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log({ accounts });
    setAddress(accounts[0]);
    notify("Wallet connected");
    console.log(address);
  }

  /// uploads the audio to the Web3.storage
  // approved
  const uploadAudio = async () => {
    try {
      const cid1 = await StoreContent(video);
      console.log(cid1);
      // const cid2 = await StoreContent(Folder);
      // console.log(cid2)
      const cid = await StoreContent(audio);

      const data = {
        audio: cid,
        video: cid1,
      }
      const audioCID = `https://w3s.link/ipfs/${cid}`;
      console.log(audioCID);
      notify("Music file uploaded to IPFS");
      setMusicCID(audioCID);
      await uploadMetadata(name, data, description);
    } catch (err) {
      console.log(err);
      notify(err);
    }
  };

  /// uploads the Metadata for the NFT to NFT.
  // approved
  const uploadMetadata = async (Name, data, Description) => {
    try {
      const metadata = await StoreMetadata(banner, Name, data, Description);
      const uri = metadata.url;
      setMetadata(uri);
      notify("NFT metadata uploaded to IPFS");
      console.log(uri);
      await mintNFT(uri, address);
    } catch (err) {
      console.log(err);
    }
  };

  /// mints the NFT by calling the function
  const mintNFT = async (metadataURI, userAddress) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(data.address, data.abi, signer);
      let ledger = await contract.submitSentence(metadataURI);
      await ledger.wait();
      let tt = await provider.getTransactionReceipt(ledger.hash);
      console.log(tt);
      if (tt.status === 1) {
        toast.success("submited sentence");
        console.log("success");
      } else {
        toast.error("failed to submit sentence");
        console.log("fail");
      }
      setTxURL(response.transaction_external_url);
      notify("NFT minted ");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await uploadAudio();
      // await setTimeout(uploadMetadata(), 5000);
      // await mintNFT();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          {!minted ? (
            <>
              <h1 className={styles.heading}>Upload Music</h1>
              <div className={styles.upload_section}>
                <h3>Please fill all details</h3>
                <hr />
                <p>Title</p>
                <input
                  type="text"
                  placeholder="Closer"
                  value={name}
                  className={styles.song_name}
                  onChange={(e) => setName(e.target.value)}
                />
                <p>Description</p>
                <textarea
                  placeholder="happy song"
                  className={styles.song_description}
                  value={description}
                  cols="100"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <p>Image</p>
                <input
                  type="file"
                  // accept=".dr"
                  onChange={(e) => setBanner(e.target.files[0])}
                >
                </input>
                <p>Music File</p>
                <input
                  type="file"
                  accept=".mp3,audio/*"
                  onChange={(e) => setAudio(e.target.files[0])}
                />
                {audio && <audio src={audio} width="600px" muted />}
                <p>Video File</p>
                <input
                  type="file"
                  accept=".mp4"
                  onChange={(e) => setVideo(e.target.files[0])}
                />
                <div>
                  {/* {!address ? (
                    <>
                      <button className={styles.button} onClick={connect}>
                        Connect
                      </button>
                      <a>Or</a>
                      <input
                        type="text"
                        placeholder="Enter the wallet Address"
                        value={address}
                        className={styles.song_name}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </>
                  ) : (
                    <a className={styles.connectButtontext}>
                      {" "}
                      Address : {address.slice(0, 6)}....{address.slice(38)}{" "}
                    </a>
                  )} */}
                  <hr />
                  <button className={styles.button} onClick={handleSubmit}>
                    Upload Song
                  </button>
                  {/* <div> */}
                  {/* <button onClick={notify}>Notify!</button> */}
                  <ToastContainer />
                  {/* </div> */}
                </div>
              </div>
            </>
          ) : (
            <p>Audio uploaded and </p>
          )}
        </main>
      </div>
    </>
  );
}
