import React from 'react';


import { Container } from './styles';
interface BulletProps {
  active?: boolean;
}
export const Bullet: React.FC<BulletProps> = ({active= false}) => {
  return <Container active={active} />;
}
