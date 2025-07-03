import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Filter } from 'lucide-react';


interface ImageData {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
}

const images: ImageData[] = [
  {
    id: 1,
    src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Mountain landscape',
    category: 'Nature',
    title: 'Mountain Vista'
  },
  {
    id: 2,
    src: 'https://images.pexels.com/photos/572861/pexels-photo-572861.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Tiger portrait',
    category: 'Animals',
    title: 'Majestic Tiger'
  },
  {
    id: 3,
    src: 'https://i.pinimg.com/736x/29/bd/ed/29bded437070fa70c6f4b807e6ce5c7f.jpg',
    alt: 'Chettinad Architecture',
    category: 'Architecture',
    title: 'Chettinad house'
  },
  {
    id: 4,
    src: 'https://i.pinimg.com/736x/56/b9/aa/56b9aab763ba4c42188c1102076625b8.jpg',
    alt: 'Forest path',
    category: 'Nature',
    title: 'Forest Trail'
  },
  {
    id: 5,
    src: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Cat portrait',
    category: 'Animals',
    title: 'Curious Cat'
  },
  {
    id: 6,
    src: 'https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'City skyline',
    category: 'Architecture',
    title: 'City Lights'
  },
  {
    id: 7,
    src: 'https://i.pinimg.com/736x/bc/49/9c/bc499c92d62bc7b4279211ab0533f6b4.jpg',
    alt: 'Ocean waves',
    category: 'Nature',
    title: 'Ocean Waves'
  },
  {
    id: 8,
    src: 'https://i.pinimg.com/736x/36/9f/36/369f36b912171b6947602490d31c83b3.jpg',
    alt: 'PANDA sleeping on the tree',
    category: 'Animals',
    title: 'Cute Panda'
  },
  {
    id: 9,
    src: 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'The Colosseum In Rome on a clear blue-sky day',
    category: 'Architecture',
    title: 'The Colosseum'
  },
  {
    id: 10,
    src: 'https://images.pexels.com/photos/1562058/pexels-photo-1562058.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'NORTHERN LIGHTS',
    category: 'Nature',
    title: 'Aurora lights'
  },
  {
    id: 11,
    src: 'https://i.pinimg.com/736x/6e/c2/96/6ec29655117f9287bda5511f96178af2.jpg',
    alt: 'Acute little puppy',
    category: 'Animals',
    title: 'Dog Paradise'
  },
  {
    id: 12,
    src: 'https://i.pinimg.com/736x/50/bb/f3/50bbf3c6655ffc5867e90d7a81ae02c2.jpg',
    alt: 'HYBE Building',
    category: 'Architecture',
    title: 'HYBE INSIGHT'
  },
  {
    id: 13,
    src: 'https://i.pinimg.com/736x/e3/20/1e/e3201ee9c2635e42a79a6b3ec685b883.jpg',
    alt: 'Cute Little baby',
    category: 'People',
    title: 'BABY IN BEE'
  },
  {
    id: 14,
    src: 'https://i.pinimg.com/736x/86/2d/ec/862dece42eb70ba4c03d902d4750ce8b.jpg',
    alt: 'Goblin Kdrama picture',
    category: 'People',
    title: 'GOBLIN KDRAMA SHOOTING PHOTOGRAPHY'
  },
  {
    id: 15,
    src: 'https://i.pinimg.com/736x/ee/66/61/ee66615a79a06f59a48c89abfc3139e9.jpg',
    alt: 'Shadow Pic Of BTS V',
    category: 'People',
    title: 'BTS Teahyung'
  },
  {
    id: 16,
    src: 'https://i.pinimg.com/736x/96/d8/87/96d887c2e3bb0f1f5ed1266d99099e39.jpg',
    alt: 'RDJ',
    category: 'People',
    title: 'IRONMAN - Robert Downey JR'
  }
];

const categories = ['All', 'Nature', 'Animals', 'Architecture', 'People'];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<ImageData | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = (image: ImageData) => {
    setLightboxImage(image);
    setCurrentImageIndex(filteredImages.findIndex(img => img.id === image.id));
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const goToPrevious = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredImages.length - 1;
    setCurrentImageIndex(newIndex);
    setLightboxImage(filteredImages[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentImageIndex < filteredImages.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    setLightboxImage(filteredImages[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!lightboxImage) return;
      switch (event.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, currentImageIndex, filteredImages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="relative px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Explore the Gallery
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover stunning photography across nature, animals, and architecture
            </p>
          </div>
        </div>
      </div>
<br></br>
      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white backdrop-blur-sm'
              }`}
            >
              <div className="flex items-center gap-2">
                <Filter size={16} />
                {category}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                    <p className="text-gray-300 text-sm">{image.category}</p>
                  </div>
                  <button
                    onClick={() => openLightbox(image)}
                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                  >
                    <ZoomIn size={20} />
                  </button>
                </div>
              </div>
              <button
                onClick={() => openLightbox(image)}
                className="absolute inset-0 w-full h-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-2xl"
                aria-label={`View ${image.title} in lightbox`}
              />
            </div>
          ))}
        </div>
      </div>

      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors duration-200"
          >
            <X size={24} />
          </button>
          <button
            onClick={goToPrevious}
            className="absolute left-4 z-10 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 z-10 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>
          <div className="relative flex items-center justify-center max-w-[90vw] max-h-[90vh] overflow-hidden animate-fade-in">
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="w-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <h3 className="text-white text-2xl font-bold mb-2">{lightboxImage.title}</h3>
              <p className="text-gray-300">{lightboxImage.category}</p>
              <p className="text-gray-400 text-sm mt-1">
                {currentImageIndex + 1} of {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}

     <style jsx>{`
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }

  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out;
  }
`}</style>
 
    </div>
  );
}

export default App;
