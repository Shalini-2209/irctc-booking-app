import web3 from "web3";
import { IrctcABI } from "./IrctcABI";

const web = new web3("http://localhost:7545");

const RemixContract = new web.eth.Contract(
  IrctcABI,
  "0x8f2B32Fac33A5709Bf6fa4F57A325Fe9De6fC855"
);

export default { web, RemixContract };
