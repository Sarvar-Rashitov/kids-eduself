import { motion } from "motion/react";
import { ChevronLeft, Play, Heart, Share2 } from "lucide-react";
import { useNavigate } from "react-router";
import { audioService } from "@/services/audioService";
import { KidsNavBar } from "@/app/components/KidsNavBar";
import { useState } from "react";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
  emoji: string;
  views: string;
}

export function Videos() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const categories = [
    { id: "all", name: "Hammasi", emoji: "🎬" },
    { id: "alphabet", name: "Alifbo", emoji: "🔤" },
    { id: "numbers", name: "Raqamlar", emoji: "🔢" },
    { id: "science", name: "Fizika", emoji: "🔬" },
    { id: "stories", name: "Hikoyalar", emoji: "📚" },
    { id: "songs", name: "Qo'shiqlar", emoji: "🎵" },
  ];

  const videos: Video[] = [
    {
      id: "1",
      title: "Alfabetning qiziqarli dunyosi! A dan Z gacha",
      thumbnail: "🎨",
      duration: "3:45",
      category: "alphabet",
      emoji: "🔤",
      views: "1.2K",
    },
    {
      id: "2",
      title: "Raqamlar bilan sanoq o'yini - 1 dan 10 gacha",
      thumbnail: "🎲",
      duration: "2:30",
      category: "numbers",
      emoji: "🔢",
      views: "985",
    },
    {
      id: "3",
      title: "Gravitatsiya nima? Bolalar uchun fizika",
      thumbnail: "🌍",
      duration: "4:15",
      category: "science",
      emoji: "🔬",
      views: "2.1K",
    },
    {
      id: "4",
      title: "Ranglar bilan tanishing - Qiziqarli multfilm",
      thumbnail: "🌈",
      duration: "3:00",
      category: "alphabet",
      emoji: "🎨",
      views: "1.5K",
    },
    {
      id: "5",
      title: "Quyosh sistemasi sayohati - Sayyoralar",
      thumbnail: "🪐",
      duration: "5:20",
      category: "science",
      emoji: "🚀",
      views: "3.2K",
    },
    {
      id: "6",
      title: "Hayvonlar tovushlari - O'rganamiz va kulimiz",
      thumbnail: "🦁",
      duration: "2:45",
      category: "stories",
      emoji: "🐾",
      views: "890",
    },
    {
      id: "7",
      title: "ABC qo'shig'i - Ingliz alifbosi",
      thumbnail: "🎤",
      duration: "1:50",
      category: "songs",
      emoji: "🎵",
      views: "4.5K",
    },
    {
      id: "8",
      title: "Suv sikli - Yomg'ir qayerdan keladi?",
      thumbnail: "☁️",
      duration: "3:30",
      category: "science",
      emoji: "💧",
      views: "1.8K",
    },
    {
      id: "9",
      title: "Geometrik shakllar - Doira, kvadrat va yana ko'p",
      thumbnail: "🔷",
      duration: "2:55",
      category: "numbers",
      emoji: "📐",
      views: "1.1K",
    },
    {
      id: "10",
      title: "Dinozavrlar dunyosi - Qiziqarli faktlar",
      thumbnail: "🦕",
      duration: "4:40",
      category: "stories",
      emoji: "🦖",
      views: "5.2K",
    },
    {
      id: "11",
      title: "Magnit qanday ishlaydi? - Bolalar uchun tajriba",
      thumbnail: "🧲",
      duration: "3:10",
      category: "science",
      emoji: "⚡",
      views: "2.3K",
    },
    {
      id: "12",
      title: "Kunning vaqtlari - Ertalab, tushlik, kechqurun",
      thumbnail: "🌅",
      duration: "2:20",
      category: "stories",
      emoji: "🌞",
      views: "1.6K",
    },
  ];

  const filteredVideos = selectedCategory === "all" 
    ? videos 
    : videos.filter(v => v.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 pb-24">
      {/* Header */}
      <div className="bg-white rounded-b-[3rem] shadow-lg p-6 mb-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              audioService.playClick();
              navigate("/home");
            }}
            className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <span>📺</span>
            Video darslar
          </h1>

          <div className="w-14" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Categories - Horizontal Scroll */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-3 min-w-max">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  audioService.playClick();
                  setSelectedCategory(category.id);
                }}
                className={`
                  px-6 py-3 rounded-full font-semibold text-sm
                  transition-all shadow-md whitespace-nowrap
                  ${selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-105'
                    : 'bg-white text-gray-700 hover:shadow-lg'
                  }
                `}
              >
                <span className="mr-2">{category.emoji}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer"
              onClick={() => {
                audioService.playClick();
                setSelectedVideo(video);
              }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-[9/16] bg-gradient-to-br from-purple-200 via-pink-200 to-orange-200 flex items-center justify-center">
                <div className="text-8xl">{video.thumbnail}</div>
                
                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                  <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Play className="h-8 w-8 text-purple-600 ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                  {video.duration}
                </div>

                {/* Category emoji */}
                <div className="absolute top-3 left-3 text-3xl">
                  {video.emoji}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4">
                <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 mb-2">
                  {video.title}
                </h3>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{video.views} ko'rilgan</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        audioService.playClick();
                      }}
                      className="p-1 hover:text-red-500 transition-colors"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        audioService.playClick();
                      }}
                      className="p-1 hover:text-blue-500 transition-colors"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No videos message */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📹</div>
            <p className="text-xl text-gray-600">
              Bu kategoriyada videolar hali yo'q
            </p>
          </div>
        )}
      </div>

      <KidsNavBar />
    </div>
  );
}