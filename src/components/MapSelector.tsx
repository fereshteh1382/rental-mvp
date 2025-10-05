import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Modal, Sheet, Button } from "@mui/joy";

type MapSelectorProps = {
  open: boolean;
  onClose: () => void;
  onSelectCity: (city: string, lat: number, lng: number) => void;
};

export function MapSelector({ open, onClose, onSelectCity }: MapSelectorProps) {
  const [position, setPosition] = useState<[number, number]>([35.6892, 51.3890]); // Tehran پیش فرض

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
    // می‌توان نام شهر را با API یا دیتا دستی گرفت
    onSelectCity("تهران", lat, lng);
  };

  return (
    <Modal open={open} onClose={onClose} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Sheet variant="outlined" sx={{ width: "90%", maxWidth: 600, height: 500, p: 2, borderRadius: "md" }}>
        <MapContainer
          center={position}
          zoom={6}
          style={{ height: "100%", width: "100%" }}
          onClick={handleMapClick}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position}>
            <Popup>شهر انتخاب شده</Popup>
          </Marker>
        </MapContainer>
        <Button sx={{ mt: 1 }} onClick={onClose}>تایید</Button>
      </Sheet>
    </Modal>
  );
}
