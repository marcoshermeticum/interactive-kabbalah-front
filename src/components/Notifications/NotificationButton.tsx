'use client';

interface NotificationButtonProps {
  unreadCount: number;
  onClick: () => void;
}

export default function NotificationButton({ unreadCount, onClick }: NotificationButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-200 text-white/40 hover:text-amber-300"
      aria-label={`Notificações${unreadCount > 0 ? ` (${unreadCount} não lidas)` : ''}`}
    >
      {/* Bell icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>

      {/* Badge */}
      {unreadCount > 0 && (
        <span
          className="absolute top-0.5 right-0.5 sm:top-0 sm:right-0 w-2.5 h-2.5 rounded-full bg-amber-500 border border-gray-900"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
