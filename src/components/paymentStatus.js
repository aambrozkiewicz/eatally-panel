import React from "react";
import { Badge } from "react-bootstrap";

function PaymentStatus({ type, payments }) {
  if (type === "cash") {
    return "Gotówka";
  } else if (type === "wire_transfer") {
    const lastPayment = payments[payments.length - 1];
    const status = lastPayment.status;
    const statuses = {
      new: "Rozpoczęta",
      error: "Błędna",
      finished: "Zakończona",
    };

    return (
      <span>
        Przelew{" "}
        <Badge variant={status === "finished" ? "success" : "secondary"}>
          {statuses[status]}
        </Badge>
      </span>
    );
  } else if (type === "card_on_site") {
    return "Karta";
  }
}

export default PaymentStatus;
