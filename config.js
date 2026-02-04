// ============================================
// Valentine Week - Configuration Handler
// ============================================

const ValentineConfig = {
    STORAGE_KEY: 'valentine_week_config',

    // Default messages for each day
    defaults: {
        rose: {
            title: "Rose Day",
            emoji: "🌹",
            date: "February 7",
            quote: '"A rose speaks of love silently, in a language known only to the heart."',
            defaultMessage: "Like a rose, your beauty and warmth brighten every moment of my life. You are the most beautiful flower in my garden of love."
        },
        propose: {
            title: "Propose Day",
            emoji: "💍",
            date: "February 8",
            quote: '"I love you not only for what you are, but for what I am when I am with you."',
            defaultMessage: "Every moment with you feels like a beautiful dream I never want to wake up from. Will you be mine forever?"
        },
        chocolate: {
            title: "Chocolate Day",
            emoji: "🍫",
            date: "February 9",
            quote: '"All you need is love. But a little chocolate now and then doesn\'t hurt."',
            defaultMessage: "You are sweeter than the sweetest chocolate. My love for you is richer and deeper than any cocoa."
        },
        teddy: {
            title: "Teddy Day",
            emoji: "🧸",
            date: "February 10",
            quote: '"A teddy bear is a friend you can hug anytime."',
            defaultMessage: "Just like a teddy bear, I want to be your comfort, your warmth, and your forever cuddle buddy."
        },
        promise: {
            title: "Promise Day",
            emoji: "🤞",
            date: "February 11",
            quote: '"A promise is a cloud; fulfillment is rain."',
            defaultMessage: "I promise to love you unconditionally, to support you always, and to make you smile every single day."
        },
        hug: {
            title: "Hug Day",
            emoji: "🤗",
            date: "February 12",
            quote: '"A hug is like a boomerang - you get it back right away."',
            defaultMessage: "In your arms is where I feel safest. Sending you the biggest, warmest, most loving hug!"
        },
        kiss: {
            title: "Kiss Day",
            emoji: "💋",
            date: "February 13",
            quote: '"A kiss seals two souls for a moment in time."',
            defaultMessage: "Your kisses are my favorite melody, and your love is my favorite song."
        },
        valentine: {
            title: "Valentine's Day",
            emoji: "❤️",
            date: "February 14",
            quote: '"Love is composed of a single soul inhabiting two bodies." - Aristotle',
            defaultMessage: "You are my today, my tomorrow, and my forever. Happy Valentine's Day, my love!"
        }
    },

    // Save configuration to localStorage
    save: function(config) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(config));
            return true;
        } catch (e) {
            console.error('Error saving config:', e);
            return false;
        }
    },

    // Load configuration from localStorage
    load: function() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.error('Error loading config:', e);
        }
        return {
            name: '',
            image: null,
            messages: {}
        };
    },

    // Get config for a specific day
    getDay: function(day) {
        const config = this.load();
        const dayDefaults = this.defaults[day] || {};
        
        return {
            name: config.name || 'My Love',
            image: config.image || null,
            title: dayDefaults.title || 'Valentine Week',
            emoji: dayDefaults.emoji || '❤️',
            date: dayDefaults.date || '',
            quote: dayDefaults.quote || '',
            message: (config.messages && config.messages[day]) || dayDefaults.defaultMessage || ''
        };
    },

    // Clear all saved data
    clear: function() {
        localStorage.removeItem(this.STORAGE_KEY);
    },

    // Check if config exists
    hasConfig: function() {
        const config = this.load();
        return !!(config.name);
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ValentineConfig;
}
