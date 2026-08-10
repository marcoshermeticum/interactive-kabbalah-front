interface UmamiTracker {
  track(event: string, data?: Record<string, string>): void;
}

interface Window {
  umami?: UmamiTracker;
}
