import web3 from "web3";
import { IrctcABI } from "./IrctcABI";

const web = new web3("http://localhost:7545");

const RemixContract = new web.eth.Contract(
  IrctcABI,
  "0x0af0a0380AF1DDF0f1621D5686fd9209De03ADd0"
);

export default { web, RemixContract };
