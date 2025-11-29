// Blog JavaScript for riteshsharma.me

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Copy code blocks to clipboard
    const addCopyButtons = () => {
        const codeBlocks = document.querySelectorAll('pre');
        
        codeBlocks.forEach(block => {
            // Create copy button
            const button = document.createElement('button');
            button.className = 'copy-button';
            button.textContent = 'Copy';
            button.style.cssText = `
                position: absolute;
                top: 8px;
                right: 8px;
                padding: 4px 8px;
                background: #4a5568;
                color: white;
                border: none;
                border-radius: 4px;
                font-size: 12px;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.2s;
            `;
            
            // Wrap code block in container
            const container = document.createElement('div');
            container.style.position = 'relative';
            block.parentNode.insertBefore(container, block);
            container.appendChild(block);
            container.appendChild(button);
            
            // Show button on hover
            container.addEventListener('mouseenter', () => {
                button.style.opacity = '1';
            });
            
            container.addEventListener('mouseleave', () => {
                button.style.opacity = '0';
            });
            
            // Copy functionality
            button.addEventListener('click', async () => {
                const code = block.textContent;
                try {
                    await navigator.clipboard.writeText(code);
                    button.textContent = 'Copied!';
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
        });
    };
    
    addCopyButtons();
    
    // Progress bar for reading
    const createProgressBar = () => {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #2563eb, #1e40af);
            transition: width 0.1s;
            z-index: 1000;
        `;
        document.body.appendChild(progressBar);
        
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = progress + '%';
        };
        
        window.addEventListener('scroll', updateProgress);
        updateProgress();
    };
    
    // Only add progress bar on individual post pages
    if (document.querySelector('.blog-post')) {
        createProgressBar();
    }
    
    // Mobile menu toggle
    const createMobileMenu = () => {
        const navbar = document.querySelector('.navbar');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!navbar || !navMenu) return;
        
        const menuButton = document.createElement('button');
        menuButton.className = 'menu-toggle';
        menuButton.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        menuButton.style.cssText = `
            display: none;
            flex-direction: column;
            gap: 4px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 8px;
        `;
        
        const spans = menuButton.querySelectorAll('span');
        spans.forEach(span => {
            span.style.cssText = `
                display: block;
                width: 24px;
                height: 2px;
                background: #1f2937;
                transition: transform 0.3s;
            `;
        });
        
        navbar.querySelector('.container').appendChild(menuButton);
        
        // Mobile styles
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .menu-toggle {
                    display: flex !important;
                }
                
                .nav-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    flex-direction: column;
                    padding: 1rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                
                .nav-menu.active {
                    display: flex;
                }
                
                .menu-toggle.active span:nth-child(1) {
                    transform: rotate(45deg) translate(6px, 6px);
                }
                
                .menu-toggle.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .menu-toggle.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(6px, -6px);
                }
            }
        `;
        document.head.appendChild(style);
        
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                navMenu.classList.remove('active');
                menuButton.classList.remove('active');
            }
        });
    };
    
    createMobileMenu();
    
    // Image lazy loading
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    };
    
    lazyLoadImages();
    
    // Search functionality
    const addSearch = () => {
        const searchContainer = document.querySelector('.search-container');
        if (!searchContainer) return;
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search posts...';
        searchInput.className = 'search-input';
        searchInput.style.cssText = `
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            font-size: 16px;
            outline: none;
            transition: border-color 0.2s;
        `;
        
        searchInput.addEventListener('focus', () => {
            searchInput.style.borderColor = '#2563eb';
        });
        
        searchInput.addEventListener('blur', () => {
            searchInput.style.borderColor = '#e5e7eb';
        });
        
        searchContainer.appendChild(searchInput);
        
        // Simple client-side search
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const posts = document.querySelectorAll('.post-item, .post-card');
            
            posts.forEach(post => {
                const text = post.textContent.toLowerCase();
                if (text.includes(query)) {
                    post.style.display = '';
                } else {
                    post.style.display = 'none';
                }
            });
            
            // Show no results message
            const noResults = document.querySelector('.no-results');
            const visiblePosts = Array.from(posts).filter(p => p.style.display !== 'none');
            
            if (visiblePosts.length === 0 && query) {
                if (!noResults) {
                    const message = document.createElement('div');
                    message.className = 'no-results';
                    message.textContent = 'No posts found matching your search.';
                    message.style.cssText = `
                        text-align: center;
                        padding: 3rem;
                        color: #6b7280;
                        font-size: 1.125rem;
                    `;
                    document.querySelector('.posts-list, .featured-grid').appendChild(message);
                } else {
                    noResults.style.display = 'block';
                }
            } else if (noResults) {
                noResults.style.display = 'none';
            }
        });
    };
    
    // Add search box to blog index
    if (document.querySelector('.blog-header') && !document.querySelector('.blog-post')) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.style.cssText = `
            max-width: 600px;
            margin: 2rem auto;
        `;
        document.querySelector('.blog-header').appendChild(searchContainer);
        addSearch();
    }
    
    // Share buttons
    const addShareButtons = () => {
        const postHeader = document.querySelector('.post-header');
        if (!postHeader) return;
        
        const shareContainer = document.createElement('div');
        shareContainer.className = 'share-buttons';
        shareContainer.style.cssText = `
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 1.5rem;
        `;
        
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.querySelector('.post-title').textContent);
        
        const shareLinks = [
            {
                name: 'Twitter',
                url: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
                color: '#1DA1F2'
            },
            {
                name: 'LinkedIn',
                url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
                color: '#0077B5'
            },
            {
                name: 'Facebook',
                url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                color: '#1877F2'
            }
        ];
        
        shareLinks.forEach(platform => {
            const link = document.createElement('a');
            link.href = platform.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = platform.name;
            link.style.cssText = `
                padding: 8px 16px;
                background: ${platform.color};
                color: white;
                text-decoration: none;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                transition: opacity 0.2s;
            `;
            
            link.addEventListener('mouseenter', () => {
                link.style.opacity = '0.8';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.opacity = '1';
            });
            
            shareContainer.appendChild(link);
        });
        
        postHeader.appendChild(shareContainer);
    };
    
    if (document.querySelector('.blog-post')) {
        addShareButtons();
    }
    
    // Table of Contents for long posts
    const createTOC = () => {
        const postBody = document.querySelector('.post-body');
        if (!postBody) return;
        
        const headings = postBody.querySelectorAll('h2, h3');
        if (headings.length < 3) return;
        
        const toc = document.createElement('div');
        toc.className = 'table-of-contents';
        toc.style.cssText = `
            position: fixed;
            left: 20px;
            top: 200px;
            width: 200px;
            padding: 1rem;
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            max-height: 400px;
            overflow-y: auto;
        `;
        
        const tocTitle = document.createElement('h4');
        tocTitle.textContent = 'Contents';
        tocTitle.style.cssText = `
            margin-bottom: 0.75rem;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            color: #6b7280;
        `;
        toc.appendChild(tocTitle);
        
        const tocList = document.createElement('ul');
        tocList.style.cssText = `
            list-style: none;
            padding: 0;
        `;
        
        headings.forEach(heading => {
            const li = document.createElement('li');
            const level = heading.tagName === 'H2' ? 0 : 1;
            li.style.cssText = `
                margin-bottom: 0.5rem;
                padding-left: ${level * 1}rem;
            `;
            
            const link = document.createElement('a');
            link.href = '#' + (heading.id || heading.textContent.toLowerCase().replace(/\s+/g, '-'));
            link.textContent = heading.textContent;
            link.style.cssText = `
                color: #6b7280;
                text-decoration: none;
                font-size: 14px;
                transition: color 0.2s;
            `;
            
            link.addEventListener('mouseenter', () => {
                link.style.color = '#2563eb';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.color = '#6b7280';
            });
            
            li.appendChild(link);
            tocList.appendChild(li);
        });
        
        toc.appendChild(tocList);
        
        // Only show on large screens
        const mediaQuery = window.matchMedia('(min-width: 1400px)');
        if (mediaQuery.matches) {
            document.body.appendChild(toc);
        }
        
        mediaQuery.addEventListener('change', (e) => {
            if (e.matches) {
                document.body.appendChild(toc);
            } else {
                toc.remove();
            }
        });
    };
    
    if (document.querySelector('.blog-post')) {
        createTOC();
    }
});
