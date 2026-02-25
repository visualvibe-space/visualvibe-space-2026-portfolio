import { Fragment } from "react";
import {
  Code,
  Database,
  Globe,
  Layers,
  Terminal,
  Cpu,
  GitBranch,
  Layout,
  Palette,
  Smartphone,
  Video,
  Sparkles,
  Film,
  Image,
  PenTool,
  Box,
  Cuboid,
  Scissors,
  Figma,
  Boxes,
  Brush,
  Globe2Icon,
} from "lucide-react";
import mapImage from "../../assets/map.png";
import smileMemoji from "../../assets/vlogo.png";

// ToolBox Items Component
const ToolBoxItems = ({ items, className, reverse = false }) => {
  return (
    <div
      className={`flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}
    >
      <div
        className={`flex flex-none py-1 gap-4 pr-4 ${reverse ? "animate-move-right" : "animate-move-left"}`}
        style={{ animationDuration: reverse ? "20s" : "30s" }}
      >
        {[...new Array(2)].map((_, index) => (
          <Fragment key={index}>
            {items.map((item) => (
              <div
                key={`${index}-${item.title}`}
                className="inline-flex items-center gap-3 py-2 px-4 outline outline-2 outline-white/10 rounded-xl bg-[#0f172a]/50 hover:bg-[#1e293b]/50 transition-colors"
              >
                <item.icon className="w-5 h-5 text-blue-400" />
                <span className="font-medium text-sm text-gray-300">
                  {item.title}
                </span>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

const ToolboxMapSection = () => {
  const toolBoxItems = [
    { title: "JavaScript", icon: Code },
    { title: "React", icon: Layers },
    { title: "Node.js", icon: Terminal },
    { title: "Database", icon: Database },
    { title: "API Design", icon: Globe },
    { title: "UI/UX", icon: Palette },
    { title: "Mobile", icon: Smartphone },
    { title: "Git", icon: GitBranch },
    { title: "Performance", icon: Cpu },
    { title: "Responsive", icon: Layout },
  ];

  const toolBoxItems2 = [
    { title: "Adobe Premiere Pro", icon: Video },
    { title: "Adobe After Effects", icon: Sparkles },
    { title: "Final Cut Pro", icon: Scissors },
    { title: "DaVinci Resolve", icon: Film },
    { title: "Adobe Photoshop", icon: Image },
    { title: "Adobe Illustrator", icon: PenTool },
    { title: "Cinema 4D", icon: Box },
    { title: "Blender", icon: Cuboid },
  ];

  const designTools = [
    { title: "Adobe Illustrator", icon: PenTool },
    { title: "Adobe Photoshop", icon: Image },
    { title: "CorelDRAW", icon: Palette },
    { title: "Affinity Designer", icon: Layers },
    { title: "Adobe After Effects", icon: Sparkles },
    { title: "Figma", icon: Figma },
  ];

  const threeDTools = [
    { title: "Blender", icon: Cuboid },
    { title: "Autodesk Maya", icon: Box },
    { title: "Cinema 4D", icon: Boxes },
    { title: "3ds Max", icon: Globe2Icon },
    { title: "Substance Painter", icon: Brush },
    { title: "ZBrush", icon: Brush },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#0a0e17]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-400 bg-blue-950/30 rounded-full border border-blue-900/30">
            Our Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Digital Craftsmanship <br /> & Headquarters
          </h2>
          <p className="text-gray-400 w-full text-center mx-auto">
            Technology That Performs. Headquarters That Represents.
          </p>
        </div>

        {/* 1×2 Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Toolbox Column */}
          <div className="bg-[#111827] rounded-3xl p-8 border border-white/10 overflow-hidden">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Our Toolbox
              </h3>
              <p className="text-gray-400 text-sm">
                Technologies and tools we master to deliver outstanding results.
              </p>
            </div>

            {/* Scrolling items */}
            <ToolBoxItems items={toolBoxItems} className="mb-4" />
            <ToolBoxItems items={toolBoxItems} reverse className="mb-4" />
            <ToolBoxItems items={toolBoxItems2} className="mb-4" />
            <ToolBoxItems items={designTools} reverse className="mb-4" />
            <ToolBoxItems items={threeDTools} className=" mb-4" />
          </div>

          {/* Map Column */}
          <div className="bg-[#111827] rounded-3xl overflow-hidden border border-white/10 relative h-[400px] md:h-auto">
            <img
              src={mapImage}
              alt="Map"
              className="w-full h-full object-cover object-left-top"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:inset-0 after:rounded-full after:outline after-outline-2 after:-outline-offset-2 after:outline-gray-950/30">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-20 animate-ping [animation-duration:2s]"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-10"></div>
              <img className="size-20" src={smileMemoji} alt="Memoji" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolboxMapSection;
