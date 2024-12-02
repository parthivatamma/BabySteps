'use client';
import Image from "next/image";

import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function Home() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h1 style={{ color: "#87CEFA", fontSize: "2.5rem" }}>Baby Steps</h1>

      <div style={{ margin: "20px 0" }}>
        <Link href="/remember">
          <button
            style={{
              display: "block",
              margin: "10px auto",
              padding: "15px 30px",
              backgroundColor: "#90EE90",
              border: "none",
              borderRadius: "5px",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          >
            Memory Games
          </button>
        </Link>

        <Link href="/math-game">
          <button
            style={{
              display: "block",
              margin: "10px auto",
              padding: "15px 30px",
              backgroundColor: "#87CEFA",
              border: "none",
              borderRadius: "5px",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          >
            Math Games
          </button>
        </Link>

        <Link href="/tracing-game">
          <button
            style={{
              display: "block",
              margin: "10px auto",
              padding: "15px 30px",
              backgroundColor: "#FFFF99",
              border: "none",
              borderRadius: "5px",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          >
            Tracing Games
          </button>
        </Link>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Image
          src="/IMG_3358.PNG" // Replace with an actual stock photo URL or local image
          alt="Encouragement"
          width={100}
          height={100}
          style={{ borderRadius: "50%", marginRight: "15px" }}
        />
        <p style={{ fontSize: "1.2rem", margin: 0 }}>You can do it!</p>
      </div>
    </div>
  );
}