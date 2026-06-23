import { ImageResponse } from 'next/og';

import { SocialShareImage, socialShareImageAlt, socialShareImageSize } from '@/components/brand/social-share-image';

export const alt = socialShareImageAlt;
export const size = socialShareImageSize;
export const contentType = 'image/png';

export default async function TwitterImage() {
  return new ImageResponse(<SocialShareImage />, size);
}
