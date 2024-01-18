/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type { PropsWithChildren } from 'react';
import React, { useState } from 'react';
import {
  Image,
  NativeModules,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
const {PythonModule} = NativeModules;

import { launchImageLibrary } from 'react-native-image-picker';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const x = [80, 70, 40, 10];
const y = [12, 14, 18, 18];
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [url, setUri] = useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const shareImage = async (path: String) => {
    try {
      console.log(url);
      await Share.share({
        message: 'Confira meu meme',
        url: path,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const generateMeme2 = async (path: String) => {
        try {
      const data = await PythonModule.processMeme(
        path
      );
      setUri(data);
    } catch (error) {
      return;
    // }
  }
}

  const generateMeme = async () => {
    setUri('');
    let path = '';

    const result = await launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        if (response.didCancel) {
          return;
        }
        if (response.errorMessage) {
          return;
        }
        if (response.assets) {
          const {originalPath} = response.assets[0];
          let path = originalPath;
          console.log(response.assets[0]);
          
          // generateMeme2(path);
          shareImage(response.assets[0].uri);
        }
      },
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.sectionContainer}>
            <Image source={{
          uri: 'file:////' + url,
        }}
        style={{
          width: 300, 
          height: 400,
          resizeMode: 'contain',
        }} 
        />
         <TouchableOpacity style={styles.generateButton} onPress={generateMeme}>
          <Text style={styles.generateButtonText}>MEME</Text>
        </TouchableOpacity>
         {
          url && (
            <TouchableOpacity style={styles.generateButton} onPress={shareImage}>
          <Text style={styles.generateButtonText}>MANDAR NO ZAPZAP</Text>
        </TouchableOpacity>
          )
         }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  generateButton: {
    height: 50,
    width: '70%',
    backgroundColor: 'green',
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  generateButtonText: {
    color: 'white',
  },
});

export default App;
