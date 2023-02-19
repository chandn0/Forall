import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Web3Storage } from "web3.storage";
import { WEB3STORAGE_TOKEN } from "../../constants";
import axios from "axios";
import nftdata from "../../abi.json";
import styles from "../../styles/Home.module.css";
import { useRouter } from 'next';

export default function Viewcard({ data }) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [ipfslinks, setIpfslinks] = useState([]);

    function GetAccessToken() {
        return WEB3STORAGE_TOKEN;
    }

    function MakeStorageClient() {
        return new Web3Storage({ token: GetAccessToken() });
    }

    async function fetchNFTs() {
        var customHttpProvider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com/v1/d0d3166eb686b4ef12177368021eb1043b95c067");

        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(nftdata.address, nftdata.abi, customHttpProvider);
        let ledger = await contract.tokenURI(data);
        console.log(ledger);

        try {
            const tt = ledger.replace("://", "/");
            let dd = await axios.get(`https://gateway.ipfs.io/${tt}`);
            console.log(dd);
            const data = {
                name: dd.data.name,
                description: dd.data.description,
                image: dd.data.image.replace("://", "/"),
                proofs: dd.data.proofs,
            }
            setName(data.name);
            setDescription(data.description);
            setImage(`https://gateway.ipfs.io/${data.image}`);
            var list = [];
            data.proofs.forEach(element => {
                list.push(`https://gateway.ipfs.io/ipfs/${element}`);
            });
            setIpfslinks(list);
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
            <div >
                {name ? (
                    <div>
                        <div className={styles.card} >
                            <div className={styles.card__content}>

                                <div className={styles.card__name}>Name: {name}</div>
                                <div className={styles.card__description}>Description: {description}</div>
                                IPFS-Links:
                                <br />
                                {
                                    ipfslinks.map((ipfslink, i) => {
                                        return <div key={i}><a
                                            target="_blank"
                                            href={ipfslink}
                                            rel="noopener noreferrer"
                                        >{i + 1}.{ipfslink}</a></div>
                                    })
                                }
                            </div>


                            <div className={styles.card__image}>
                                <img width="400px" src={image}></img>
                            </div>
                        </div>
                        <br />

                    </div>
                ) : (
                    <div>Loading...</div>
                )}


            </div>
        </>
    );


}