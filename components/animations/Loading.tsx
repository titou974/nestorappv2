export default function Loading() {
  return (
    <div className="mt-6 flex w-full flex-col items-center justify-center gap-4">
      <div className="flex h-16 w-16 animate-spin items-center justify-center rounded-full border-8 border-gray-300 border-t-accent text-4xl text-accent">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="currentColor"
          className="animate-ping"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.92857 0H1.07143C0.479911 0 0 0.479911 0 1.07143V8.92857C0 9.52009 0.479911 10 1.07143 10H8.92857C9.52009 10 10 9.52009 10 8.92857V1.07143C10 0.479911 9.52009 0 8.92857 0ZM5.35714 6.42857H4.28571V7.5C4.28571 7.69643 4.125 7.85714 3.92857 7.85714H3.21429C3.01786 7.85714 2.85714 7.69643 2.85714 7.5V2.5C2.85714 2.30357 3.01786 2.14286 3.21429 2.14286H5.35714C6.53795 2.14286 7.5 3.10491 7.5 4.28571C7.5 5.46652 6.53795 6.42857 5.35714 6.42857ZM5.35714 3.57143H4.28571V5H5.35714C5.75 5 6.07143 4.67857 6.07143 4.28571C6.07143 3.89286 5.75 3.57143 5.35714 3.57143Z"
            fill="accent"
          />
        </svg>
      </div>
    </div>
  );
}
