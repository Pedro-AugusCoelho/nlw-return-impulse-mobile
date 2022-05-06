
import React from 'react';
import { View , Text } from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

export function Copyright() {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Feito com s2 pela rocketseat</Text>
    </View>
  );
}
