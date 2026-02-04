export type EventNewsPost = {
  slug: string;
  title: string;
  date: string;
  tag: string;
  views: number;
  desc: string;
  sections: Array<{ heading: string; body: string[] }>;
};

export const newsPosts: EventNewsPost[] = [
  {
    slug: 'launch-week-live-agenda',
    title: 'Launch Week Live agenda is out',
    date: 'Feb 2026',
    tag: 'Product',
    views: 18294,
    desc: 'A full schedule of demos, workshops, and platform deep dives with the team.',
    sections: [
      {
        heading: 'What to expect',
        body: [
          'Daily live demos covering compute, networking, and production inference patterns.',
          'Hands-on clinics where you can bring a workload and leave with an optimized setup.',
          'Short Q&A blocks at the end of each session with the engineers shipping the features.',
        ],
      },
      {
        heading: 'Who it is for',
        body: [
          'Teams deploying latency-sensitive inference services.',
          'Platform engineers building internal developer experiences.',
          'Builders who want a clear, end-to-end path from prototype to production.',
        ],
      },
    ],
  },
  {
    slug: 'meetup-kit-local-organizers',
    title: 'New meetup kit for local organizers',
    date: 'Jan 2026',
    tag: 'Community',
    views: 9460,
    desc: 'Templates, speaker notes, and a quick-start checklist to host your first chapter night.',
    sections: [
      {
        heading: 'Included in the kit',
        body: [
          'Slide templates, promo copy, and a run-of-show for 60–90 minute meetups.',
          'A suggested lightning talk lineup to keep the night moving.',
          'A feedback form and attendee follow-up checklist.',
        ],
      },
      {
        heading: 'How to get support',
        body: [
          'Contact us if you need a speaker, swag, or a venue sponsor recommendation.',
          'We can help promote your meetup across community channels.',
        ],
      },
    ],
  },
  {
    slug: 'workshop-low-latency-inference',
    title: 'Workshop: Deploying low-latency inference',
    date: 'Jan 2026',
    tag: 'Inference',
    views: 12031,
    desc: 'A practical walkthrough from container build to production traffic with monitoring.',
    sections: [
      {
        heading: 'Topics covered',
        body: [
          'Instance sizing and cold start mitigation strategies.',
          'Networking patterns: firewall, global routing, TLS, and auth.',
          'Monitoring the metrics that correlate with user experience.',
        ],
      },
      {
        heading: 'Bring your workload',
        body: [
          'You will get the most value if you show up with a model, a target latency budget, and rough traffic expectations.',
        ],
      },
    ],
  },
];

export function getNewsPost(slug: string | undefined) {
  if (!slug) return undefined;
  return newsPosts.find((p) => p.slug === slug);
}
