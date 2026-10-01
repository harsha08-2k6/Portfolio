import { useEffect, useState } from 'react';
import FolderFloat from '../FolderFloat/FolderFloat';
import { client, urlFor } from '../../sanityClient';
import './PhotoArchive.css';

const categories = ['Photos', 'Travel', 'Videos'];

export default function PhotoArchive() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(`*[_type == "photo"] | order(_createdAt desc)`)
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
        .map(photo => ({
          src: photo.image ? urlFor(photo.image).url() : '',
          title: photo.title,
          alt: photo.alt || photo.title,
        }))
        .filter(photo => photo.src)
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
        closeGallery();
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
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                    />

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
    </>
  );
}
