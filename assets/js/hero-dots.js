// Dot Convergence Animation for Sirens Hero Section
(function() {
    'use strict';
    
    function initDotAnimation() {
        const canvas = document.getElementById('hero-dots-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let width, height, centerX, centerY;
        let particles = [];
        let animationId;
        
        function resize() {
            const container = canvas.parentElement;
            width = container.offsetWidth;
            height = container.offsetHeight;
            canvas.width = width;
            canvas.height = height;
            centerX = width / 2;
            centerY = height / 2;
        }
        
        class Particle {
            constructor(fromLeft) {
                this.fromLeft = fromLeft;
                this.reset();
            }
            
            reset() {
                // Start from left or right edge
                this.x = this.fromLeft ? -20 : width + 20;
                this.y = Math.random() * height;
                this.targetX = centerX + (Math.random() - 0.5) * 100;
                this.targetY = centerY + (Math.random() - 0.5) * 100;
                this.size = Math.random() * 3 + 2;
                this.speed = Math.random() * 0.5 + 0.3;
                this.alpha = 0;
                this.maxAlpha = Math.random() * 0.6 + 0.3;
            }
            
            update() {
                // Move towards center
                const dx = this.targetX - this.x;
                const dy = this.targetY - this.y;
                this.x += dx * this.speed;
                this.y += dy * this.speed;
                
                // Fade in as approaching center
                const distToCenter = Math.sqrt(dx * dx + dy * dy);
                if (distToCenter > 100) {
                    this.alpha = Math.min(this.alpha + 0.02, this.maxAlpha);
                } else {
                    this.alpha = Math.max(this.alpha - 0.01, 0);
                }
                
                // Reset if reached center
                if (distToCenter < 10 && this.alpha < 0.1) {
                    this.reset();
                }
            }
            
            draw() {
                ctx.fillStyle = `rgba(230, 230, 225, ${this.alpha})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        function init() {
            resize();
            particles = [];
            
            // Create particles - half from left, half from right
            const particleCount = 60;
            for (let i = 0; i < particleCount / 2; i++) {
                particles.push(new Particle(true));  // from left
                particles.push(new Particle(false)); // from right
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            animationId = requestAnimationFrame(animate);
        }
        
        // Initialize
        init();
        animate();
        
        // Handle resize
        window.addEventListener('resize', function() {
            resize();
        });
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', function() {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        });
    }
    
    // Start animation when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDotAnimation);
    } else {
        initDotAnimation();
    }
})();
