# 🌄 Yelpcamp

Yelpcamp is a full-stack web application where users can **create, view, edit, and review campgrounds** from around the world.  
It’s built with **Node.js, Express, MongoDB, and EJS**, with additional integrations for authentication, file uploads, and map visualization.

---

## 🚀 Features

- **User Authentication**
  - Sign up, login, and logout functionality.
  - Password hashing and authentication via `passport` and `passport-local-mongoose`.
  
- **Campground Management**
  - Create, edit, and delete campgrounds.
  - Upload campground images using **Multer** and store them in **Cloudinary**.
  
- **Reviews**
  - Add, edit, and delete reviews for each campground.
  - Input validation with `joi` to ensure clean data.

- **Map Integration**
  - Interactive maps using **MapTiler** to display campground locations.
  
- **Security**
  - Input sanitization with `express-mongo-sanitize` and `sanitize-html`.
  - Secure HTTP headers via `helmet`.

- **Session Management**
  - Persistent sessions stored in MongoDB with `connect-mongo`.
  - Flash messages for success/error alerts.

---

## 🛠️ Tech Stack

### **Backend**
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)

### **Frontend**
- [EJS](https://ejs.co/) templating engine
- [EJS-Mate](https://www.npmjs.com/package/ejs-mate) for layout support
- Bootstrap / Custom CSS for styling

### **Other Integrations**
- [Cloudinary](https://cloudinary.com/) for image hosting
- [Multer](https://github.com/expressjs/multer) & [multer-storage-cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary) for file uploads
- [MapTiler](https://www.maptiler.com/) for maps
- [Passport.js](http://www.passportjs.org/) for authentication

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `express` | Web server framework |
| `mongoose` | MongoDB object modeling |
| `ejs` & `ejs-mate` | View rendering and layouts |
| `passport`, `passport-local`, `passport-local-mongoose` | Authentication |
| `express-session`, `connect-mongo` | Session storage in MongoDB |
| `connect-flash` | Temporary flash messages |
| `method-override` | HTTP verb overrides |
| `dotenv` | Environment variable management |
| `morgan` | HTTP request logging |
| `multer`, `multer-storage-cloudinary` | File upload and storage |
| `cloudinary` | Image hosting |
| `@maptiler/client` | Map rendering |
| `helmet` | Security headers |
| `joi` | Request data validation |
| `express-mongo-sanitize`, `sanitize-html` | Prevent XSS and NoSQL injection |

---

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git https://github.com/PrasadKumbre/YelpCamp.git
   cd yelpcamp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory:

   ```env
   DATABASE_URL=mongodb://localhost:27017/yelpcamp
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_KEY=your_cloud_key
   CLOUDINARY_SECRET=your_cloud_secret
   MAPTILER_API_KEY=your_maptiler_api_key
   SESSION_SECRET=your_session_secret
   ```

4. **Run the app**

   ```bash
   node index.js
   ```

   Or if you have nodemon:

   ```bash
   nodemon index.js
   ```

---

## 📂 Project Structure

```
yelpcamp/
│── models/         # Mongoose models for Users, Campgrounds, Reviews
│── routes/         # Express route handlers
│── views/          # EJS templates
│── public/         # Static files (CSS, JS, images)
│── seeds/          # Database seed files
│── index.js        # Entry point
│── .env            # Environment variables
│── package.json    # Dependencies & scripts
```

---

## 🔐 Security Practices

* Sanitized inputs to prevent NoSQL Injection (`express-mongo-sanitize`).
* Removed malicious HTML (`sanitize-html`).
* Helmet for enhanced HTTP security headers.
* Validated form inputs with `joi`.

---

## 📜 License

This project is licensed under the [ISC License](LICENSE).

---

## 👨‍💻 Author

Developed by **Prasad Kumbre**
[GitHub](https://github.com/PrasadKumbre) | [LinkedIn](https://in.linkedin.com/in/prasad-kumbre-367372229)

## 📸 Screenshots

### Home Page
![Home Page](<img width="600" height="500" alt="image" src="https://github.com/user-attachments/assets/3af8a7b1-2a95-4762-8757-e35908a49d52" />)

### Campground Details Page
![Campground Details](<img width="1738" height="1175" alt="image" src="https://github.com/user-attachments/assets/33738c30-cf54-4664-ad12-0596f0ec8093" />
)

### Add New Campground
![Add Campground](<img width="600" height="500" alt="image" src="https://github.com/user-attachments/assets/dcf1b53a-488f-43f8-bb64-5df95df0eaff" />
)
