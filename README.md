# 🧢 3D Catcap Lab

Welcome to **3D Catcap Lab** — a playful, design-driven platform where cat lovers can create personalized 3D-printed caps for their feline companions. Users can choose cap colors, fonts, teams, and even add decorative busts to each design. Every cap is designed by real humans and manufactured in-house using state-of-the-art 3D printing technology.

[🌐 Visit the Lab ➝](3dcatcaps.com)

---

## 🚀 Tech Stack

- **Frontend:** React (mobile-optimized)
- **Backend:** Django + Django REST Framework
- **Database:** PostgreSQL (SQLite for dev)
- **Payments:** Stripe Checkout Integration
- **3D Printing Hardware:**
  - FlashForge Adventurer 5M Pro
  - Anycubic Kobra S1 Pro
- **Deployment:** Heroku or other PaaS

---

## ✅ Key Features

### 🧢 Cap Customization

- Choose cap color (Sox black, Cubs blue, etc.)
- Add your cat’s name with custom font and color
- Select a favorite Chicago team (Sox or Cubs)
- **One bust per cap**:
  - 🦁 *“Bless it up Leo style”*
  - 👾 *Labubu*
- Want both busts? Order multiple caps — one bust per cap!
- Limited edition pink cap option (interest form shown)

### 🛒 Cart & Checkout

- Add multiple caps to your cart
- Cart data persists in `localStorage`
- Stripe Checkout with live key integration
- Receipt-style confirmation screen post-purchase

### 🎥 Landing Page

- Full-screen video background
- Highlights human-made, tech-driven production
- CTA to start customizing
- Responsive on all screen sizes

### 📱 Mobile Optimization

- iPhone 15 and small screen tested
- Adaptive layout, font scaling, touch-friendly design
- Navbar and buttons adjust for mobile users

### 🧠 Interest Tracking

- Pink cap opt-in form
- Tracks user interest for future special releases

---

## 🛠 Local Development

Clone the repo and get started:

```bash
git clone https://github.com/your-username/3d-catcap-lab.git
cd 3d-catcap-lab


cd frontend
cp .env.example .env   # Add Stripe public key
npm install
npm start


cd ../backend
python3 -m venv venv
source venv/bin/activate
cp .env.example .env   # Add Django secret + Stripe private key
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py runserver
```


3d-catcap-lab/
│
├── frontend/             # React client
│   ├── components/       # Navbar, forms, success pages
│   ├── pages/            # LandingPage, CustomizePage, OrderPage
│   └── assets/           # Logos, video, fonts, icons
│
├── backend/              # Django backend
│   ├── catcaps/          # Main Django app (models, views, routes)
│   └── settings/         # Stripe config, DB, secret keys
│
├── media/                # Static assets used for local dev
├── .env.example          # Template for local environment setup
└── README.md



