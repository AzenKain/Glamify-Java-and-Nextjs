package com.example.api_ecommerce.enums;

import java.util.Map;
import java.util.Set;

public class OrderStatusManager {
    private static final Map<OrderStatus, Set<OrderStatus>> VALID_TRANSITIONS = Map.of(
            OrderStatus.CREATED, Set.of(OrderStatus.PENDING, OrderStatus.CANCELLED),
            OrderStatus.PENDING, Set.of(OrderStatus.CONFIRMED, OrderStatus.CANCELLED),
            OrderStatus.CONFIRMED, Set.of(OrderStatus.DELIVERY, OrderStatus.CANCELLED),
            OrderStatus.DELIVERY, Set.of(OrderStatus.COMPLETED, OrderStatus.REFUNDED),
            OrderStatus.COMPLETED, Set.of(),
            OrderStatus.CANCELLED, Set.of(),
            OrderStatus.REFUNDED, Set.of()
    );

    public static boolean canTransition(OrderStatus current, OrderStatus next) {
        return VALID_TRANSITIONS.getOrDefault(current, Set.of()).contains(next);
    }
}
