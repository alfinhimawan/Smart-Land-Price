import { Link } from 'react-router-dom'
import { MapPin, Twitter, Linkedin, Mail, Home, Map, Info, CheckCircle } from 'lucide-react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div className="space-y-6 lg:col-span-2 pr-0 lg:pr-12">
            <Link to="/" className="flex items-center gap-2 group">
              <MapPin className="w-6 h-6 text-primary transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6" />
              <div className="font-bold text-2xl tracking-tight leading-none flex items-baseline">
                <span className="text-foreground">SmartLand</span>
                <span className="text-primary">.ID</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Sistem prediksi nilai lahan spasial interaktif menggunakan metode Inverse Distance Weighting (IDW) untuk kawasan IKN dan sekitarnya.
            </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-foreground/5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-foreground/5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-6 text-sm uppercase tracking-wider">Navigasi</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <Home className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-all" />
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <Info className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-all" />
                  Tentang Proyek
                </Link>
              </li>
              <li>
                <Link to="/validation" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <CheckCircle className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-all" />
                  Akurasi Model
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  <Map className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-all" />
                  Peta Prediksi
                </Link>
              </li>
            </ul>
          </div>


          {/* Contact */}
          <div>
            <h3 className="text-foreground font-semibold mb-6 text-sm uppercase tracking-wider">Kontak Tim</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Punya pertanyaan mengenai data atau metode IDW yang kami gunakan?
            </p>
            <a href="mailto:contact@smartland.id" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground transition-colors text-sm border border-white/5">
              <Mail className="w-4 h-4" />
              contact@smartland.id
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-card-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} SmartLand.ID. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-foreground transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
