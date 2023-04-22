export default function VerifiedAndRedacted({ setStep }) {
  return (
    <div>
      <div>Account is active and verified</div>
      <button onClick={() => setStep(1)}>Revoke</button>
    </div>
  );
}

