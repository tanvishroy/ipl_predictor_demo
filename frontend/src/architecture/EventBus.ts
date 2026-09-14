import { EventType, AppEventPayload } from '../types';

type EventCallback = (payload: AppEventPayload) => void;

class EventBusService {
  private listeners: Map<EventType, Set<EventCallback>> = new Map();

  /**
   * Subscribe to a specific application event.
   * Returns an unsubscribe function.
   */
  public subscribe(eventType: EventType, callback: EventCallback): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }

    this.listeners.get(eventType)!.add(callback);

    return () => {
      const callbacks = this.listeners.get(eventType);
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) {
          this.listeners.delete(eventType);
        }
      }
    };
  }

  /**
   * Publish an event to all subscribers.
   */
  public publish(eventType: EventType, data?: any): void {
    const payload: AppEventPayload = {
      type: eventType,
      data,
      timestamp: Date.now(),
    };

    const callbacks = this.listeners.get(eventType);
    if (callbacks) {
      callbacks.forEach(cb => {
        try {
          cb(payload);
        } catch (err) {
          console.error(`Error executing listener for ${eventType}:`, err);
        }
      });
    }
  }
}

export const EventBus = new EventBusService();
