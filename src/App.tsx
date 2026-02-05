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
import { MarketplaceAppDetailsPage } from './pages/appdetails';
import { ContactUsPage } from './pages/ContactUsPage';
import { AboutUsPage } from './pages/AboutUs';
import { EventsPage } from './pages/Event';
import { EventNewsDetailPage } from './pages/EventNewsDetail';
import { GuidesPage } from './pages/Guides';
import { AudioTranscriptionPage } from './pages/solutions/AudioTranscription';
import { LlmInferencePage } from './pages/solutions/LlmInference';
import { CodingAgentsPage } from './pages/solutions/CodingAgents';
import { ComputationalBioPage } from './pages/solutions/ComputationalBio';
import { ImageGenerationPage } from './pages/solutions/ImageGeneration';
import { IndustrySolutionsPage } from './pages/solutions/IndustrySolutions';
import {
  PlaygroundPage,
  GpuGlossaryPage,
  LlmEngineAdvisorPage,
  StartupCreditsPage,
  PartnersPage,
  CommunityPage,
  CareersPage,
  SlaPage,
  InfraDesignPage,
} from './pages/resource/ResourcePages';
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
          <Route path="/solutions/audio-transcription" element={<AudioTranscriptionPage />} />
          <Route path="/solutions/llm-inference" element={<LlmInferencePage />} />
          <Route path="/solutions/coding-agents" element={<CodingAgentsPage />} />
          <Route path="/solutions/computational-bio" element={<ComputationalBioPage />} />
          <Route path="/solutions/image-generation" element={<ImageGenerationPage />} />
          <Route path="/solutions/industry-solutions" element={<IndustrySolutionsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/playground" element={<PlaygroundPage />} />
          <Route path="/resources/gpu-glossary" element={<GpuGlossaryPage />} />
          <Route path="/resources/llm-engine-advisor" element={<LlmEngineAdvisorPage />} />
          <Route path="/resources/startup-credits" element={<StartupCreditsPage />} />
          <Route path="/resources/partners" element={<PartnersPage />} />
          <Route path="/resources/community" element={<CommunityPage />} />
          <Route path="/resources/careers" element={<CareersPage />} />
          <Route path="/resources/sla" element={<SlaPage />} />
          <Route path="/resources/infra-design" element={<InfraDesignPage />} />
          <Route path="/resources/marketplace-apps" element={<MarketplaceAppsPage />} />
          <Route path="/resources/marketplace-apps/:appId" element={<MarketplaceAppDetailsPage />} />
          <Route path="/resources/about" element={<AboutUsPage />} />
          <Route path="/resources/events" element={<EventsPage />} />
          <Route path="/resources/events/news/:slug" element={<EventNewsDetailPage />} />
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