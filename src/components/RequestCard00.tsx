// src/components/RequestCard.tsx
import React from "react";
import type { Request } from "../types";

interface Props {
  request: Request;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

const RequestCard: React.FC<Props> = ({ request, onApprove, onReject }) => {
  return (
    <div className="border rounded p-4 shadow text-right mb-2" dir="rtl">
      <p className="font-bold">{request.itemTitle}</p>
      <p>تاریخ: {request.startDate} تا {request.endDate}</p>
      <p>وضعیت: {request.status}</p>
      <div className="mt-2 flex gap-2">
        {onApprove && request.status === "pending" && (
          <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={() => onApprove(request.id)}>تایید</button>
        )}
        {onReject && request.status === "pending" && (
          <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => onReject(request.id)}>رد</button>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
