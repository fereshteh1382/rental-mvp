// src/pages/MyRequests.tsx
import React, { useState } from "react";
import { Sheet, Typography, Button, Stack, Box } from "@mui/joy";
import { mockRequests } from "../mockData";
import type { Request } from "../types";

const MyRequests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>(mockRequests);

  const handleApprove = (id: string) => {
    setRequests(requests.map(r => r.id === id ? {...r, status: "approved"} : r));
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(r => r.id === id ? {...r, status: "rejected"} : r));
  };

  return (
    <Box dir="rtl">
      <Typography level="h5" sx={{ mb: 2 }}>
        درخواست‌های من
      </Typography>

      <Stack spacing={2}>
        {requests.map(r => (
          <Sheet key={r.id} variant="outlined" sx={{ p: 2, gap: 1 }}>
            <Typography fontWeight="lg">{r.itemTitle}</Typography>
            <Typography>تاریخ: {r.startDate} تا {r.endDate}</Typography>
            <Typography>وضعیت: {r.status}</Typography>

            {r.status === "pending" && (
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Button color="success" variant="solid" onClick={() => handleApprove(r.id)}>
                  تایید
                </Button>
                <Button color="danger" variant="solid" onClick={() => handleReject(r.id)}>
                  رد
                </Button>
              </Box>
            )}
          </Sheet>
        ))}
      </Stack>
    </Box>
  );
};

export default MyRequests;
