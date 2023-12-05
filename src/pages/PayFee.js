import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import WizardStep from '../components/WizardStep.js';
import Loader from '../components/Loader.js';
import MintFee from '../components/MintFee.js';
import { __ } from '../i18n.js';

import verificationABI from '../Verification.json';

let prevBalance;

export default function PayFee({ myBalance, feeAmount, contract, testMode, feeContract }) {
  const { config, refetch, isError } = usePrepareContractWrite({
    address: contract,
    abi: verificationABI,
    functionName: 'payFee',
  });

  // TODO change to useEffect
  if(prevBalance && myBalance !== prevBalance) {
    refetch();
  }
  prevBalance = myBalance;

  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  return (
    <>
    {testMode && (<MintFee {...{feeContract, feeAmount}} />)}
    <WizardStep>
      <h2>{__`Step 2: Pay Fee`}</h2>
      <p>{__`A fee of 3 USDC is required to verify your passport.`}</p>
      <p>{__`This amount covers Stripe's fee as well as server expenses and any applicable taxes.`}</p>
      {myBalance < feeAmount && <p className="error">{__`Insufficient balance`}</p>}
      <span className="commands">
        <button disabled={!write || isError || isLoading || isSuccess} onClick={() => write?.()}>{__`Pay 3 USDC`}{isLoading && <Loader />}</button>
        {isSuccess && <p>{__`Transaction confirmed!`}</p>}
      </span>
    </WizardStep>
    </>
  );
}
