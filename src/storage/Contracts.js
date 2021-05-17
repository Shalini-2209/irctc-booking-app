import web3 from "web3";
import { IrctcABI } from "./IrctcABI";

const web = new web3("http://localhost:7545");

const RemixContract = new web.eth.Contract(
  IrctcABI,
  "0x77466360AA6bc277369863c36bce93B9e7B4067e"
);

export default { web, RemixContract };
