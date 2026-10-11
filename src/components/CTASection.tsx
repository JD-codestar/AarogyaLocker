/**
 * CTASection.tsx — Final call-to-action before the footer.
 *
 * Includes a prominent "Find a Doctor" button and a friendly closing message.
 */

interface CTASectionProps {
  onFindDoctor: () => void;
}

export default function CTASection({ onFindDoctor }: CTASectionProps) {
  return (
    <section className="cta-section" aria-labelledby="cta-heading">
      <div className="container">
        <h2 id="cta-heading">
          Ready to Take the Next Step?
        </h2>
        <p>
          Start your journey to better healthcare today. Find a doctor, book an appointment, and take control of your well-being.
        </p>
        <div className="cta-actions">
          <button
            type="button"
            className="btn btn-large btn-white"
            onClick={onFindDoctor}
          >
            Find a Doctor
          </button>
          <a
            href="#how-it-works"
            className="btn btn-large btn-outline-white"
          >
            Learn How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
