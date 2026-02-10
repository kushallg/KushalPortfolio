// Navigation.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Twitter, Github } from 'lucide-react';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuItems = {
        main: [
            { label: 'Home', to: '/' },
            { label: 'Writing', to: '/writing' },
        ],
        projects: [
            { label: 'TIL', to: '/til' },
            { label: 'Reading', to: '/reading' },
            { label: 'Listening', to: '/listening' },
            { label: 'Good websites', to: '/good-websites' },
        ],
    };

    const socialLinks = [
        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
        { icon: Github, href: 'https://github.com/kushallg', label: 'GitHub' },
    ];

    return (
        <>
            {/* Hamburger Button - Always visible */}
            <button
                onClick={toggleMenu}
                className="nav-toggle"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
                {isOpen ? (
                    <X size={24} strokeWidth={2} />
                ) : (
                    <Menu size={24} strokeWidth={2} />
                )}
            </button>

            {/* Full-screen Menu Overlay */}
            <div className={`nav-overlay ${isOpen ? 'nav-overlay--open' : ''}`}>
                <nav className="nav-menu">
                    {/* Main Links */}
                    <ul className="nav-list nav-list--main">
                        {menuItems.main.map((item) => (
                            <li key={item.label}>
                                <Link
                                    to={item.to}
                                    className="nav-link nav-link--main"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Projects Section */}
                    <div className="nav-section">
                        <span className="nav-section-label">Projects</span>
                        <ul className="nav-list nav-list--projects">
                            {menuItems.projects.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        to={item.to}
                                        className="nav-link nav-link--project"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Icons */}
                    <div className="nav-social">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="nav-social-link"
                                aria-label={social.label}
                            >
                                <social.icon size={20} />
                            </a>
                        ))}
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Navigation;
