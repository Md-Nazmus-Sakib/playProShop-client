import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import redMarkerIcon from "@/assets/images/locationIcon.png"; // Adjust the path as needed

// Define a custom type for the user's location
interface Location {
  lat: number;
  lng: number;
}

const MyLocation: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        // Fallback location if user denies location access
        setLocation({
          lat: 25.391413,
          lng: 88.993884,
        });
      }
    );
  }, []);

  const myIcon = L.icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const redIcon = L.icon({
    iconUrl: redMarkerIcon, // Use the local icon
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const defaultPosition: Location = { lat: 51.505, lng: -0.09 }; // Default to London if location isn't available

  const SetViewOnClick = ({ location }: { location: Location }) => {
    const map = useMap();
    map.setView([location.lat, location.lng], 13);
    return null;
  };

  // Store location (you can customize this as needed)
  const storeLocation: Location = { lat: 25.391413, lng: 88.993884 };

  return (
    <div className="my-12">
      <div className="flex justify-center">
        <h1 className="text-5xl border-b-2 border-[#F14902] inline text-center">
          <span className="text-[#F14902]">L</span>ocation
        </h1>
      </div>
      <div className="my-12 rounded-lg  overflow-hidden">
        <MapContainer
          center={location || defaultPosition}
          zoom={50}
          style={{ height: "400px", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {location && (
            <>
              <Marker position={location} icon={myIcon}>
                <Popup>You are here!</Popup>
              </Marker>
              <SetViewOnClick location={location} />
            </>
          )}
          <Marker position={storeLocation} icon={redIcon}>
            <Popup>PlayProShop</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default MyLocation;
