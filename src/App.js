/* eslint-disable no-undef */
// @ts-nocheck
import './App.css';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import MetaCoin from './MetaCoin.json';


// eslint-disable-next-line no-undef
const web3 = new Web3(window.ethereum)

const doThings = async () => {
  const accs = await ethereum.request({ method: 'eth_requestAccounts' });
  console.log('version', web3.version)
  await window.ethereum.enable();
  const accounts = await web3.eth.getAccounts()

  // @ts-expect-error
  const contract = new web3.eth.Contract(MetaCoin.abi, '0x9FD8F608456f11d74530665Dcff24C11661FeBA2')

  const balance = await contract.methods.getBalance(accounts[0]).call()
  console.log({ accounts, contract, balance });
  return { acc: accounts[0], mb: balance }
}

const sendThing = async (recp) => {
  //@ts-expect-error
  // eslint-disable-next-line no-undef
  window.eth = ethereum;
  // eslint-disable-next-line no-undef
  // eslint-disable-next-line no-undef
  // const call = await ethereum.request({ method: 'eth_call' });

  const accounts = await web3.eth.getAccounts()
  // const defAccount = web3.eth.defaultAccount = '0xb9554a1d21E1D3E8344Eb14b7Aaa4Dc7d1331CA4'
  // @ts-expect-error
  const contract = new web3.eth.Contract(MetaCoin.abi, '0x9FD8F608456f11d74530665Dcff24C11661FeBA2');

  const res = await contract.methods.sendCoin(recp, 233).send({
    from: accounts[0],
  });

  console.log({ res, accounts });
}

function App() {
  const [account, setAccount] = useState('');
  const [metaBalance, setMetaBalance] = useState('');
  const [recipient, setRecipient] = useState('')
  useEffect(() => {
    doThings().then((res) => {
      const { acc, mb } = res
      setAccount(acc);
      setMetaBalance(mb)
    });
  }, [])

  return (
    <div>
      <div>
        {account}
      </div>
      <div>
        MetaCoin: {metaBalance}
      </div>

      <input type="text" onChange={(e) => setRecipient(e.target.value)} value={recipient}></input>
      <button onClick={() => {
        sendThing(recipient);
      }}>Send the money</button>
    </div>
  );
}

export default App;
