import web3 from "web3";
import { IrctcABI } from "./IrctcABI";

const web = new web3("http://localhost:7545");

const RemixContract = new web3.eth.Contract(
  IrctcABI,
  "0x5F9a0EDb812a07FC78982C5E5D811eEB9e2EbF46"
);

export default { web, RemixContract };
