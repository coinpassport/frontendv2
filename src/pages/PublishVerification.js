import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import WizardStep from '../components/WizardStep.js';
import Loader from '../components/Loader.js';
import { __ } from '../i18n.js';

import verificationABI from '../Verification.json';

export default function PublishVerification({ accountStatus, chain, contract }) {
  const { config, refetch, isError } = usePrepareContractWrite({
    address: contract,
    abi: verificationABI,
    functionName: 'publishVerification',
    args: [
      accountStatus.expiration.toString(),
      accountStatus.countryAndDocNumberHash,
      accountStatus.signature,
    ],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  const expirationText = (new Date(accountStatus.expiration * 1000)).toLocaleDateString();
  return (
    <WizardStep>
      <span className="msg">
        {__`Your account is verified but not yet active on ${chain.name}.`}
      </span>
      <dl>
        <dt>{__`Passport Expiration Date`}</dt>
        <dd>{expirationText}</dd>
      </dl>
      <span className="subtext">
        {__`Click the button below to publish your verification on this chain.`}
      </span>
      <span className="commands">
        <button disabled={!write || isError || isLoading || isSuccess} onClick={() => write?.()}>{__`Publish Verification`}{isLoading && <Loader />}</button>
        {isSuccess && <p>{__`Transaction confirmed!`}</p>}
      </span>
      <span className="subtext">
        {__`Otherwise, you may use the steps further below to begin a new passport verification.`}
      </span>
    </WizardStep>
  );
}


