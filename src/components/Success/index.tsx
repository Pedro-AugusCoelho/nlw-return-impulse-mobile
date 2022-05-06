import React from 'react';
import { View , Text , TouchableOpacity , Image } from 'react-native';
import successImg from '../../assets/success.png';
import { Copyright } from '../copyright';

import { styles } from './styles';

interface Props {
  onSendAnotherFeedback:() => void;
}

export function Success({onSendAnotherFeedback}:Props) {
  return (
    <View style={styles.container}>
        <Image style={styles.image} source={successImg} />
        <Text style={styles.title}>Agradecemos o feedback</Text>
        
        <TouchableOpacity style={styles.button} onPress={onSendAnotherFeedback}>
            <Text style={styles.buttontitle}>
                Quero enviar outro feedback
            </Text>
        </TouchableOpacity>

        <Copyright />
    </View>
  );
}