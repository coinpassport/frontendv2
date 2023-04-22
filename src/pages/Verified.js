import React, { useState } from 'react';
import { useSignMessage } from 'wagmi';
import WizardStep from '../components/WizardStep.js';
import Loader from '../components/Loader.js';
import PersonalData from '../pages/PersonalData.js';
import { __ } from '../i18n.js';

export default function Verified({ setStep, expiration, isOver18, isOver21, countryCodeInt, accountStatus, chain, chainId, account, SERVER_URL, contract }) {
  const expirationText = (new Date(expiration * 1000)).toLocaleDateString();
  const countryCodeStr = String.fromCharCode(countryCodeInt >> 16)
    + String.fromCharCode(countryCodeInt - ((countryCodeInt >> 16) << 16));

  const [personalData, setPersonalData] = useState();

  // TODO add nonces to signatures
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: 'Fetch Personal Data',
    onSuccess: async (signature) => {
      const response = await fetch(`${SERVER_URL}/fetch-personal-data`, {
        method: 'POST',
        body: JSON.stringify({ chainId, account, signature }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });
      const data = await response.json();
      if(data.error) {
        alert('Error: ' + data.error);
        return;
      }
      setPersonalData(data);
    },
  });


  if(personalData) return (<PersonalData accountStatus={accountStatus} data={personalData} setPersonalData={setPersonalData} contract={contract} />);
  return (
    <WizardStep>
      <span className="msg">
        {__`Your account is verified and active on ${chain.name}!`}
      </span>
      <dl>
        <dt>{__`Passport Expiration Date`}</dt>
        <dd>{expirationText}</dd>
        <dt>{__`Public Personal Data`}</dt>
        <dd>
          {isOver18 || isOver21 || countryCodeInt ? `
            ${ [ isOver18 ? __`Over 18` : false,
                  isOver21 ? __`Over 21` : false,
                  countryCodeInt ? __`Country Code (${countryCodeStr})` : false ]
                .filter(x => !!x)
                .join(', ') }
          ` : `${__`None Published`}`}
        </dd>
      </dl>
      <span className="subtext">
        {__`You may verify a new passport after this date or after revoking the current verification.`}
      </span>
      {isOver18 && isOver21 && countryCodeInt ? (
        <span className="subtext">
          {__`All of your available personal data points have been published publicly on chain.`}
        </span>
      ) : accountStatus.redacted ? (
        <span className="subtext">
          ${__`Since you have already redacted your personal data, you may no longer publish any of your personal data publicly. You must verify your passport again to publish your personal data publicly.`}
        </span>
      ) : (
      <>
      <span className="subtext">
        {__`Some applications will use optional public personal data: your country of residence and whether you are over 18 or 21 years of age. If you would like to publish one or more of these data points, please click the button below to sign a message proving your ownership of your account to fetch your personal data points.`}
      </span>
      <span className="commands">
        <button disabled={isLoading} onClick={() => signMessage?.()}>
          {__`Fetch Personal Data`}
          {isLoading && <Loader />}
        </button>
      </span>
      </>
      )}
      <span className="subtext">
        {__`If you would like to publish your verification on another chain, change the connected blockchain in your wallet or with the selector above.`}
      </span>
      <span className="subtext">
        {__`If you would like to revoke your verification, you must first redact your personal information.`}
      </span>
      <span className="subtext">
        {__`The 'Redact' button below will remove your personal data from Coinpassport and Stripe servers but will not remove any personal data points published publicly on chain.`}
      </span>
      <span className="commands">
        <button disabled={accountStatus.redacted}>
          {__`Redact Personal Information`}
        </button>
        <button id="revokeBtn" disabled={!accountStatus.redacted}>
          {__`Revoke Verification`}
        </button>
      </span>
    </WizardStep>
  );
}

