import React, { useCallback } from "react";
import { SafeAreaView, View, StatusBar, Image, BackHandler } from "react-native";
import { Colors, Sizes } from "../constants/styles";
import { Bounce } from 'react-native-animated-spinkit';
import { useFocusEffect } from '@react-navigation/native';

const SplashScreen = ({ navigation }) => {

    const backAction = () => {
        BackHandler.exitApp();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    setTimeout(() => {
        navigation.push('Onboarding')
    }, 2000);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor, }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {appLogo()}
                <Bounce
                    size={48}
                    color={Colors.primaryColor}
                    style={{
                        marginTop: Sizes.fixPadding * 3.0,
                    }}
                />
            </View>
        </SafeAreaView>
    )

    function appLogo() {
        return (
            <Image
                source={require('../assets/images/logo/stylo_transparent.png')}
                style={{ width: 90.0, height: 90.0, }}
                resizeMode="contain"
            />
        )
    }
}

export default SplashScreen;