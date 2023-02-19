import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { StoreMetadata } from "../src/components/StoreMetadata";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import data from "../abi.json";
import Head from "next/head";
export default function Create() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [banner, setBanner] = useState([]);
  const [description, setDescription] = useState("");
  const [metadata, setMetadata] = useState("");
  const [txURL, setTxURL] = useState("");

  const [ipfslinks, setIpfslinks] = useState([]);
  const [link, setLink] = useState("");

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


  const uploadAudio = async () => {
    try {
      await uploadMetadata(name, description, ipfslinks);
    } catch (err) {
      console.log(err);
      notify(err);
    }
  };


  const uploadMetadata = async (Name, Description, ipfslinks) => {
    try {
      const metadata = await StoreMetadata(banner, Name, Description, ipfslinks);
      const uri = metadata.url;
      setMetadata(uri);
      notify("NFT metadata uploaded to IPFS");
      console.log(uri);
      await mintNFT(uri, address);
    } catch (err) {
      console.log(err);
    }
  };

  const mintNFT = async (metadataURI, userAddress) => {
    const chainId = 80001

    if (!window.ethereum.networkVersion == chainId) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(data.address, data.abi, signer);
        let ledger = await contract.safeMint(accounts[0], metadataURI);
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
    } else {
      alert("Please connect to Mumbai Testnet");
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await uploadAudio();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const addipfslinks = () => {
    setIpfslinks([...ipfslinks, link]);
    setLink("");
  }

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Proof</title>
          <meta name="description" content="ipfs and NFTs" />
          <link rel="icon" href="/power.png" />
        </Head>
        <main className={styles.main}>

          <h1 className={styles.heading}>Upload Proof</h1>
          <div className={styles.upload_section}>
            {/* <h3>Please fill all details</h3>
            <hr /> */}
            <p>Title</p>
            <input
              type="text"
              placeholder="Title"
              value={name}
              className={styles.song_name}
              onChange={(e) => setName(e.target.value)}
            />
            <p>Description</p>
            <textarea
              placeholder="What the proof is about?"
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
            {/* <hr /> */}

            <textarea
              placeholder="CID of the proofs. Click on add to add more proofs"
              className={styles.song_description1}
              value={link}
              cols="1"
              onChange={(e) => setLink(e.target.value)}
            ></textarea>
            {ipfslinks.map((link, key) => {
              return (
                <div key={key}>
                  <p>{link}</p>
                </div>
              );
            })}
            <button className={styles.button} onClick={addipfslinks}>Add</button>

            <br />
            <hr />
            <button className={styles.button} onClick={handleSubmit}>
              Mint
            </button>

            <ToastContainer />

          </div>
        </main>
      </div>
    </>
  );
}

