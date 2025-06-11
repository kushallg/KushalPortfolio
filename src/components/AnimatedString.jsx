// AnimatedString.jsx
import React from 'react';
import './AnimatedString.css'; // We'll create this CSS file

const AnimatedString = ({ 
  position = '75%', 
  stringHeight = '60vh',
  icon = null,
  iconBg = '#000',
  iconColor = '#fff'
}) => {
  return (
    <div 
      className="animated-string-container"
      style={{ left: position }}
    >
      {/* String */}
      <div 
        className="animated-string"
        style={{ 
          '--string-height': stringHeight,
          boxShadow: '1px 0 3px rgba(0,0,0,0.1)',
          borderRadius: '0.5px'
        }}
      />
      
      {/* Icon at bottom */}
      {icon && (
        <div className="string-icon-container">
          <div 
            className="string-icon"
            style={{ 
              backgroundColor: iconBg,
              color: iconColor 
            }}
          >
            {icon}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimatedString;
