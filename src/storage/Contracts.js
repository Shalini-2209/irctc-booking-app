import web3 from "web3";
import { IrctcABI } from "./IrctcABI";

const web = new web3("http://localhost:7545");

const RemixContract = new web.eth.Contract(
  IrctcABI,
<<<<<<< HEAD
  "0x8f2B32Fac33A5709Bf6fa4F57A325Fe9De6fC855"
=======
  `${process.env.REACT_APP_CONTRACT_KEY}`
>>>>>>> main
);

export default { web, RemixContract };
