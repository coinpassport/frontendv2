import WizardStep from '../components/WizardStep.js';
import { __ } from '../i18n.js';

export default function StillProcessing({ setStep, fetchAccountStatus }) {
  return (
    <WizardStep>
      <h2>{__`Verification Processing...`}</h2>
      <p>{__`Please refresh this page in a few minutes.`}</p>
      <span className="commands">
        <button onClick={()=>fetchAccountStatus()}>{__`Refresh Now`}</button>
      </span>
    </WizardStep>
  );
}

