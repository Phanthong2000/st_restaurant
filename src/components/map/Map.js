import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, CircleMarker, useMapEvents } from 'react-leaflet';
import { Box, Button, IconButton, styled, Tooltip, Typography } from '@mui/material';
import L from 'leaflet';
import './Map.css';
import { Icon } from '@iconify/react';

const RootStyle = styled('div')(({ theme }) => ({
  width: '100%',
  height: '600px',
  background: theme.palette.white,
  padding: theme.spacing(2, 10),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2, 0)
  }
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '20px',
  fontFamily: theme.typography.fontFamily.primary,
  width: '100%'
}));
const ButtonHome = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  background: theme.palette.white,
  zIndex: 998,
  top: 90,
  left: '15px',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  outline: `1px solid gray`,
  cursor: 'pointer',
  ':hover': {
    background: theme.palette.lightgrey
  },
  [theme.breakpoints.down('md')]: {
    left: '17px'
  }
}));
const ButtonUser = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  background: theme.palette.white,
  zIndex: 998,
  top: 150,
  left: '15px',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  outline: `1px solid gray`,
  cursor: 'pointer',
  ':hover': {
    background: theme.palette.lightgrey
  },
  [theme.breakpoints.down('md')]: {
    left: '17px'
  }
}));
// function Position() {
//   return (
//     <MapContainer center={[10.82484107266796, 106.70101104956196]} zoom={100}>
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={[10.82484107266796, 106.70101104956196]}>
//         <Popup>1/11/46 Đặng Thuỳ Trâm, phường 13, quận Bình Thạnh</Popup>
//       </Marker>
//       <CircleMarker
//         center={[10.82484107266796, 106.70101104956196]}
//         pathOptions={{ color: 'red' }}
//         radius={10}
//       />
//     </MapContainer>
//   );
// }
function LocationMarker({ setPositionUser, positionUser }) {
  const map = useMapEvents({
    click() {
      map.flyTo([10.82484107266796, 106.70101104956196], 18);
    },
    mousemove() {
      if (positionUser.lat === undefined) {
        map.locate();
      }
    },
    locationfound(e) {
      console.log(positionUser);
      setPositionUser(e.latlng);
    }
  });
  const markerCustom = L.divIcon({
    className: 'icon__img',
    html: `<img style={{ width: '50px', height: '50px' }} src="https://cdn.broadsheet.com.au/cache/ee/59/ee5913ff25171675a6e1dc213933c36a.jpg" />`,
    iconAnchor: [25, 25]
  });
  return (
    <>
      <Marker icon={markerCustom} position={[10.82484107266796, 106.70101104956196]}>
        <Popup>1/11/46 Đặng Thuỳ Trâm, phường 11, quận Bịnh Thạnh</Popup>
      </Marker>
      {positionUser.lat !== undefined && (
        <Marker position={[positionUser.lat, positionUser.lng]}>
          <Popup>Vị trí của bạn</Popup>
        </Marker>
      )}
    </>
  );
}

function EventsExample() {
  const [map, setMap] = useState();
  const [positionUser, setPositionUser] = useState({});
  return (
    <IconButton disableFocusRipple disableRipple disableTouchRipple sx={{ width: '100%' }}>
      <Tooltip title="Vị trí nhà hàng">
        <ButtonHome
          onClick={() => {
            map.flyTo([10.82484107266796, 106.70101104956196], 18);
          }}
        >
          <Icon icon="ion:storefront-sharp" />
        </ButtonHome>
      </Tooltip>
      <Tooltip title="Vị trí của bạn">
        <ButtonUser
          onClick={() => {
            map.flyTo([positionUser.lat, positionUser.lng], 18);
          }}
        >
          <Icon icon="ic:baseline-person-pin-circle" />
        </ButtonUser>
      </Tooltip>

      <MapContainer
        markerZoomAnimation
        scrollWheelZoom
        whenCreated={setMap}
        center={[10.82484107266796, 106.70101104956196]}
        zoom={18}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker positionUser={positionUser} setPositionUser={setPositionUser} />
        <CircleMarker
          center={[10.82484107266796, 106.70101104956196]}
          pathOptions={{ color: 'red' }}
          radius={40}
        />
      </MapContainer>
    </IconButton>
  );
}
function Map() {
  return (
    <RootStyle id="map">
      <Title>Địa điểm nhà hàng</Title>
      {/* <Position /> */}
      <EventsExample />
    </RootStyle>
  );
}

export default Map;
