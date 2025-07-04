# Titanic Interactive Dashboard

แดชบอร์ดแบบโต้ตอบสำหรับวิเคราะห์ข้อมูลผู้รอดชีวิตจากเหตุการณ์เรือไททานิคล่ม โปรเจกต์นี้สร้างขึ้นเพื่อสาธิตการใช้งาน React, TypeScript, และการแสดงผลข้อมูลด้วยกราฟที่สวยงามและเข้าใจง่าย

## ✨ เทคโนโลยีที่ใช้ (Tech Stack)

- **Framework**: [React](https://react.dev/) (ผ่าน [Vite](https://vitejs.dev/))
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **CSV Parsing**: [Papa Parse](https://www.papaparse.com/)
- **Linting**: [ESLint](https://eslint.org/)
- **Formatting**: [Prettier](https://prettier.io/)

## 🚀 การติดตั้งและเริ่มใช้งาน (Setup Instructions)

ทำตามขั้นตอนต่อไปนี้เพื่อรันโปรเจกต์บนเครื่องของคุณ

1.  **Clone a repository:**

    ```bash
    git clone https://github.com/NNICEEt/titanic-interactive-dashboard.git
    ```

2.  **ติดตั้ง Dependencies:**
    ใช้ `npm` หรือ package manager อื่นๆ ที่คุณถนัด

    ```bash
    npm install
    ```

3.  **รัน Development Server:**
    ```bash
    npm run dev
    ```
    หลังจากรันคำสั่งนี้ โปรเจกต์จะเปิดขึ้นที่ `http://localhost:5173` (หรือ port อื่นที่แสดงใน terminal)

## 📂 โครงสร้างโปรเจกต์ (Project Structure)

```
.
├── public/
│   └── titanic.csv       # ไฟล์ข้อมูลดิบที่ใช้ในโปรเจกต์
├── src/
│   ├── components/
│   │   ├── charts/       # คอมโพเนนต์สำหรับแสดงผลกราฟต่างๆ
│   │   ├── comments/     # คอมโพเนนต์สำหรับส่วนแสดงความคิดเห็น
│   │   └── ui/           # คอมโพเนนต์ UI ที่ใช้ซ้ำๆ (เช่น Card, Button)
│   ├── lib/
│   │   └── utils.ts      # ฟังก์ชันเสริมจาก shadcn/ui
│   ├── utils/
│   │   ├── csv.ts        # ฟังก์ชันสำหรับ Parse ไฟล์ CSV
│   │   └── data-transform.ts # ฟังก์ชันสำหรับแปลงข้อมูลเพื่อใช้ในกราฟ
│   ├── App.tsx             # คอมโพเนนต์หลักของแอปพลิเคชัน
│   ├── main.tsx            # จุดเริ่มต้นของ React App
│   └── index.css           # ไฟล์ CSS หลัก
├── README.md               # ไฟล์ที่คุณกำลังอ่านอยู่
├── package.json
└── tsconfig.json
```

### รายละเอียดที่สำคัญ

- **การจัดการข้อมูล**: ข้อมูลทั้งหมดถูกดึงมาจากไฟล์ `public/titanic.csv` และถูกแปลง (transform) ใน `src/utils/data-transform.ts` ก่อนจะถูกส่งไปแสดงผลในคอมโพเนนต์กราฟต่างๆ
- **คอมโพเนนต์**: โปรเจกต์ถูกแบ่งออกเป็นคอมโพเนนต์ย่อยๆ ที่จัดการหน้าที่ของตัวเองอย่างชัดเจน เพื่อให้ง่ายต่อการบำรุงรักษาและนำกลับมาใช้ใหม่
- **Styling**: เราใช้ Tailwind CSS เป็นหลักร่วมกับคอมโพเนนต์จาก `shadcn/ui` เพื่อความรวดเร็วในการพัฒนาและได้ UI ที่สวยงามสม่ำเสมอ

## 📜 คำสั่งที่ใช้งานได้ (Available Scripts)

- `npm run dev`: รันแอปพลิเคชันใน development mode
- `npm run build`: สร้าง production build ของแอปพลิเคชัน
- `npm run lint`: ตรวจสอบความถูกต้องของโค้ดด้วย ESLint
- `npm run preview`: รัน production build ที่สร้างขึ้นมาเพื่อทดสอบ
