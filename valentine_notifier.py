"""
Valentine Week Desktop Notifier
==============================
Shows beautiful popup notifications for each day of Valentine Week!

Requirements:
    pip install plyer

Usage:
    python valentine_notifier.py
"""

import datetime
import time
import sys

# Try to import notification libraries
try:
    from plyer import notification
    PLYER_AVAILABLE = True
except ImportError:
    PLYER_AVAILABLE = False

# Try to import tkinter for GUI popup
try:
    import tkinter as tk
    from tkinter import messagebox
    TKINTER_AVAILABLE = True
except ImportError:
    TKINTER_AVAILABLE = False


# Valentine Week Data
VALENTINE_WEEK = [
    {
        "date": (2, 7),  # Feb 7
        "name": "Rose Day",
        "emoji": "🌹",
        "message": "A rose speaks of love silently, in a language known only to the heart.",
        "custom": "Like a rose, your beauty and warmth brighten every moment of my life!"
    },
    {
        "date": (2, 8),  # Feb 8
        "name": "Propose Day",
        "emoji": "💍",
        "message": "Today is the day to express what your heart has been holding!",
        "custom": "Every moment with you feels like a beautiful dream I never want to wake up from!"
    },
    {
        "date": (2, 9),  # Feb 9
        "name": "Chocolate Day",
        "emoji": "🍫",
        "message": "Life is like a box of chocolates, and you make it sweeter!",
        "custom": "You are sweeter than the sweetest chocolate. My love for you is richer than cocoa!"
    },
    {
        "date": (2, 10),  # Feb 10
        "name": "Teddy Day",
        "emoji": "🧸",
        "message": "A teddy bear is a friend you can hug anytime!",
        "custom": "I want to be your comfort, your warmth, and your forever cuddle buddy!"
    },
    {
        "date": (2, 11),  # Feb 11
        "name": "Promise Day",
        "emoji": "🤞",
        "message": "Promises are the uniquely human way of ordering the future!",
        "custom": "I promise to love you unconditionally and make you smile every single day!"
    },
    {
        "date": (2, 12),  # Feb 12
        "name": "Hug Day",
        "emoji": "🤗",
        "message": "A hug is a perfect gift - one size fits all!",
        "custom": "In your arms is where I feel safest. Sending you the warmest hug!"
    },
    {
        "date": (2, 13),  # Feb 13
        "name": "Kiss Day",
        "emoji": "💋",
        "message": "A kiss is a lovely trick to stop speech when words become superfluous!",
        "custom": "Your kisses are my favorite melody, and your love is my favorite song!"
    },
    {
        "date": (2, 14),  # Feb 14
        "name": "Valentine's Day",
        "emoji": "❤️",
        "message": "Today we celebrate the greatest gift of all - Love!",
        "custom": "You are my today, my tomorrow, and my forever. Happy Valentine's Day!"
    }
]


def get_today_event():
    """Get today's Valentine Week event if any."""
    today = datetime.date.today()
    
    for event in VALENTINE_WEEK:
        if today.month == event["date"][0] and today.day == event["date"][1]:
            return event
    
    return None


def show_system_notification(title, message):
    """Show a system notification."""
    if PLYER_AVAILABLE:
        try:
            notification.notify(
                title=title,
                message=message,
                app_name="Valentine Week 💕",
                timeout=10
            )
            return True
        except Exception as e:
            print(f"System notification failed: {e}")
    return False


