/**
 * Shared Navigation System for Archalo
 * This file handles navigation HTML injection and functionality across all pages
 */

// Navigation HTML structure
const navigationHTML = `
    <nav>
        <div class="nav-container">
            <a href="index.html" style="text-decoration: none; color: inherit;">
                <img src="logos/Archalo_logo-bg.png" alt="Archalo" class="logo">
            </a>
            <button class="hamburger" id="hamburger" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul class="nav-links" id="navLinks">
                <li><a href="index.html">Home</a></li>
                <li><a href="laws.html">Laws</a></li>
                <li><a href="artifactHelp.html">I Found an Artifact</a></li>
                <li><a href="edu-resources.html">Educational Resources</a></li>
            </ul>
        </div>
    </nav>
`;

// Navigation CSS styles
const navigationStyles = `
    /* Navigation */
    nav {
        background: white;
        padding: 1rem 0;
        position: sticky;
        top: 0;
        z-index: 1000;
        box-shadow: 0 2px 20px rgba(0,0,0,0.1);
    }
    
    .nav-container {
        max-width: 1400px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
    }
    
    .logo {
        height: clamp(2.5rem, 5vw, 3.5rem);
        width: auto;
        display: block;
        object-fit: contain;
    }
    
    .nav-links {
        display: flex;
        list-style: none;
        gap: clamp(1rem, 3vw, 2rem);
    }
    
    .nav-links a {
        color: #2c3e50;
        text-decoration: none;
        font-weight: 500;
        font-size: clamp(0.9rem, 2vw, 1rem);
        padding: 0.5rem 1rem;
        border-radius: 6px;
        transition: all 0.3s ease;
    }
    
    .nav-links a:hover {
        background-color: rgba(52, 152, 219, 0.2);
        color: #3498db;
        transform: translateY(-1px);
    }
    
    /* Hamburger Menu */
    .hamburger {
        display: none;
        flex-direction: column;
        cursor: pointer;
        background: none;
        border: none;
        padding: 0.5rem;
        z-index: 1001;
    }
    
    .hamburger span {
        width: 25px;
        height: 3px;
        background-color: #2c3e50;
        margin: 3px 0;
        transition: all 0.3s ease;
        border-radius: 2px;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    /* Mobile menu toggle */
    .mobile-menu-toggle {
        display: none;
        background: none;
        border: none;
        color: #ecf0f1;
        font-size: 1.5rem;
        cursor: pointer;
    }
    
    /* Responsive breakpoints for navigation */
    @media (max-width: 768px) {
        .hamburger {
            display: flex;
        }
        
        .nav-links {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background: white;
            width: 100%;
            text-align: center;
            transition: left 0.3s ease;
            box-shadow: 0 10px 27px rgba(0,0,0,0.3);
            padding: 1rem 0;
            gap: 0;
        }
        
        .nav-links.active {
            left: 0;
        }
        
        .nav-links li {
            padding: 0.5rem 0;
            width: 100%;
        }
        
        .nav-links a {
            display: block;
            padding: 1rem;
            width: 100%;
        }
        
        .mobile-menu-toggle {
            display: none;
        }
    }
    
    @media (max-width: 480px) {
        .nav-container {
            padding: 0 1rem;
        }
    }
`;

/**
 * Initialize navigation on page load
 * This function should be called when the DOM is ready
 */
function initializeNavigation() {
    // Inject CSS styles
    const styleElement = document.createElement('style');
    styleElement.textContent = navigationStyles;
    document.head.appendChild(styleElement);
    
    // Inject navigation HTML at the beginning of body
    const navContainer = document.createElement('div');
    navContainer.innerHTML = navigationHTML;
    document.body.insertBefore(navContainer.firstElementChild, document.body.firstChild);
    
    // Initialize hamburger menu functionality
    initializeHamburgerMenu();
}

/**
 * Initialize hamburger menu functionality
 */
function initializeHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavigation);
} else {
    // DOM is already ready
    initializeNavigation();
}

// Export functions for manual initialization if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNavigation,
        initializeHamburgerMenu
    };
}
