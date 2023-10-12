import React, { useState, useEffect } from 'react';
import { useAccount, useNetwork, erc20ABI, useContractReads } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import Approve from '../pages/Approve.js';
import PayFee from '../pages/PayFee.js';
import PerformVerification from '../pages/PerformVerification.js';
import PublishVerification from '../pages/PublishVerification.js';
import Verified from '../pages/Verified.js';
import StillProcessing from '../pages/StillProcessing.js';
import ErrorPage from '../pages/ErrorPage.js';
import LoadingPage from '../pages/LoadingPage.js';
import InvalidChain from '../pages/InvalidChain.js';
import LimitReached from '../pages/LimitReached.js';

import verificationABI from '../Verification.json';
import contracts from '../contracts.js';

const SERVER_URL = 'https://bix2edxaxhackkkd7nmifx6x4q0oqinz.lambda-url.us-west-2.on.aws';

export default function Wizard() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const chainId = '0x' + chain.id.toString(16);
  const [accountStatus, setAccountStatus] = useState(null);

  const pageHeuristic = () => {
    if(!data || !accountStatus) setStep(0);
    else if(data[4] === true) setStep(5);
    else if(accountStatus.verificationAllowed === false) setStep(6);
    else if(accountStatus.status === 'requires_input'
          || (accountStatus.feePaidChain === chainId
            && accountStatus.feePaidBlock < data[3].toNumber())
          || (accountStatus.status !== 'verified'
            && accountStatus.status !== 'processing'
            && data[3].toNumber() > 0)) setStep(3);
    else if(accountStatus.status === 'verified') setStep(4);
    else if(accountStatus.status === 'processing') setStep(7);
    else if(data[0].gte(data[2])) setStep(2);
    else setStep(1);
  }

  const fetchAccountStatus = async () => {
    const response = await fetch(`${SERVER_URL}/account-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({ chainId, account: address })
    });

    const jsonData = await response.json();
    setAccountStatus(jsonData);
    pageHeuristic();
  };
  useEffect(() => {
    fetchAccountStatus();
  }, [address, chainId]);

  const contractAddresses = contracts[chainId] || {};
  const toRead = [
      { // 0
        address: contractAddresses.FeeToken,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [address, contractAddresses.Verification]
      },
      { // 1
        address: contractAddresses.FeeToken,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [address]
      },
      { // 2
        address: contractAddresses.Verification,
        abi: verificationABI,
        functionName: 'getFeeAmount',
      },
      { // 3
        address: contractAddresses.Verification,
        abi: verificationABI,
        functionName: 'feePaidFor',
        args: [address]
      },
      { // 4
        address: contractAddresses.Verification,
        abi: verificationABI,
        functionName: 'addressActive',
        args: [address]
      },
      { // 5
        address: contractAddresses.Verification,
        abi: verificationABI,
        functionName: 'addressExpiration',
        args: [address]
      },
      { // 6
        address: contractAddresses.Verification,
        abi: verificationABI,
        functionName: 'isOver18',
        args: [address]
      },
      { // 7
        address: contractAddresses.Verification,
        abi: verificationABI,
        functionName: 'isOver21',
        args: [address]
      },
      { // 8
        address: contractAddresses.Verification,
        abi: verificationABI,
        functionName: 'getCountryCode',
        args: [address]
      }
    ];
  const { status, data, isError, isLoading } = useContractReads({
    contracts: toRead,
    watch: true,
    onSuccess: (data) => {
      pageHeuristic();
    }
  });
  const [step, setStep] = useState(0);
  return (
    <div id="body-bg">
        <header>
          <nav>
            <h1>CoinPassport</h1>
          </nav>
          <ConnectButton />
        </header>
    { !(chainId in contracts) ? (<InvalidChain />)
    : isLoading || step === 0 ? (<LoadingPage />)
    : isError ? (<ErrorPage />)
    : step === 7 ? (<StillProcessing setStep={setStep} fetchAccountStatus={fetchAccountStatus} />)
    : step === 6 ? (<LimitReached setStep={setStep} />)
    : step === 5 ? (<Verified setStep={setStep} chain={chain} accountStatus={accountStatus} expiration={data[5].toNumber()} isOver18={data[6]} isOver21={data[7]} countryCodeInt={data[8].toNumber()} chainId={chainId} account={address} SERVER_URL={SERVER_URL} contract={contractAddresses.Verification} fetchAccountStatus={fetchAccountStatus} />)
    : step === 4 ? (<>
      <PublishVerification chain={chain} accountStatus={accountStatus} contract={contractAddresses.Verification} />
      {data[0] && data[0].gte(data[2]) ? <PayFee myBalance={data[1]} feeAmount={data[2]} contract={contractAddresses.Verification} testMode={chain.testnet} feeContract={contractAddresses.FeeToken} /> : <Approve feeAmount={data[2]} feeContract={contractAddresses.FeeToken} contract={contractAddresses.Verification} />}
    </>)
    : step === 3 ? (<PerformVerification accountStatus={accountStatus} feePaidBlock={data[3]} chainId={chainId} account={address} SERVER_URL={SERVER_URL} />)
    : step === 2 ? (<PayFee myBalance={data[1]} feeAmount={data[2]} contract={contractAddresses.Verification} testMode={chain.testnet} feeContract={contractAddresses.FeeToken} />)
    : step === 1 ? (<Approve feeAmount={data[2]} feeContract={contractAddresses.FeeToken} contract={contractAddresses.Verification} />)
    : <ErrorPage /> }
    </div>
  );
}