def show_tkinter_popup(event, partner_name):
    """Show a beautiful tkinter popup."""
    if not TKINTER_AVAILABLE:
        return False
    
    # Create main window
    root = tk.Tk()
    root.withdraw()  # Hide main window
    
    # Create popup window
    popup = tk.Toplevel(root)
    popup.title(f"💕 Happy {event['name']}!")
    popup.geometry("500x400")
    popup.configure(bg='#2d0a1a')
    
    # Center the window
    popup.update_idletasks()
    width = popup.winfo_width()
    height = popup.winfo_height()
    x = (popup.winfo_screenwidth() // 2) - (width // 2)
    y = (popup.winfo_screenheight() // 2) - (height // 2)
    popup.geometry(f'+{x}+{y}')
    
    # Make it topmost
    popup.attributes('-topmost', True)
    
    # Emoji label
    emoji_label = tk.Label(
        popup,
        text=event['emoji'],
        font=('Segoe UI Emoji', 60),
        bg='#2d0a1a',
        fg='white'
    )
    emoji_label.pack(pady=20)
    
    # Title label
    title_label = tk.Label(
        popup,
        text=f"Happy {event['name']}!",
        font=('Georgia', 24, 'bold'),
        bg='#2d0a1a',
        fg='#ff6b9d'
    )
    title_label.pack(pady=10)
    
    # Message label
    message = event['custom'].replace('{name}', partner_name)
    msg_label = tk.Label(
        popup,
        text=f"Dear {partner_name},\n\n{message}",
        font=('Georgia', 12),
        bg='#2d0a1a',
        fg='#ffb3c6',
        wraplength=400,
        justify='center'
    )
    msg_label.pack(pady=20)
    
    # Close button
    close_btn = tk.Button(
        popup,
        text="Thank You! 💖",
        font=('Georgia', 12, 'bold'),
        bg='#ff6b9d',
        fg='white',
        padx=30,
        pady=10,
        border=0,
        cursor='hand2',
        command=lambda: [popup.destroy(), root.destroy()]
    )
    close_btn.pack(pady=20)
    
    # Run the popup
    popup.mainloop()
    return True


def show_console_message(event, partner_name):
    """Show a beautiful console message."""
    message = event['custom'].replace('{name}', partner_name)
    
    print("\n" + "=" * 60)
    print(f"  {event['emoji']}  HAPPY {event['name'].upper()}!  {event['emoji']}")
    print("=" * 60)
    print(f"\n  Dear {partner_name},")
    print(f"\n  {message}")
    print(f"\n  {event['message']}")
    print("\n" + "=" * 60)
    print("  💕 Happy Valentine Week! 💕")
    print("=" * 60 + "\n")


def show_all_days():
    """Show all Valentine Week days."""
    print("\n" + "=" * 60)
    print("  💕 VALENTINE WEEK CALENDAR 💕")
    print("=" * 60)
    
    for event in VALENTINE_WEEK:
        date_str = f"Feb {event['date'][1]}"
        print(f"\n  {event['emoji']}  {date_str} - {event['name']}")
        print(f"      {event['message']}")
    
    print("\n" + "=" * 60 + "\n")


def countdown_to_valentine():
    """Show countdown to Valentine's Day."""
    today = datetime.date.today()
    valentine = datetime.date(today.year, 2, 14)
    
    # If we're past Valentine's Day, show next year
    if today > valentine:
        valentine = datetime.date(today.year + 1, 2, 14)
    
    days_left = (valentine - today).days
    
    if days_left == 0:
        print("\n  ❤️ TODAY IS VALENTINE'S DAY! ❤️\n")
    elif days_left == 1:
        print("\n  💕 Valentine's Day is TOMORROW! 💕\n")
    else:
        print(f"\n  ⏰ {days_left} days until Valentine's Day!\n")


def main():
    print("\n" + "=" * 60)
    print("  💕 VALENTINE WEEK NOTIFIER 💕")
    print("=" * 60)
    
    # Get partner's name
    partner_name = input("\n  Enter your loved one's name: ").strip()
    
    if not partner_name:
        partner_name = "My Love"
    
    print(f"\n  💖 Creating magic for {partner_name}...")
    
    # Show countdown
    countdown_to_valentine()
    
    # Check for today's event
    event = get_today_event()
    
    if event:
        print(f"\n  ✨ Today is {event['name']}! ✨\n")
        
        # Try different notification methods
        print("  Showing notification...")
        
        # Try system notification
        if show_system_notification(
            f"💕 Happy {event['name']}!",
            f"Dear {partner_name}, {event['custom']}"
        ):
            print("  ✅ System notification sent!")
        
        # Show tkinter popup
        if TKINTER_AVAILABLE:
            print("  ✅ Opening popup window...")
            show_tkinter_popup(event, partner_name)
        
        # Show console message
        show_console_message(event, partner_name)
    else:
        print("\n  📅 Today is not a Valentine Week day.")
        print("  But every day is a day to love! 💕\n")
        
        # Show all days
        show_all = input("  Would you like to see the Valentine Week calendar? (y/n): ").lower()
        if show_all == 'y':
            show_all_days()
        
        # Ask if user wants to see a specific day
        print("\n  Would you like to preview a specific day's message?")
        print("  1. Rose Day (Feb 7)")
        print("  2. Propose Day (Feb 8)")
        print("  3. Chocolate Day (Feb 9)")
        print("  4. Teddy Day (Feb 10)")
        print("  5. Promise Day (Feb 11)")
        print("  6. Hug Day (Feb 12)")
        print("  7. Kiss Day (Feb 13)")
        print("  8. Valentine's Day (Feb 14)")
        print("  0. Exit")
        
        choice = input("\n  Enter your choice (0-8): ").strip()
        
        if choice.isdigit() and 1 <= int(choice) <= 8:
            event = VALENTINE_WEEK[int(choice) - 1]
            show_console_message(event, partner_name)
            
            if TKINTER_AVAILABLE:
                show_popup = input("  Show popup? (y/n): ").lower()
                if show_popup == 'y':
                    show_tkinter_popup(event, partner_name)
    
    print("\n  💕 Thank you for spreading love! 💕")
    print("  " + "=" * 56 + "\n")


if __name__ == "__main__":
    main()
