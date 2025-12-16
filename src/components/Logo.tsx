export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Fish body outline */}
      <ellipse 
        cx="45" 
        cy="40" 
        rx="25" 
        ry="15" 
        stroke="white" 
        strokeWidth="2.5"
        fill="none"
      />
      
      {/* Fish tail outline */}
      <path
        d="M20 40 Q15 35, 10 30 Q15 40, 10 50 Q15 45, 20 40Z"
        stroke="white"
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
      />
      
      {/* Fish dorsal fin outline */}
      <path
        d="M45 25 Q42 18, 40 15 Q47 20, 50 25Z"
        stroke="white"
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
      />
      
      {/* Fish eye */}
      <circle cx="60" cy="37" r="3" fill="white" />
      
      {/* Water bubbles outline */}
      <circle cx="25" cy="20" r="3" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="35" cy="15" r="2" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="20" cy="60" r="2.5" stroke="white" strokeWidth="1.5" fill="none" />
    </svg>
  );
}