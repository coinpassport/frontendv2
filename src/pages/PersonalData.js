import React, { useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import WizardStep from '../components/WizardStep.js';
import Loader from '../components/Loader.js';
import { __ } from '../i18n.js';

import verificationABI from '../Verification.json';

export default function PersonalData({ setStep, data, setPersonalData, contract }) {
  const countryCodeStr = String.fromCharCode(data.countryCodeInt >> 16)
    + String.fromCharCode(data.countryCodeInt - ((data.countryCodeInt >> 16) << 16));
  const [publishOver18, setPublishOver18] = useState(false);
  const [publishOver21, setPublishOver21] = useState(false);
  const [publishCountry, setPublishCountry] = useState(false);
  const over18Click = (event) => setPublishOver18(event.target.checked);
  const over21Click = (event) => setPublishOver21(event.target.checked);
  const countryClick = (event) => setPublishCountry(event.target.checked);
  const { config, refetch, isError } = usePrepareContractWrite({
    address: contract,
    abi: verificationABI,
    functionName: 'publishPersonalData',
    args: [
      data.over18,
      publishOver18 ? data.over18Signature : '0x00',
      data.over21,
      publishOver21 ? data.over21Signature : '0x00',
      data.countryCodeInt,
      publishCountry ? data.countrySignature : '0x00',
    ],
  });
  const { txData, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onSuccess: () => {
      setPersonalData(null);
    }
  });
  return (
    <WizardStep>
      <span className="msg">
        {__`Select which data points to publish publicly`}
      </span>
      <dl>
        {(data.over18 || data.over21) && (
          <>
          <dt>{__`Minimum Age`}</dt>
          <dd>
            {data.over18 && (
              <label>
                <input type="checkbox" checked={publishOver18} onChange={over18Click} />
                {__`Over 18`}
              </label>
            )}
            {data.over21 && (
              <label>
                <input type="checkbox" checked={publishOver21} onChange={over21Click} />
                {__`Over 21`}
              </label>
            )}
          </dd>
          </>
        )}
        <dt>{__`Country Of Origin`}</dt>
        <dd>
          <label>
            <input type="checkbox" checked={publishCountry} onChange={countryClick} />
            {countryCodeStr}
          </label>
        </dd>
      </dl>
      <span className="commands">
        <button disabled={!write || isError || isLoading || isSuccess} onClick={() => write?.()}>{__`Publish Personal Data`}{isLoading && <Loader />}</button>
        {isSuccess && <p>{__`Transaction confirmed!`}</p>}
        <button className="cancel" onClick={() => setPersonalData(null)}>
          {__`Cancel`}
        </button>
      </span>
    </WizardStep>
  );
}


