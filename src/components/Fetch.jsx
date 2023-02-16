import { Web3Storage } from "web3.storage";
import { WEB3STORAGE_TOKEN } from "../../constants";
import axios from "axios";
function GetAccessToken() {
    return WEB3STORAGE_TOKEN;
}

function MakeStorageClient() {
    return new Web3Storage({ token: GetAccessToken() });
}

export const Fetch = async (cid) => {
    try {
        console.log("Uploading Audio to IPFS with web3.storage....");
        console.log(cid)
        const tt = cid.replace("://", "/");
        let dd = await axios.get(`https://gateway.ipfs.io/${tt}`);
        console.log(dd);
        const data = {
            name: dd.data.name,
            description: dd.data.description,
            image: dd.data.image,
            audio: dd.data.external_url.audio,
            video: dd.data.external_url.video,
        }

        const client = MakeStorageClient();
        const res = await client.get(data.audio);
        if (!res.ok) {
            throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`)
        }
        const files = await res.files();
        // console.log(files);
        data.audio = `https://ipfs.io/ipfs/${data.audio}/${files[0].name}`;


        const res1 = await client.get(data.video);
        if (!res1.ok) {
            throw new Error(`failed to get ${cid} - [${res1.status}] ${res1.statusText}`)
        }
        const files1 = await res1.files();
        data.video = `https://ipfs.io/ipfs/${data.video}/${files1[0].name}`;
        console.log(data);

        return data;
    } catch (err) {
        console.log(err);
    }
};
