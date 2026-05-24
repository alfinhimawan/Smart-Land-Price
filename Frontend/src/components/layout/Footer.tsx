import { Link } from 'react-router-dom'
import { MapPin, Github, Twitter, Linkedin, Mail, Home, Map, Info, CheckCircle } from 'lucide-react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-950 pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent"></div>
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-accent-cyan/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div className="space-y-6 lg:col-span-2 pr-0 lg:pr-12">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-gradient-to-br from-accent-cyan to-accent-blue rounded-lg group-hover:shadow-glow transition-all">
                <MapPin className="w-5 h-5 text-dark-950" />
              </div>
              <div>
                <div className="font-bold text-white text-lg">SmartLand<span className="text-accent-cyan">.ID</span></div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sistem prediksi nilai lahan spasial interaktif menggunakan metode Inverse Distance Weighting (IDW) untuk kawasan IKN dan sekitarnya.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent-cyan hover:text-dark-950 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent-cyan hover:text-dark-950 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent-cyan hover:text-dark-950 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Navigasi</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-accent-cyan transition-colors flex items-center gap-2 group">
                  <Home className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-all" />
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-accent-cyan transition-colors flex items-center gap-2 group">
                  <Map className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-all" />
                  Peta Prediksi
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-accent-cyan transition-colors flex items-center gap-2 group">
                  <Info className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-all" />
                  Tentang Proyek
                </Link>
              </li>
              <li>
                <Link to="/validation" className="text-gray-400 hover:text-accent-cyan transition-colors flex items-center gap-2 group">
                  <CheckCircle className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-all" />
                  Akurasi Model
                </Link>
              </li>
            </ul>
          </div>


          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Kontak Tim</h3>
            <p className="text-gray-400 text-sm mb-4">
              Punya pertanyaan mengenai data atau metode IDW yang kami gunakan?
            </p>
            <a href="mailto:contact@smartland.id" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors text-sm border border-white/5">
              <Mail className="w-4 h-4" />
              contact@smartland.id
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} SmartLand.ID. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
