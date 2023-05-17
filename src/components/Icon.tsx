import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  size?: number;
  color: string;
  name: string;
};

const Icon = ({ size = 24, name, color }: Props) => <MaterialCommunityIcons name={name} size={size} color={color} />;

export default Icon;
