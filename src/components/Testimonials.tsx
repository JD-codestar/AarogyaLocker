/**
 * Testimonials.tsx — Sample patient testimonials.
 *
 * All testimonials are clearly labelled as fictional samples,
 * not real patient endorsements.
 */
import { testimonials } from '../data';

export default function Testimonials() {
  return (
    <section className="testimonials" aria-labelledby="testimonials-heading">
      <div className="container">
        <h2 className="section-title" id="testimonials-heading">
          What People Are Saying
        </h2>
        <p className="section-subtitle">
          Sample testimonials to illustrate the user experience.
        </p>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div className="card testimonial-card" key={t.id}>
              <blockquote className="testimonial-quote">
                "{t.quote}"
              </blockquote>
              <div className="testimonial-author">
                <div className="testimonial-avatar" aria-hidden="true">
                  {t.initials}
                </div>
                <div>
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="testimonials-disclaimer">
          ⓘ The testimonials above are fictional samples created for demonstration purposes. 
          They do not represent real patient endorsements or experiences.
        </p>
      </div>
    </section>
  );
}
