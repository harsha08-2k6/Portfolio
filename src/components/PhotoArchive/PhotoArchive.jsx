import { useEffect, useState } from 'react';
import FolderFloat from '../FolderFloat/FolderFloat';
import { client, urlFor } from '../../sanityClient';
import './PhotoArchive.css';

const categories = ['Photos', 'Travel', 'Videos'];

export default function PhotoArchive() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullscreenIndex, setFullscreenIndex] = useState(null);

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

  const selectedPhotos = selectedCategory
    ? photos
        .filter(photo => photo.category === selectedCategory)
        .flatMap(photo => {
          const items = [];
          
          // Add primary image if it exists
          if (photo.image) {
            items.push({
              src: urlFor(photo.image).url(),
              title: photo.title,
              alt: photo.alt || photo.title,
            });
          }
          
          // Add gallery images if they exist
          if (photo.images && photo.images.length > 0) {
            photo.images.forEach((img) => {
              items.push({
                type: 'image',
                src: urlFor(img).url(),
                title: photo.title,
                alt: photo.alt || photo.title,
              });
            });
          }
          
          // Add video if it exists
          if (photo.videoUrl) {
            items.push({
              type: 'video',
              src: photo.videoUrl,
              title: photo.title,
              alt: photo.alt || photo.title,
            });
          }
          
          return items;
        })
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
        if (fullscreenIndex !== null) {
          setFullscreenIndex(null);
        } else {
          closeGallery();
        }
      } else if (event.key === 'ArrowRight' && fullscreenIndex !== null) {
        setFullscreenIndex(prev => (prev + 1) % selectedPhotos.length);
      } else if (event.key === 'ArrowLeft' && fullscreenIndex !== null) {
        setFullscreenIndex(prev => (prev - 1 + selectedPhotos.length) % selectedPhotos.length);
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

            {selectedPhotos.length > 0 ? (
              <div className="photo-gallery__grid">
                {selectedPhotos.map((photo, index) => (
                  <figure
                    className="photo-gallery__item"
                    key={`${photo.src}-${index}`}
                    onClick={() => setFullscreenIndex(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    {photo.type === 'video' ? (
                      <video
                        src={photo.src}
                        controls
                        style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px' }}
                      />
                    ) : (
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                      />
                    )}

                    {photo.title && (
                      <figcaption>{photo.title}</figcaption>
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

      {fullscreenIndex !== null && selectedPhotos[fullscreenIndex] && (
        <div className="photo-lightbox" onClick={() => setFullscreenIndex(null)}>
          <button className="photo-lightbox__close" onClick={() => setFullscreenIndex(null)}>&times;</button>
          
          <button 
            className="photo-lightbox__nav photo-lightbox__nav--prev"
            onClick={(e) => { e.stopPropagation(); setFullscreenIndex((fullscreenIndex - 1 + selectedPhotos.length) % selectedPhotos.length); }}
          >
            &#10094;
          </button>

          <div className="photo-lightbox__content" onClick={(e) => e.stopPropagation()}>
            {selectedPhotos[fullscreenIndex].type === 'video' ? (
              <video src={selectedPhotos[fullscreenIndex].src} controls autoPlay />
            ) : (
              <img src={selectedPhotos[fullscreenIndex].src} alt={selectedPhotos[fullscreenIndex].alt} />
            )}
          </div>

          <button 
            className="photo-lightbox__nav photo-lightbox__nav--next"
            onClick={(e) => { e.stopPropagation(); setFullscreenIndex((fullscreenIndex + 1) % selectedPhotos.length); }}
          >
            &#10095;
          </button>
        </div>
      )}
    </>
  );
}
