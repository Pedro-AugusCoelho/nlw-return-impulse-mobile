import React , { useState } from 'react';
import { ArrowLeft } from 'phosphor-react-native';
import { View , Image , Text , TouchableOpacity , TextInput } from 'react-native';
import { theme } from '../../theme';
import { styles } from './styles';
import { FeedbackType } from '../Widget';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';
import { captureScreen } from 'react-native-view-shot';
import { api } from '../../libs/api';
import * as FileSystem from 'expo-file-system';


interface Props {
    feedbackType: FeedbackType;
    onFeedbackCanceled:() => void;
    onFeedbackSent: ()=> void;
}

export function Form({ feedbackType , onFeedbackCanceled , onFeedbackSent }:Props) {
  
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    const [ screenshot , setScreenshot ] = useState<string|null>(null);
    const [ isSentFeedback , setIsSentFeedback ] = useState(false);
    const [comment , setComment ] = useState('');

    const handleScreenshot = () => {
        captureScreen({
            format:'png',
            quality:0.8,

        })
        .then(uri => setScreenshot(uri))
        .catch(error => console.log(error))
    };

    const handleScreenshotRemove = () => {
            setScreenshot(null);
    };

    const handleSendFeedback = async () => {
        if(isSentFeedback){
            return;
        }
        setIsSentFeedback(true);
        const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot , {encoding: 'base64'});
        
        try {
            await api.post('/feedbacks', {
                type:feedbackType,
                screenshot:`data:image/png;base64, ${screenshotBase64}`,
                comment
            });
            onFeedbackSent();
        } catch (error) {
            console.log(error);
            setIsSentFeedback(false);
        }

    
    }
  
    return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={onFeedbackCanceled}>
                <ArrowLeft size={24} weight={'bold'} color={theme.colors.text_secondary} />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <Image source={feedbackTypeInfo.image} style={styles.image} />
                <Text style={styles.titleText}>
                    {feedbackTypeInfo.title}
                </Text>
            </View>
        
        </View>

        <TextInput 
            multiline
            style={styles.input}
            placeholder='Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo...'
            placeholderTextColor={theme.colors.text_secondary}
            autoCorrect={false}
            onChangeText={setComment}

        />

        <View style={styles.footer}>
            <ScreenshotButton
                onRemoveShot={handleScreenshotRemove}
                onTakeShot={handleScreenshot}
                screenshot={screenshot}
            />
            <Button
                onPress={handleSendFeedback}
                isLoading={isSentFeedback}
            />
        </View>
    </View>
  );
}