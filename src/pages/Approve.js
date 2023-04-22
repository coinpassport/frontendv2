import { useContractWrite, usePrepareContractWrite, erc20ABI } from 'wagmi';
import WizardStep from '../components/WizardStep.js';
import Loader from '../components/Loader.js';
import { __ } from '../i18n.js';

export default function Approve({ feeAmount, feeContract, contract }) {
  const { config } = usePrepareContractWrite({
    address: feeContract,
    abi: erc20ABI,
    functionName: 'approve',
    args: [contract, feeAmount],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  return (
    <WizardStep>
      <h2>{__`Step 1: Approve Fee`}</h2>
      <p>{__`Verifying your passport costs 3 USDC.`}</p>
      <p>{__`Please approve this amount.`}</p>
      <span className="commands">
        <button disabled={!write || isLoading || isSuccess} onClick={() => write?.()}>{__`Approve 3 USDC`}{isLoading && <Loader />}</button>
        {isSuccess && <p>{__`Transaction confirmed!`}</p>}
      </span>
    </WizardStep>
  );
}
