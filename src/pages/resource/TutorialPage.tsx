import React, { useState } from 'react';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { Play, ChevronRight, BookOpen, Code2, Zap, Shield, Grid, List, Filter, Tag, X } from 'lucide-react';

const TutorialPage = () => {
    const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'youtube'>('grid');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Sample video data with real YouTube links for testing
    const featuredVideos = [
        {
            id: 'getting-started',
            title: 'Getting Started',
            duration: '5:23',
            description: 'Learn the basics of our platform in this comprehensive introduction',
            thumbnail: 'https://img.youtube.com/vi/mkJ_Ce5-fCY/maxresdefault.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=mkJ_Ce5-fCY',
            embedId: 'mkJ_Ce5-fCY',
            category: 'beginner',
            tags: ['compute']
        },
        {
            id: 'first-deployment',
            title: 'Your First Deployment',
            duration: '8:45',
            description: 'Deploy your first application and understand the deployment process',
            thumbnail: 'https://img.youtube.com/vi/mkJ_Ce5-fCY/maxresdefault.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=mkJ_Ce5-fCY',
            embedId: 'mkJ_Ce5-fCY',
            category: 'intermediate',
            tags: ['deployment']
        },
        {
            id: 'volume-snapshots',
            title: 'Volume Snapshots & Backups',
            duration: '6:12',
            description: 'Learn how to create and manage volume snapshots and automated backups',
            thumbnail: 'https://img.youtube.com/vi/mkJ_Ce5-fCY/maxresdefault.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=mkJ_Ce5-fCY',
            embedId: 'mkJ_Ce5-fCY',
            category: 'intermediate',
            tags: ['volume']
        },
        {
            id: 'affinity-groups',
            title: 'Managing Affinity Groups',
            duration: '7:30',
            description: 'Configure affinity groups for optimal resource placement and performance',
            thumbnail: 'https://img.youtube.com/vi/mkJ_Ce5-fCY/maxresdefault.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=mkJ_Ce5-fCY',
            embedId: 'mkJ_Ce5-fCY',
            category: 'advanced',
            tags: ['affinity groups']
        },
        {
            id: 'auto-scaling',
            title: 'Auto Scaling Configuration',
            duration: '9:15',
            description: 'Set up auto scaling groups to handle varying workloads automatically',
            thumbnail: 'https://img.youtube.com/vi/mkJ_Ce5-fCY/maxresdefault.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=mkJ_Ce5-fCY',
            embedId: 'mkJ_Ce5-fCY',
            category: 'advanced',
            tags: ['auto scaling']
        },
        {
            id: 'load-balancer',
            title: 'Load Balancer Setup',
            duration: '10:42',
            description: 'Configure and deploy load balancers for high availability applications',
            thumbnail: 'https://img.youtube.com/vi/mkJ_Ce5-fCY/maxresdefault.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=mkJ_Ce5-fCY',
            embedId: 'mkJ_Ce5-fCY',
            category: 'advanced',
            tags: ['loadbalancer']
        }
    ];

    const allTags = Array.from(new Set(featuredVideos.flatMap(video => video.tags)));

    const filteredVideos = featuredVideos.filter(video => {
        const tagsMatch = selectedTags.length === 0 || video.tags.includes(selectedTags[0]);
        return tagsMatch;
    });

    const toggleTag = (tag: string) => {
        setSelectedTags(prev => 
            prev.includes(tag) 
                ? []
                : [tag]
        );
    };

    const currentVideo = featuredVideos.find(v => v.id === selectedVideo) || featuredVideos[0];

    return (
        <div className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-[#00ff88] selection:text-black">
            <Nav />

            <main>
                {/* Hero Section */}
                <section className="px-6 border-b border-white/5">
                    <div className="max-w-7xl mx-auto">
                        <section className="pt-40 pb-20 px-6 text-center">
                            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
                                Free <span className="text-[color:var(--accent)]">Tutorials</span>
                            </h1>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                                From beginner basics to advanced techniques, our video tutorials provide comprehensive learning.
                                Master our platform step-by-step with expert guidance.
                            </p>
                        </section>

                        {/* Filters and View Controls */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pb-8">
                            <div className="flex flex-wrap items-center gap-4">
                                {/* Tags Filter */}
                                <div className="flex items-center gap-2 flex-wrap">
                                    {allTags.map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => toggleTag(tag)}
                                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                                                selectedTags.includes(tag)
                                                    ? 'bg-[color:var(--accent)] text-white'
                                                    : 'bg-[#0a0a0a] border border-white/20 text-gray-400 hover:border-[color:var(--accent)]'
                                            }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}

                                </div>
                            </div>

                            {/* View Mode Toggle */}
                            <div className="ml-auto flex items-center justify-end gap-2 bg-[#0a0a0a] border border-white/20 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded transition-all ${
                                        viewMode === 'grid' 
                                            ? 'bg-[color:var(--accent)] text-white' 
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('youtube')}
                                    className={`p-2 rounded transition-all ${
                                        viewMode === 'youtube' 
                                            ? 'bg-[color:var(--accent)] text-white' 
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* YouTube Style Layout */}
                        {viewMode === 'youtube' && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-32">
                                {/* Main Video Player */}
                                <div className="lg:col-span-2">
                                    <div className="relative aspect-video bg-[#0a0a0a] rounded-xl overflow-hidden">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${currentVideo.embedId}?autoplay=0&controls=1&modestbranding=1&rel=0`}
                                            title={currentVideo.title}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                            allowFullScreen
                                            frameBorder="0"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <h2 className="text-2xl font-bold text-white mb-2">{currentVideo.title}</h2>
                                        <p className="text-gray-400 mb-4">{currentVideo.description}</p>
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm text-gray-500">Duration: {currentVideo.duration}</span>
                                            <button 
                                                onClick={() => window.open(currentVideo.videoUrl, '_blank')}
                                                className="text-[color:var(--accent)] hover:text-[color:var(--accent-hover)] text-sm font-medium transition-colors"
                                            >
                                                Watch on YouTube
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Video List */}
                                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                                    {filteredVideos.map((video) => (
                                        <div
                                            key={video.id}
                                            onClick={() => setSelectedVideo(video.id)}
                                            className={`flex gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                                                selectedVideo === video.id 
                                                    ? 'bg-[color:var(--accent)]/20 border border-[color:var(--accent)]/50' 
                                                    : 'bg-[#0a0a0a] hover:bg-[#0a0a0a]/80'
                                            }`}
                                        >
                                            <div className="relative w-40 aspect-video flex-shrink-0">
                                                <img 
                                                    src={video.thumbnail} 
                                                    alt={video.title}
                                                    className="w-full h-full object-cover rounded"
                                                />
                                                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                                                    {video.duration}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-medium text-white mb-1 line-clamp-2">
                                                    {video.title}
                                                </h3>
                                                <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                                                    {video.description}
                                                </p>
                                                <div className="flex flex-wrap gap-1">
                                                    {video.tags.slice(0, 2).map(tag => (
                                                        <span key={tag} className="text-xs bg-white/10 px-2 py-0.5 rounded">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Grid View */}
                        {viewMode === 'grid' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-32">
                                {filteredVideos.map((video, i) => (
                                    <div
                                        key={video.id}
                                        className="group cursor-pointer"
                                        onMouseEnter={() => setHoveredVideo(video.id)}
                                        onMouseLeave={() => setHoveredVideo(null)}
                                    >
                                        <div className="relative overflow-hidden rounded-xl transition-all duration-300">
                                            {/* Video Thumbnail/Player */}
                                            <div className="relative aspect-video">
                                                {hoveredVideo === video.id ? (
                                                    <iframe
                                                        src={`https://www.youtube.com/embed/${video.embedId}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0`}
                                                        title={video.title}
                                                        className="w-full h-full object-cover rounded-xl"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                                        allowFullScreen
                                                        frameBorder="0"
                                                    />
                                                ) : (
                                                    <>
                                                        <img
                                                            src={video.thumbnail}
                                                            alt={video.title}
                                                            className="w-full h-full object-cover rounded-xl"
                                                        />

                                                        {/* Play Button Overlay */}
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                                            <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                                                                <Play size={16} className="text-black ml-0.5" />
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                            {/* Video Info - Compact */}
                                            <div className="">
                                                <p className="mt-3 text-xl font-bold">{video.title}</p>
                                                <p className="text-sm text-gray-400 mb-2">{video.description}</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-500">{video.duration}</span>
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); window.open(video.videoUrl, '_blank'); }}
                                                        className="text-[color:var(--accent)] hover:text-[color:var(--accent-hover)] text-xs font-medium transition-colors"
                                                    >
                                                        Watch Now
                                                    </button>
                                                </div>
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {video.tags.map(tag => (
                                                        <span key={tag} className="text-xs bg-white/10 px-2 py-0.5 rounded-xl">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-40 px-6 text-center border-t border-white/5 bg-gradient-to-b from-black to-[#05150d]">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-5xl md:text-6xl font-bold mb-8">
                            Ready to <span className="text-[color:var(--accent)]">Start?</span>
                        </h2>
                        <p className="text-2xl text-gray-400 mb-12 font-light">
                            Start learning with our first set of video tutorials and build your skills step by step as more content is added.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <button className="px-10 py-5 rounded-full bg-[color:var(--accent)] text-white font-bold text-xl hover:bg-[color:var(--accent-hover)] transition-all hover:scale-105 shadow-[0_0_40px_rgba(var(--accent-rgb),0.4)]">
                                Sign Up Now
                            </button>
                            <button className="px-10 py-5 rounded-full border border-white/20 text-white font-medium text-xl hover:bg-white/5 transition-all hover:scale-105">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
};

export default TutorialPage;