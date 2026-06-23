import Logo from './logo';
import Wordmark from './wordmark';

const brandBlue = '#014BAA';
const brandInk = '#020617';
const pageBackground = '#f8fafc';

export const socialShareImageAlt = 'Auxify';

export const socialShareImageSize = {
  width: 1200,
  height: 630,
};

const logoSize = 232;
const wordmarkHeight = logoSize * 0.7;
const wordmarkWidth = wordmarkHeight * (818 / 344);

export function SocialShareImage() {
  return (
    <div
      style={{
        alignItems: 'center',
        background: pageBackground,
        color: brandInk,
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          background: brandBlue,
          borderRadius: 999,
          display: 'flex',
          height: 520,
          opacity: 0.08,
          position: 'absolute',
          width: 520,
        }}
      />
      <div
        style={{
          background: '#ffffff',
          borderRadius: 999,
          display: 'flex',
          height: 430,
          opacity: 0.86,
          position: 'absolute',
          width: 430,
        }}
      />
      <div
        style={{
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.92)',
          border: '1px solid rgba(1, 75, 170, 0.11)',
          borderRadius: 42,
          boxShadow: '0 34px 84px rgba(15, 23, 42, 0.12), 0 1px 0 rgba(255, 255, 255, 0.95)',
          display: 'flex',
          justifyContent: 'center',
          padding: '52px 78px',
          position: 'relative',
        }}
      >
        <Logo aria-hidden="true" inkColor={brandInk} size={logoSize} style={{ display: 'block' }} />
        <Wordmark
          aria-hidden="true"
          height={wordmarkHeight}
          inkColor={brandInk}
          style={{ display: 'block' }}
          width={wordmarkWidth}
        />
      </div>
    </div>
  );
}
