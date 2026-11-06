import { useEffect, useState } from 'react';
import FolderFloat from '../FolderFloat/FolderFloat';
import { client, urlFor } from '../../sanityClient';
import './PhotoArchive.css';

const categories = ['Photos', 'Travel', 'Videos'];

export default function PhotoArchive() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullscreenDocIndex, setFullscreenDocIndex] = useState(null);
  const [fullscreenMediaIndex, setFullscreenMediaIndex] = useState(0);

  useEffect(() => {
    client
      .fetch(`*[_type == "photo"] {
        ...,
        "videoUrl": videoFile.asset->url
      } | order(_createdAt desc)`)
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
        setLoading(false);
      });
  }, []);

  const selectedDocuments = selectedCategory
    ? photos
        .filter(photo => photo.category === selectedCategory)
        .map(photo => {
          const media = [];
          
          // Add primary image first (acts as cover)
          if (photo.image) {
            media.push({
              type: 'image',
              src: urlFor(photo.image).url(),
              title: photo.title,
              alt: photo.alt || photo.title,
            });
          }
          
          // Add gallery images
          if (photo.images && photo.images.length > 0) {
            photo.images.forEach((img) => {
              media.push({
                type: 'image',
                src: urlFor(img).url(),
                title: photo.title,
                alt: photo.alt || photo.title,
              });
            });
          }
          
          // Add video
          if (photo.videoUrl) {
            media.push({
              type: 'video',
              src: photo.videoUrl,
              title: photo.title,
              alt: photo.alt || photo.title,
            });
          }
          
          return {
            title: photo.title,
            cover: media[0],
            media: media,
          };
        })
        .filter(doc => doc.media.length > 0)
    : [];

  const handleSelect = (value) => {
    setSelectedCategory(value);
  };

  const closeGallery = () => {
    setSelectedCategory(null);
  };

  useEffect(() => {
    if (!selectedCategory) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (fullscreenDocIndex !== null) {
          setFullscreenDocIndex(null);
        } else {
          closeGallery();
        }
      } else if (event.key === 'ArrowRight' && fullscreenDocIndex !== null) {
        const mediaList = selectedDocuments[fullscreenDocIndex].media;
        setFullscreenMediaIndex(prev => (prev + 1) % mediaList.length);
      } else if (event.key === 'ArrowLeft' && fullscreenDocIndex !== null) {
        const mediaList = selectedDocuments[fullscreenDocIndex].media;
        setFullscreenMediaIndex(prev => (prev - 1 + mediaList.length) % mediaList.length);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Prevent background scrolling while gallery is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedCategory]);

  return (
    <>
      <section className="photo-archive">
        <div className="photo-archive__folder">
          <FolderFloat
            items={categories}
            label="Photo Archive"
            sublabel="More moments"
            trigger="hover"
            closeOnSelect
            physics
            drift={0.5}
            onSelect={handleSelect}
            folderColor="#18181b"
            frontColor="#27272a"
            paperColor="#f4f4f5"
            itemColor="#ffffff"
            itemTextColor="#18181b"
            labelColor="#ffffff"
            width={170}
            height={125}
            radius={14}
            spread={150}
            lift={22}
            tilt={8}
            flapAngle={34}
            restAngle={16}
            openDuration={520}
            stagger={45}
            bounce={0.3}
          />
        </div>
      </section>

      {selectedCategory && (
        <div
          className="photo-gallery"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedCategory} photo gallery`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeGallery();
            }
          }}
        >
          <div className="photo-gallery__container">
            <div className="photo-gallery__header">
              <div>
                <span className="photo-gallery__code">//</span>
                <h2>{selectedCategory}</h2>
              </div>

              <button
                type="button"
                className="photo-gallery__close"
                onClick={closeGallery}
                aria-label="Close photo gallery"
              >
                ×
              </button>
            </div>

            {selectedDocuments.length > 0 ? (
              <div className="photo-gallery__grid">
                {selectedDocuments.map((doc, index) => (
                  <figure
                    className="photo-gallery__item"
                    key={`${doc.cover.src}-${index}`}
                    onClick={() => {
                      setFullscreenDocIndex(index);
                      setFullscreenMediaIndex(0);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {doc.cover.type === 'video' ? (
                      <video
                        src={doc.cover.src}
                        style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px' }}
                      />
                    ) : (
                      <img
                        src={doc.cover.src}
                        alt={doc.cover.alt}
                        loading="lazy"
                      />
                    )}

                    {doc.title && (
                      <figcaption>{doc.title}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            ) : (
              <div className="photo-gallery__empty">
                <span>01</span>
                <p>
                  Photos for this collection are coming soon.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {fullscreenDocIndex !== null && selectedDocuments[fullscreenDocIndex] && (
        <div className="photo-lightbox" onClick={() => setFullscreenDocIndex(null)}>
          <button className="photo-lightbox__close" onClick={() => setFullscreenDocIndex(null)}>&times;</button>
          
          <button 
            className="photo-lightbox__nav photo-lightbox__nav--prev"
            onClick={(e) => { 
              e.stopPropagation(); 
              const mediaList = selectedDocuments[fullscreenDocIndex].media;
              setFullscreenMediaIndex((fullscreenMediaIndex - 1 + mediaList.length) % mediaList.length); 
            }}
          >
            &#10094;
          </button>

          <div className="photo-lightbox__content" onClick={(e) => e.stopPropagation()}>
            {selectedDocuments[fullscreenDocIndex].media[fullscreenMediaIndex].type === 'video' ? (
              <video src={selectedDocuments[fullscreenDocIndex].media[fullscreenMediaIndex].src} controls autoPlay />
            ) : (
              <img 
                src={selectedDocuments[fullscreenDocIndex].media[fullscreenMediaIndex].src} 
                alt={selectedDocuments[fullscreenDocIndex].media[fullscreenMediaIndex].alt} 
              />
            )}
            
            {/* Show image counter e.g. 1 / 5 */}
            {selectedDocuments[fullscreenDocIndex].media.length > 1 && (
              <div style={{ color: 'white', textAlign: 'center', marginTop: '10px', fontSize: '14px' }}>
                {fullscreenMediaIndex + 1} / {selectedDocuments[fullscreenDocIndex].media.length}
              </div>
            )}
          </div>

          <button 
            className="photo-lightbox__nav photo-lightbox__nav--next"
            onClick={(e) => { 
              e.stopPropagation(); 
              const mediaList = selectedDocuments[fullscreenDocIndex].media;
              setFullscreenMediaIndex((fullscreenMediaIndex + 1) % mediaList.length); 
            }}
          >
            &#10095;
          </button>
        </div>
      )}
    </>
  );
}
