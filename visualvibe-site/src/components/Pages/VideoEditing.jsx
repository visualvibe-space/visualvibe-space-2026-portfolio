import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Film,
  Star,
  Wrench,
  Clapperboard,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { videosApi } from "../../services/api";
import { getImageUrl } from "../../utils/image";

const getVideoUrl = (path) => {
  if (!path) return null;
  return getImageUrl(path);
};

const VideoCard = ({ video, onPlay }) => {
  const getThumbnailUrl = (path) => {
    if (!path) return "https://placehold.co/600x400/1e293b/ffffff?text=Video";
    return getImageUrl(path);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative bg-[#0f172a] rounded-2xl cursor-pointer border border-gray-700 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 overflow-hidden"
      onClick={() => onPlay(video)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={getThumbnailUrl(
            video.thumbnail_file || video.thumbnail_url || video.image_url,
          )}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-blue-600/90 flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all">
            <Play className="w-7 h-7 text-white ml-1" fill="white" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-white text-lg mb-1">{video.title}</h3>
        <p className="text-gray-400 text-sm">
          {video.category || "Video Production"}
        </p>
      </div>
    </motion.div>
  );
};

const VideoModal = ({ video, onClose }) => {
  if (!video) return null;

  const videoSrc = getVideoUrl(
    video.video_file ||
      video.video_url ||
      video.website_url ||
      video.url ||
      video.image_url,
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#0f172a] rounded-2xl w-full max-w-4xl overflow-hidden border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-white font-bold text-lg">{video.title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="aspect-video bg-black flex items-center justify-center">
          {videoSrc ? (
            <video src={videoSrc} controls autoPlay className="w-full h-full" />
          ) : (
            <div className="text-center p-4">
              <p className="text-gray-400 mb-2">No video available</p>
              <p className="text-gray-600 text-sm">
                Video URL:{" "}
                {video.video_file ||
                  video.video_url ||
                  video.website_url ||
                  video.url ||
                  video.image_url ||
                  "none"}
              </p>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-gray-700">
          <p className="text-gray-300">
            {video.description ||
              "A professional video production showcasing creativity and technical expertise."}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const VideoEditing = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await videosApi.getAll();
        setVideos(data || []);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const services = [
    {
      title: "Video Editing",
      icon: Film,
      items: [
        "Corporate Videos",
        "Event Highlights",
        "Music Videos",
        "Documentaries",
        "YouTube Content",
      ],
      color: "from-blue-500 to-cyan-400",
    },
    {
      title: "Motion Graphics",
      icon: Star,
      items: [
        "Logo Animations",
        "Explainer Videos",
        "Title Sequences",
        "Infographics",
        "Social Media Content",
      ],
      color: "from-pink-500 to-rose-400",
    },
    {
      title: "Post Production",
      icon: Clapperboard,
      items: [
        "Color Grading",
        "Sound Design",
        "VFX",
        "Visual Effects",
        "Final Export",
      ],
      color: "from-purple-500 to-violet-400",
    },
    {
      title: "Content Strategy",
      icon: Wrench,
      items: [
        "Video Scripting",
        "Storyboarding",
        "Content Planning",
        "Platform Optimization",
      ],
      color: "from-green-500 to-teal-400",
    },
  ];

  const tools = [
    "Adobe Premiere Pro",
    "After Effects",
    "DaVinci Resolve",
    "Final Cut Pro",
    "Blender",
    "Cinema 4D",
  ];

  return (
    <div className="min-h-screen bg-[#0a0e17]">
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>

      <section className="relative min-h-[60vh] flex items-center justify-center pt-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon fill='white' points='0,1000 1000,0 1000,1000'/%3E%3C/svg%3E")`,
            backgroundSize: "cover",
          }}
        />

        <div className="container-custom relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white mb-8 hover:bg-white/20 transition-all"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Video Editing &{" "}
              <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
                Motion Graphics
              </span>
            </h1>
            <p className="text-xl text-gray-400 ">
              Bringing stories to life with cinematic editing and dynamic
              animations that captivate audiences and elevate your brand.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#0f172a]">
        <div className="container-custom px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Video Editing & Motion Graphics
            </h2>
            <p className="text-gray-400  mx-auto">
              Professional video editing and dynamic motion graphics to bring
              your content to life with stunning visual appeal.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-[#1a2234] rounded-3xl p-6 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all hover:-translate-y-2"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <ul className="space-y-2">
                    {service.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-gray-400 text-sm"
                      >
                        <span className="w-1 h-1 rounded-full bg-blue-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#1a2234] rounded-3xl p-8 border border-white/10 backdrop-blur-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-400 flex items-center justify-center">
                <Wrench className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Video Editing Software
                </h3>
                <p className="text-gray-400">
                  Professional tools for video production
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-[#111827] rounded-full text-gray-300 text-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {!loading && videos.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-[#0f172a] to-[#0a0e17]">
          <div className="container-custom px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Our Video Portfolio
              </h2>
              <p className="text-gray-400 mx-auto">
                Explore our creative video productions and motion graphics work.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onPlay={setSelectedVideo}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-[#0f172a]">
        <div className="container-custom px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Need a Video Production?
            </h2>
            <p className="text-gray-400 mb-8 pb-8 mx-auto">
              Let's create something amazing together. Contact us today!
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
            >
              <Play size={18} />
              Get Started
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default VideoEditing;
