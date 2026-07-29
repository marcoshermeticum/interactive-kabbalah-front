/**
 * Notification entries for the unified notification system.
 * Each entry represents a site update or content notification.
 * Max 50 entries allowed.
 */

export interface NotificationEntry {
  id: string;                // identificador único
  publishedAt: string;       // ISO date
  titleKey: string;          // chave i18n para título
  descriptionKey: string;    // chave i18n para descrição
}

export const notifications: NotificationEntry[] = [
  {
    id: 'orientation-guide-v1',
    publishedAt: '2024-01-01T00:00:00Z',
    titleKey: 'notifications.guide.title',
    descriptionKey: 'notifications.guide.description',
  },
];
