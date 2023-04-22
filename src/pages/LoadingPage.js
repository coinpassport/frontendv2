import WizardStep from '../components/WizardStep.js';

export default function LoadingPage() {
  return (
    <WizardStep>
      <div className="lds-ring large"><div></div><div></div><div></div><div></div></div>
    </WizardStep>
  );
}

