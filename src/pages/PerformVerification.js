import { useSignMessage } from 'wagmi';
import WizardStep from '../components/WizardStep.js';
import Loader from '../components/Loader.js';
import { __ } from '../i18n.js';

export default function PerformVerification({ accountStatus, feePaidBlock, chainId, account, SERVER_URL }) {
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: feePaidBlock?.toString(),
    onSuccess: async (signature) => {
      const response = await fetch(`${SERVER_URL}/verify`, {
        method: 'POST',
        body: JSON.stringify({ chainId, account, signature }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });
      const data = await response.json();
      if(data.error) {
        alert('Error: ' + data.error);
        return;
      }
      document.location = data.redirect;
    },
  });
  return (
    <WizardStep>
      <h2>{__`Step 3: Perform Verification`}</h2>
      <p>{__`Next, prove your ownership of the account by signing the block number of your fee payment. This operation costs no gas.`}</p>
      <p>{__`You will then be redirected to Stripe's website where you will take pictures of your passport and your face.`}</p>
      {accountStatus.status === 'requires_input' && (
        <div className="active">
          <span className="msg">{__`Further Input Required`}</span>
          <span className="subtext">{__`Possible reasons:`}</span>
          <ul>
            <li>{__`Verification canceled before completion`}</li>
            <li>{__`Submitted verification images did not validate`}</li>
          </ul>
          <span className="subtext">{__`Please try again.`}</span>
        </div>)}
      <span className="commands">
        <button disabled={isError || isLoading || isSuccess} onClick={() => signMessage?.()}>{__`Perform Verification`}{isLoading && <Loader />}</button>
        {isSuccess && <p>{__`Redirecting...`}</p>}
      </span>
    </WizardStep>
  );
}

