import React from 'react';

const Loading = ({ size, className }: { size?: 'sm'; className?: string }) => {
  if (size === 'sm') {
    return (
      <div className={`loading--sm ${className || ''}`}>
        <div className="spinner-icon"></div>
      </div>
    );
  }

  return (
    <section className={`loading ${className}`}>
      <div>
        <div>
          <span className="one h6"></span>
          <span className="two h3"></span>
        </div>
      </div>

      <div>
        <div>
          <span className="one h1"></span>
          <span className="two h4"></span>
        </div>
      </div>

      <div>
        <div>
          <span className="one h5"></span>
          <span className="two h2"></span>
        </div>
      </div>
      <div className="hex"></div>
    </section>
  );
};

export default Loading;
