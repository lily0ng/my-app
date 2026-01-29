import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { InferencePage } from './pages/product/InferencePage';
import { TrainingPage } from './pages/product/TrainingPage';
import { BatchPage } from './pages/product/BatchPage';
import { SandboxesPage } from './pages/product/SandboxesPage';
import { NotebooksPage } from './pages/product/NotebooksPage';
import { CorePlatformPage } from './pages/product/CorePlatformPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { CustomersPage } from './pages/CustomersPage';
import { PricingPage } from './pages/PricingPage';
import { DocsProductPage } from './pages/doc/DocsProductPage';
import { DocsApiPage } from './pages/doc/DocsApiPage';
import { DocsHelpCenterPage } from './pages/doc/DocsHelpCenterPage';
import { DocsChangelogPage } from './pages/doc/DocsChangelogPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { MarketplaceAppsPage } from './pages/MarketplaceAppsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { AboutUsPage } from './pages/AboutUs';
import { EventsPage } from './pages/Event';
import { GuidesPage } from './pages/Guides';
import { ThemeProvider } from './contexts/ThemeContext';
import { DarkThemeAccentPalette } from './components/DarkThemeAccentPalette';

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Product Routes */}
          <Route path="/product/inference" element={<InferencePage />} />
          <Route path="/product/training" element={<TrainingPage />} />
          <Route path="/product/batch" element={<BatchPage />} />
          <Route path="/product/sandboxes" element={<SandboxesPage />} />
          <Route path="/product/notebooks" element={<NotebooksPage />} />
          <Route path="/product/core-platform" element={<CorePlatformPage />} />

          {/* Main Routes */}
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/marketplace-apps" element={<MarketplaceAppsPage />} />
          <Route path="/resources/about" element={<AboutUsPage />} />
          <Route path="/resources/events" element={<EventsPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/docs" element={<DocsProductPage />} />
          <Route path="/docs/product" element={<DocsProductPage />} />
          <Route path="/docs/api" element={<DocsApiPage />} />
          <Route path="/docs/help-center" element={<DocsHelpCenterPage />} />
          <Route path="/docs/changelog" element={<DocsChangelogPage />} />
          <Route path="/docs/guides" element={<GuidesPage />} />
          <Route path="/docs/guides/:slug" element={<GuidesPage />} />
        </Routes>
      </BrowserRouter>
      <DarkThemeAccentPalette />
    </ThemeProvider>
  );
}