import WizardStep from '../components/WizardStep.js';
import { __ } from '../i18n.js';

export default function ErrorPage() {
  return (
    <WizardStep>
      <h2>{__`An Error Has Occurred`}</h2>
    </WizardStep>
  );
}

