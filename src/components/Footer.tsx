export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 md:px-[5vw] py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#8A8A93] bg-[#0A0A0C]">
      <div className="flex items-center gap-2">
        <span className="font-serif text-[#F5F3EF] text-base tracking-tight">Aura</span>
        <span className="text-[#8A8A93]/60">© 2026</span>
      </div>

      <p className="text-center">Made for people who'd rather describe than draw</p>

      <div className="flex items-center gap-6">
        <a href="#capabilities" className="hover:text-[#F5F3EF] transition-colors">Capabilities</a>
        <a href="#gallery" className="hover:text-[#F5F3EF] transition-colors">Gallery</a>
      </div>
    </footer>
  );
}