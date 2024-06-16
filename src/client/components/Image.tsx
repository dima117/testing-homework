import React from 'react';
import { cn } from '@bem-react/classname';

export interface ImageProps {
    className?: string;
    src?: string;
}

const STUB = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkMAYAADkANVKH3ScAAAAASUVORK5CYII=';

const bem = cn('Image');

export const Image: React.FC<ImageProps> = ({ className, src = STUB }) => {
    return <img className={bem(null, [className])} src={src} />;
}
