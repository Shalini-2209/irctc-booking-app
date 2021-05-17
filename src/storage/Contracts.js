import web3 from "web3";
import { IrctcABI } from "./IrctcABI";

const web = new web3("http://localhost:7545");

const RemixContract = new web.eth.Contract(
  IrctcABI,
  "0x273Afcdfd940e930426548857A2eE2675A757DA4"
);

export default { web, RemixContract };
