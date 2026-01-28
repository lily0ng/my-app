import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { ArrowRight } from 'lucide-react';
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Nav />

      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 shadow-2xl">
            <h1 className="text-2xl font-bold mb-2 text-center">
              Welcome back
            </h1>
            <p className="text-gray-400 text-center mb-8 text-sm">
              Log in to your Modal account
            </p>

            <form className="space-y-4">
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
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-medium text-gray-400">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-[#00ff88] hover:text-[#00cc6a]">

                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00ff88] transition-colors"
                  placeholder="••••••••" />

              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded bg-[#111] border-white/10 text-[#00ff88] focus:ring-0" />

                <label htmlFor="remember" className="text-sm text-gray-400">
                  Remember me for 30 days
                </label>
              </div>

              <button className="w-full bg-[#00ff88] text-black font-bold py-2.5 rounded-lg hover:bg-[#00cc6a] transition-colors flex items-center justify-center gap-2 mt-2">
                Log In <ArrowRight size={16} />
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-[#00ff88] hover:text-[#00cc6a] font-medium">

                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>);

}