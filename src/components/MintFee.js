import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import WizardStep from '../components/WizardStep.js';
import Loader from '../components/Loader.js';
import { __ } from '../i18n.js';

import exampleFeeTokenABI from '../ExampleFeeToken.json';

export default function PayFee({ feeAmount, feeContract }) {
  const { address } = useAccount();
  const { config, refetch, isError } = usePrepareContractWrite({
    address: feeContract,
    abi: exampleFeeTokenABI,
    functionName: 'mint',
    args: [address, feeAmount],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  return (
    <WizardStep>
      <h2>{__`Test Mode: Mint Fee`}</h2>
      <p>{__`Click this button to mint the test fee amount.`}</p>
      <span className="commands">
        <button disabled={!write || isError || isLoading || isSuccess} onClick={() => write?.()}>{__`Mint Test Fee`}{isLoading && <Loader />}</button>
        {isSuccess && <p>{__`Transaction confirmed!`}</p>}
      </span>
    </WizardStep>
  );
}

