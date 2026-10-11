/**
 * HowItWorks.tsx — Three-step process section.
 *
 * Shows the simple flow: Search → Choose → Confirm.
 * The connecting line between steps is done with a CSS pseudo-element.
 */
import { steps } from '../data';

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works" aria-labelledby="how-heading">
      <div className="container">
        <h2 className="section-title" id="how-heading">
          How It Works
        </h2>
        <p className="section-subtitle">
          Book your appointment in three simple steps.
        </p>

        <div className="steps-grid">
          {steps.map((step) => (
            <div className="step-card" key={step.number}>
              <div className="step-number" aria-hidden="true">
                {step.number}
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
