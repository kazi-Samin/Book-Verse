import Image from "next/image";
import Link from "next/link";
import { BookOpen, Users, Globe, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-container-max mx-auto px-margin-desktop py-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-section-v-space">
        <div className="space-y-6">
          <h1 className="font-hero-lg-mobile text-4xl font-bold text-on-background">
            Redefining the digital reading experience.
          </h1>
          <p className="font-body-main text-on-surface-variant text-lg">
            BookVerse was founded on a simple principle: reading should be an immersive, seamless, and joyous escape. We combine a passion for literature with cutting-edge technology to bring you a sanctuary for stories.
          </p>
          <p className="font-body-main text-on-surface-variant text-lg">
            Whether you're looking for physical editions delivered to your doorstep, or instant digital access on any device, BookVerse ensures your next favorite book is only a click away.
          </p>
        </div>
        <div className="relative aspect-video rounded-2xl overflow-hidden whisper-shadow border border-outline-variant/30">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBByZA9gsdOxtTXXU8e4rwUGbcOHu15JZdieind0h8_QtSsN-mYS3mtDS_JxFCOYmahrWsZQZpKIJwLcfw_RZtGAoCqkvOqs1eVdvzPYq5iV6HuvgRMldJkEsKRfT48HSRld2P02Ijcvu7gjmEtnJqLfP-_XY1OAjjvT_Gf-zQYOmJXnPl0l2QOLR_DwKDeqrbk7h9lN4_3XQIXN-knDtZRiymGEzKHUaXwU5nVVF_KG31QGc-g2KehheGcySPk4HtFl-RzpR9RlWM" 
            alt="Library aesthetic" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="bg-surface-container py-16 px-8 rounded-2xl mb-section-v-space">
        <div className="text-center mb-12">
          <h2 className="font-section-title text-3xl font-bold text-on-background mb-4">Our Core Values</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-surface p-6 rounded-xl border border-outline-variant text-center whisper-shadow hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-card-title text-lg font-bold mb-2">Curated Quality</h3>
            <p className="font-caption text-on-surface-variant">Every book in our collection is carefully selected for our readers.</p>
          </div>

          <div className="bg-surface p-6 rounded-xl border border-outline-variant text-center whisper-shadow hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 mx-auto bg-secondary-fixed/30 text-secondary rounded-full flex items-center justify-center mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-card-title text-lg font-bold mb-2">Global Access</h3>
            <p className="font-caption text-on-surface-variant">Read anytime, anywhere, with our seamless cross-platform sync.</p>
          </div>

          <div className="bg-surface p-6 rounded-xl border border-outline-variant text-center whisper-shadow hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 mx-auto bg-tertiary-fixed/50 text-tertiary rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-card-title text-lg font-bold mb-2">Community First</h3>
            <p className="font-caption text-on-surface-variant">Connect with authors and fellow readers in a thriving ecosystem.</p>
          </div>

          <div className="bg-surface p-6 rounded-xl border border-outline-variant text-center whisper-shadow hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 mx-auto bg-primary-fixed/50 text-primary rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-card-title text-lg font-bold mb-2">Secure & Private</h3>
            <p className="font-caption text-on-surface-variant">Your reading habits and personal data are strictly protected.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
