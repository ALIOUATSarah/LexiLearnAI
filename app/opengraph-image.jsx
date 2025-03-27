import { ImageResponse } from "next/og";

export const alt = "LexiLearn AI";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom right, #6366F1, #A78BFA)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            color: "white",
            marginTop: 30,
            padding: "0 120px",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
            textAlign: "center",
          }}
        >
          LexiLearn AI
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 300,
            height: 300,
            border: "15px solid white",
            borderRadius: 150,
            backgroundColor: "white",
            marginTop: 30,
          }}
        >
          <svg width="270" height="270" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient
                id="logoGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>
            </defs>

            <rect
              x="0"
              y="0"
              width="24"
              height="24"
              rx="4"
              fill="url(#logoGradient)"
            />

            <path
              d="M2 6C2 4.89543 2.89543 4 4 4H8C9.10457 4 10 4.89543 10 6V18C10 19.1046 9.10457 20 8 20H4C2.89543 20 2 19.1046 2 18V6Z"
              fill="white"
              fillOpacity="0.9"
            />
            <path
              d="M14 6C14 4.89543 14.8954 4 16 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H16C14.8954 20 14 19.1046 14 18V6Z"
              fill="white"
              fillOpacity="0.9"
            />

            <path
              d="M11 4.5C11 4.5 11.5 6 11.8 8.5C12 10 12 12 12 12"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M13 4.5C13 4.5 12.5 6 12.2 8.5C12 10 12 12 12 12"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <path
              d="M12 12C12 12 11.7 15 11.8 17.5C11.9 19 12 20 12 20"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="M8.5 5.5C8.5 5.5 10 4.5 12 4.5C14 4.5 15.5 5.5 15.5 5.5C15.5 5.5 16 6 16 7.5C16 9 15 10 15 10"
              stroke="white"
              strokeWidth="0.75"
              strokeLinecap="round"
            />
            <path
              d="M15.5 5.5C15.5 5.5 16 6 16 7.5C16 9 15 10 15 10"
              stroke="white"
              strokeWidth="0.75"
              strokeLinecap="round"
            />
            <path
              d="M8.5 5.5C8.5 5.5 8 6 8 7.5C8 9 9 10 9 10"
              stroke="white"
              strokeWidth="0.75"
              strokeLinecap="round"
            />

            <path
              d="M5 8V14H7"
              stroke="#A78BFA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M16 8C16.5 8.5 18 10 18 12C18 14 16.5 15.5 16 16"
              stroke="#A78BFA"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <path
              d="M16 8C16 8 17 7.5 17.5 8.5"
              stroke="#A78BFA"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M16 16C16 16 17 16.5 17.5 15.5"
              stroke="#A78BFA"
              strokeWidth="1"
              strokeLinecap="round"
            />

            <path
              d="M17 10C17.5 10.5 18 11 18.2 11.5"
              stroke="#A78BFA"
              strokeWidth="0.75"
              strokeLinecap="round"
            />
            <path
              d="M17 14C17.5 13.5 18 13 18.2 12.5"
              stroke="#A78BFA"
              strokeWidth="0.75"
              strokeLinecap="round"
            />

            <circle cx="18" cy="8" r="1.2" fill="#A78BFA" />
            <circle cx="18" cy="16" r="1.2" fill="#A78BFA" />
            <circle cx="18.5" cy="11.5" r="0.7" fill="#A78BFA" />
            <circle cx="18.5" cy="12.5" r="0.7" fill="#A78BFA" />
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontStyle: "normal",
            color: "white",
            marginTop: 20,
            padding: "0 120px",
            textAlign: "center",
          }}
        >
          An intelligent learning platform designed for every student
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
