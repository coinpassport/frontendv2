import WizardStep from '../components/WizardStep.js';
import { __ } from '../i18n.js';

export default function ErrorPage() {
  return (
    <WizardStep>
      <span class="msg">{__`Your wallet is connected to an unsupported chain!`}</span>
    </WizardStep>
  );
}


