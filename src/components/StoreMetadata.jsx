
import { NFTStorage } from "nft.storage";
import { NFT_STORAGE_API_KEY } from "../../constants";
export const StoreMetadata = async (poster, Name, Description, ipfslinks) => {

  console.log("Preparing Metadata ....");
  const nft = {
    image: poster,
    name: Name,
    description: Description,
    proofs: ipfslinks,
  };
  console.log("Uploading Metadata to IPFS ....");
  const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });
  const metadata = await client.store(nft, {});
  console.log(metadata);
  console.log("NFT data stored successfully 🚀🚀");
  console.log("Metadata URI: ", metadata.url);
  // SetMetadataURI(metadata.url);

  return metadata;
};
