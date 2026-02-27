import Icon from '@/components/ui/AppIcon';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] bg-stone-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1593982624332-9c7a6ac54341"
          alt="Modern tech products including smartphones, laptops, and headphones arranged on minimalist white surface"
          className="w-full h-full object-cover opacity-60" />

        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
        <div className="space-y-6 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-jakarta text-white tracking-tight">
            Votre Tech, <br />
            <span className="text-primary">Simplement</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light">
            Découvrez les derniers smartphones, laptops et accessoires tech. Commander directement via WhatsApp.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in delay-500">
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs uppercase tracking-wider">Défiler</span>
            <Icon name="ChevronDownIcon" size={20} className="animate-bounce" />
          </div>
        </div>
      </div>
    </section>);

}