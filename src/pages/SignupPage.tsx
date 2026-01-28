import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { ArrowRight, Github } from 'lucide-react';
export function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Nav />

      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 shadow-2xl">
            <h1 className="text-2xl font-bold mb-2 text-center">
              Create an account
            </h1>
            <p className="text-gray-400 text-center mb-8 text-sm">
              Start building with $30/mo in free credits
            </p>

            <button className="w-full bg-[#1a1a1a] border border-white/10 text-white font-medium py-2.5 rounded-lg hover:bg-[#222] transition-colors flex items-center justify-center gap-2 mb-6">
              <Github size={18} />
              Continue with GitHub
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0a0a0a] px-2 text-gray-500">
                  Or continue with email
                </span>
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00ff88] transition-colors"
                  placeholder="Jane Doe" />

              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00ff88] transition-colors"
                  placeholder="you@company.com" />

              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00ff88] transition-colors"
                  placeholder="••••••••" />

              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 rounded bg-[#111] border-white/10 text-[#00ff88] focus:ring-0" />

                <label
                  htmlFor="terms"
                  className="text-xs text-gray-400 leading-relaxed">

                  I agree to the{' '}
                  <Link to="/terms" className="text-white hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-white hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              <button className="w-full bg-[#00ff88] text-black font-bold py-2.5 rounded-lg hover:bg-[#00cc6a] transition-colors flex items-center justify-center gap-2 mt-2">
                Create Account <ArrowRight size={16} />
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-[#00ff88] hover:text-[#00cc6a] font-medium">

                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>);

}