import React from 'react';

const PostCard = ({ post }) => {
  // Función que decide si mostrar video o imagen
  const renderMedia = () => {
    if (post.type === 'video') {
      return (
        <div className="blog-video">
          <iframe
            src={post.videoSrc}
            title={post.videoTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
      );
    } else {
      return (
        <img 
          src={post.image} 
          alt={post.imageAlt || post.title} 
        />
      );
    }
  };

  // Función que muestra el botón (si hay un enlace)
  const renderActionButton = () => {
    if (post.link) {
      return (
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-button"
        >
          {post.linkText}
        </a>
      );
    }
    return null;
  };

  return (
    <div className="blog-card">
      {renderMedia()}
      <div className="blog-content blog-content-card">
        <h2 className="blog-title">{post.title}</h2>
        <p className="blog-description">{post.description}</p>
        
        <div className="blog-footer">
          <span className="blog-tag">{post.tag}</span>
          {renderActionButton()}
        </div>
      </div>
    </div>
  );
};

export default PostCard;