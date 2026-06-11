import type { OrderStatus, PaymentStatus } from "./types";

export type PlatformEvent =
  | {
      type: "order.created";
      orderId: string;
      branchId: string;
      occurredAt: string;
    }
  | {
      type: "payment.updated";
      orderId: string;
      branchId: string;
      provider: string;
      status: PaymentStatus;
      occurredAt: string;
    }
  | {
      type: "inventory.reserved";
      orderId: string;
      branchId: string;
      occurredAt: string;
    }
  | {
      type: "order.status_changed";
      orderId: string;
      branchId: string;
      status: OrderStatus;
      occurredAt: string;
    }
  | {
      type: "loyalty.points_awarded";
      customerId: string;
      branchId: string;
      points: number;
      occurredAt: string;
    }
  | {
      type: "catering.request_submitted";
      requestId: string;
      branchId: string;
      occurredAt: string;
    };

export function createEvent<T extends PlatformEvent>(event: Omit<T, "occurredAt">): T {
  return {
    ...event,
    occurredAt: new Date().toISOString()
  } as T;
}
