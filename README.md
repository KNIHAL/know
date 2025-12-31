# KNOW – A Minimal Learning Platform

KNOW is a **minimal, end‑to‑end learning platform** built with **Next.js App Router**, **Supabase**, and **NextAuth**.

This project started as a full‑fledged ed‑tech idea but was **intentionally simplified** and is now released as an **open‑source showcase project** focused on:

* Clean architecture
* Real‑world authentication & authorization
* Paid content gating
* Admin‑driven content management

The goal of this repository is **learning by building**, not feature bloat.

---

## 🚀 What KNOW Does

* Users can **sign up / log in**
* Students can **view micro‑courses**
* Paid content is **locked behind purchase checks**
* Admin can **create & manage micro‑courses**
* Payments handled via **Razorpay**

> Notes, PPTs, and videos are intentionally stored as **external URLs** (Notion, Google Drive, YouTube) to keep the platform simple.

---

> This repo shows **how to simplify a product without breaking architecture**.

---

## 🧩 Tech Stack

* **Next.js 14 (App Router)**
* **TypeScript**
* **Supabase (PostgreSQL + Auth + Storage)**
* **NextAuth** (Credentials + Session)
* **Razorpay** (Payments)
* **Tailwind CSS + shadcn/ui**

---

## 📁 Project Structure

```txt
D:\KNOW\SRC
│   middleware.ts
│
├───app
│   │   globals.css
│   │   layout.tsx
│   │   page.tsx
│   │   providers.tsx
│   │
│   ├───admin
│   │   │   layout.tsx
│   │   │   not-authorized.tsx
│   │   │   page.tsx
│   │   │
│   │   └───micro-courses
│   │       │   actions.ts
│   │       │   page.tsx
│   │       │
│   │       ├───new
│   │       │       page.tsx
│   │       │
│   │       └───[id]
│   │           └───edit
│   │                   page.tsx
│   │
│   ├───api
│   │   ├───auth
│   │   │   ├───signup
│   │   │   │       route.ts
│   │   │   │
│   │   │   └───[...nextauth]
│   │   │           route.ts
│   │   │
│   │   └───payments
│   │       ├───create-order
│   │       │       route.ts
│   │       │
│   │       └───webhook
│   │               route.ts
│   │
│   ├───auth
│   │   ├───forget-password
│   │   ├───login
│   │   ├───reset-password
│   │   └───signup
│   │       └───student
│   │
│   ├───student
│   │   │   layout.tsx
│   │   ├───dashboard
│   │   ├───micro-courses
│   │   ├───my-content
│   │   └───settings
│   │
│   └───utils
│           authOptions.ts
│
├───components
│   ├───admin
│   ├───landing
│   ├───student
│   └───ui
│
├───lib
│   ├───supabase.ts
│   └───guards
│       └───canAccessContent.ts
│
└───types
    └───next-auth.d.ts
```

---

## 🔐 Authentication Design (Important Learning)

### Why `authOptions` is in `app/utils/authOptions.ts`

Instead of defining auth logic inside:

```
/app/api/auth/[...nextauth]/route.ts
```

It is extracted into:

```
/app/utils/authOptions.ts
```

**Reasons:**

* Cleaner separation of concerns
* Reusable across server components & guards
* Avoids Vercel edge/runtime limitations
* Makes testing & scaling easier

This is a **real‑world best practice** for App Router apps.

---

## 🛡 Authorization Guard

Paid content is protected using a server‑side guard:

```ts
canAccessContent({ contentId, price })
```

Rules:

* Free content → always allowed
* Paid content → requires login + purchase

No `contentType` abstraction is used anymore → **simpler & safer**.

---

## 💳 Payments (Razorpay)

* Order creation via API route
* Webhook verifies payment signature
* Purchase stored in `student_purchases`

Receipt length issues, client SDK loading, and signature verification were all **intentionally debugged & fixed** during development.

---

## 📚 What I Learned From This Project

* App Router authentication patterns
* Why simpler schemas scale better
* TypeScript error‑driven design
* Real payment gateway integration
* When to **delete features instead of fixing them**
* How to turn a failed idea into a clean showcase repo

---

## 🧑‍💻 Who This Repo Is For

* Beginners learning **Next.js App Router**
* Developers learning **auth + payments**
* Anyone building a **clean SaaS foundation**

Feel free to fork, reuse, or simplify even more.

---

## 📄 License

MIT License – use it freely.

---

### ⭐ Final Note

> This project is intentionally **finished**.

