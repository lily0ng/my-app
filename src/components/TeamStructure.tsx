import SolutionArchitecture from "../assets/SolutionArchitecture.png";
import CloudSecruityTeam from "../assets/CloudSecruityTeam.jpg";
import Support from "../assets/Support.png";
import Network from "../assets/Network.png";
import CloudArchitectTeam from "../assets/CloudArchitectTeam.png";
import { motion } from "framer-motion";

const TeamStructureSVG = () => {
  return (
    <section className="bg-gray-50 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-primary text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 14 * 0.2 }}
        >
          Our Team Structure
        </motion.h2>

        {/* SVG Container */}
        <div className="flex justify-center items-center">
          <svg
            viewBox="0 0 900 500"
            className="w-full h-auto max-w-4xl"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Connecting Lines */}
            <line
              x1="450"
              y1="250"
              x2="250"
              y2="120"
              stroke="#000099"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <line
              x1="450"
              y1="250"
              x2="250"
              y2="380"
              stroke="#000099"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <line
              x1="450"
              y1="250"
              x2="650"
              y2="120"
              stroke="#000099"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <line
              x1="450"
              y1="250"
              x2="650"
              y2="380"
              stroke="#000099"
              strokeWidth="2"
              strokeDasharray="5,5"
            />

            {/* Center - Solution Architecture */}
            <circle
              cx="450"
              cy="250"
              r="60"
              fill="white"
              stroke="gray"
              strokeWidth="0"
            />
            <image
              href={SolutionArchitecture}
              x="380"
              y="180"
              height="140"
              width="140"
              clipPath="url(#circleClip)"
            />
            <text
              x="450"
              y="340"
              fontSize="16"
              fontWeight="bold"
              textAnchor="middle"
              fill="#283E80"
              className="text-sm"
            >
              Solution Architecture
            </text>

            <defs>
              <clipPath id="circleClip">
                <circle cx="450" cy="250" r="60" />
              </clipPath>
            </defs>

            {/* Left - Cloud Security Team */}
            <circle
              cx="220"
              cy="110"
              r="50"
              fill="#E0F2FE"
              stroke="blue"
              strokeWidth="2"
            />
            <image
              href={CloudSecruityTeam}
              x="170"
              y="60"
              height="100"
              width="100"
              clipPath="url(#circleClip2)"
            />
            <text
              x="220"
              y="190"
              fontSize="14"
              fontWeight="bold"
              textAnchor="middle"
              fill="#000099"
              className="text-sm"
            >
              Cloud Security Team
            </text>

            <defs>
              <clipPath id="circleClip2">
                <circle cx="220" cy="110" r="50" />
              </clipPath>
            </defs>

            {/* Left - Professional Support Team */}
            <circle
              cx="220"
              cy="390"
              r="50"
              fill="#E0F2FE"
              stroke="blue"
              strokeWidth="0"
            />
            <image
              href={Support}
              x="170"
              y="340"
              height="100"
              width="100"
              clipPath="url(#circleClip3)"
            />
            <text
              x="220"
              y="470"
              fontSize="14"
              fontWeight="bold"
              textAnchor="middle"
              fill="#000099"
              className="text-sm"
            >
              Professional Support Team
            </text>

            <defs>
              <clipPath id="circleClip3">
                <circle cx="220" cy="390" r="50" />
              </clipPath>
            </defs>

            {/* Right - Network & System Expert Team */}
            <circle
              cx="680"
              cy="110"
              r="50"
              fill="#E0F2FE"
              stroke="blue"
              strokeWidth="0"
            />
            <image
              href={Network}
              x="630"
              y="60"
              height="100"
              width="100"
              clipPath="url(#circleClip4)"
            />
            <text
              x="680"
              y="190"
              fontSize="14"
              fontWeight="bold"
              textAnchor="middle"
              fill="#000099"
              className="text-sm"
            >
              Network & System Expert Team
            </text>

            <defs>
              <clipPath id="circleClip4">
                <circle cx="680" cy="110" r="50" />
              </clipPath>
            </defs>

            {/* Right - Cloud Architect Team */}
            <circle
              cx="680"
              cy="390"
              r="50"
              fill="#E0F2FE"
              stroke="blue"
              strokeWidth="0"
            />
            <image
              href={CloudArchitectTeam}
              x="630"
              y="340"
              height="100"
              width="100"
              clipPath="url(#circleClip5)"
            />
            <text
              x="680"
              y="470"
              fontSize="14"
              fontWeight="bold"
              textAnchor="middle"
              fill="#000099"
              className="text-sm"
            >
              Cloud Architect Team
            </text>

            <defs>
              <clipPath id="circleClip5">
                <circle cx="680" cy="390" r="50" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default TeamStructureSVG;