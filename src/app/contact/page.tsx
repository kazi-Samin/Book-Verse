import { MapPin, Mail, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-container-max mx-auto px-margin-desktop py-12">
      <div className="mb-12 text-center">
        <h1 className="font-section-title text-4xl font-bold text-on-background mb-4">Contact Us</h1>
        <p className="font-body-main text-on-surface-variant max-w-2xl mx-auto">
          Have a question or need assistance? We're here to help. Reach out to our support team and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="bg-surface rounded-xl p-8 border border-outline-variant whisper-shadow">
          <form className="space-y-6">
            <div>
              <label className="block font-label-caps text-label-caps text-on-background uppercase tracking-widest mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block font-label-caps text-label-caps text-on-background uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block font-label-caps text-label-caps text-on-background uppercase tracking-widest mb-2">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button
              type="button"
              className="w-full py-4 bg-primary text-on-primary rounded-lg font-body-main font-semibold hover:opacity-90 transition-all active:scale-95"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-surface rounded-xl p-8 border border-outline-variant whisper-shadow flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-card-title text-xl font-bold text-on-background mb-2">Our Office</h3>
              <p className="font-body-main text-on-surface-variant">
                123 Literary Avenue<br />
                Book District, BD 1000<br />
                United States
              </p>
            </div>
          </div>

          <div className="bg-surface rounded-xl p-8 border border-outline-variant whisper-shadow flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary-fixed/30 flex items-center justify-center text-secondary flex-shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-card-title text-xl font-bold text-on-background mb-2">Email Us</h3>
              <p className="font-body-main text-on-surface-variant mb-1">support@bookverse.com</p>
              <p className="font-body-main text-on-surface-variant">authors@bookverse.com</p>
            </div>
          </div>

          <div className="bg-surface rounded-xl p-8 border border-outline-variant whisper-shadow flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-tertiary-fixed/50 flex items-center justify-center text-tertiary flex-shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-card-title text-xl font-bold text-on-background mb-2">Call Us</h3>
              <p className="font-body-main text-on-surface-variant mb-1">+1 (555) 123-4567</p>
              <p className="font-caption text-on-surface-variant">Mon-Fri, 9am - 6pm EST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
