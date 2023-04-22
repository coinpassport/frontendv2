import WizardStep from '../components/WizardStep.js';
import { __ } from '../i18n.js';

export default function LimitReached() {
  return (
    <WizardStep>
      <h2>{__`New Verifications Temporarily Unavailable`}</h2>
      <p>{__`As a safeguard, the verification limit has been reached temporarily.`}</p>
      <p>{__`Please try again soon.`}</p>
    </WizardStep>
  );
}


