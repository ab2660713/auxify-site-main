import { ImageResponse } from 'next/og';

import Logo from '@/components/brand/logo';

const iconLabel = 'Auxify';
export const size = {
  width: 1024,
  height: 1024,
};
export const contentType = 'image/png';

const logoStyle = {
  display: 'block',
};

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: 'center',
        background: 'transparent',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Logo aria-label={iconLabel} inkColor="#000000" size="100%" style={logoStyle} />
    </div>,
    size,
  );
}
