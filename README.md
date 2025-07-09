# 🌐 OCR Frontend (Vite + React)

This is the frontend for the OCR Aadhaar reader application, built using **Vite** and **React**. It interacts with the backend OCR service to upload Aadhaar card images and display the extracted information.

---

## 🚀 Features

- 📤 Upload Aadhaar front & back images
- 🧠 Sends images to backend for OCR processing
- 📄 Displays extracted name, DOB, gender, Aadhaar number, address, etc.
- 🌍 CORS compatible with backend
- ⚡ Fast dev experience with Vite

---

## 🛠 Setup (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/SHIKHIL8137/Aadhar_OCR_Front-End.git
cd ocr-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
VITE_API_BASE_URL=http://localhost:5000
```

> This should match the backend URL (especially if it runs in Docker).

### 4. Start the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to open the app.

---

## 🔁 API Integration

The frontend sends a `POST` request to:

```ts
POST /api/ocr
Content-Type: multipart/form-data
```

With `frontImage` and `backImage` as form-data fields.

You can use Axios like this:

```ts
const response = await axios.post(\`\${import.meta.env.VITE_API_BASE_URL}/api/ocr\`, formData);
```

---

## 📦 Production Build

To create a production-ready build:

```bash
npm run build
```

To locally preview the build:

```bash
npm run preview
```

---

## 🚀 Deployment

You can deploy this frontend easily using any static hosting service like:

- Vercel (Recommended)
- Netlify
- Render (Static Site)
- GitHub Pages

Set your `VITE_API_BASE_URL` in the host's environment variable settings for production.

---

## ✍️ Author

Built with ❤️ by [Shikhil K S](https://github.com/SHIKHIL8137)

---

## 📄 License

This project is licensed under the MIT License.
