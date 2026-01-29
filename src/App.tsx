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
import { DocsHomePage } from './pages/doc/DocsHome';
import { ReferencePage } from './pages/doc/Reference';
import { DocsHelpCenterPage } from './pages/doc/DocsHelpCenterPage';
import { DocsChangelogPage } from './pages/doc/DocsChangelogPage';
import { ExamplePage } from './pages/doc/Example';
import { CreateGuidePage } from './pages/doc/CreateGuide';
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
          <Route path="/docs" element={<DocsHomePage />} />
          <Route path="/docs/" element={<DocsHomePage />} />
          <Route path="/docs/guides" element={<GuidesPage />} />
          <Route path="/docs/guides/product" element={<DocsProductPage />} />
          <Route path="/docs/guides/product/" element={<DocsProductPage />} />
          <Route path="/docs/examples" element={<ExamplePage />} />
          <Route path="/docs/examples/" element={<ExamplePage />} />
          <Route path="/docs/guides/create-guide" element={<CreateGuidePage />} />
          <Route path="/docs/guides/create-guide/" element={<CreateGuidePage />} />
          <Route path="/docs/guides/api" element={<ReferencePage />} />
          <Route path="/docs/guides/api/" element={<ReferencePage />} />
          <Route path="/docs/guides/help-center" element={<DocsHelpCenterPage />} />
          <Route path="/docs/guides/help-center/" element={<DocsHelpCenterPage />} />
          <Route path="/docs/guides/changelog" element={<DocsChangelogPage />} />
          <Route path="/docs/guides/changelog/" element={<DocsChangelogPage />} />
          <Route path="/docs/guides/:slug" element={<GuidesPage />} />
        </Routes>
      </BrowserRouter>
      <DarkThemeAccentPalette />
    </ThemeProvider>
  );
}