import dotenv from "dotenv";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import {
  TonClient,
  WalletContractV4,
  SendMode,
  toNano,
  internal,
  beginCell,
  external,
  storeMessage,
  Cell,
} from "ton";
import { mnemonicToWalletKey } from "ton-crypto";
import nacl from "tweetnacl";
import naclUtil from "tweetnacl-util";
import { sensitiveHeaders } from "http2";

dotenv.config();

async function sendSignTransaction() {
  // Generate a new key pair (for demonstration purposes)
  const keyPairNew = nacl.sign.keyPair();
  const publicKey = keyPairNew.publicKey;
  const privateKey = keyPairNew.secretKey;

  // Data to be signed
  const message = 1000;
  const messageUint8 = naclUtil.decodeUTF8(message.toString());

  // Sign the data
  const signatureNew = nacl.sign.detached(messageUint8, privateKey);

  // Verify the signature
  const isValid = nacl.sign.detached.verify(
    messageUint8,
    signatureNew,
    publicKey
  );

  console.log("msgUint8", messageUint8);
  console.log("Public Key:", naclUtil.encodeBase64(publicKey));
  console.log("Signature:", naclUtil.encodeBase64(signatureNew));
  console.log("Is the signature valid?", isValid);
}

sendSignTransaction().catch(console.error);
