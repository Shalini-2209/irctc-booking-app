import web3 from "web3";
import { IrctcABI } from "./IrctcABI";

const web = new web3("http://localhost:7545");

const RemixContract = new web.eth.Contract(
  IrctcABI,
  "0x99b09935086998616E808779AF13D8141c29F2Ab"
);

export default { web, RemixContract };
