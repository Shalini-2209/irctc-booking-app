import web3 from "web3";
import { IrctcABI } from "./IrctcABI";

const web = new web3("http://localhost:7545");

const RemixContract = new web.eth.Contract(
  IrctcABI,
  `${process.env.REACT_APP_CONTRACT_KEY}`
);

export default { web, RemixContract };
