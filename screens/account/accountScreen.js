import React, { useState } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity, ImageBackground, Dimensions, Image, StyleSheet, View, Text, ScrollView } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, FontAwesome, } from '@expo/vector-icons';
import { Dialog } from "@rneui/themed";

const { width } = Dimensions.get('window');

const AccountScreen = ({ navigation }) => {

    const [logoutDialog, setLogoutDialog] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {profilePic()}
                    {accountOptions()}
                </ScrollView>
            </View>
            {logoutInfo()}
        </SafeAreaView>
    )

    function logoutInfo() {
        return (
            <Dialog
                visible={logoutDialog}
                onRequestClose={() => { setLogoutDialog(false) }}
                overlayStyle={styles.dialogWrapStyle}
            >
                <View style={{ backgroundColor: Colors.whiteColor, }}>
                    <Text style={{ ...Fonts.blackColor18Bold }}>
                        Confirm
                    </Text>
                    <Text style={{ ...Fonts.blackColor15Medium, marginVertical: Sizes.fixPadding * 2.0, }}>
                        Are you Sure want to Logout?
                    </Text>
                    <View style={styles.closeAndLogoutTextWrapStyle}>
                        <Text
                            onPress={() => setLogoutDialog(false)}
                            style={{ ...Fonts.primaryColor13SemiBold }}
                        >
                            Close
                        </Text>
                        <Text
                            onPress={() => {
                                setLogoutDialog(false)
                                navigation.push('Login')
                            }}
                            style={{ marginLeft: Sizes.fixPadding * 2.0, ...Fonts.primaryColor13SemiBold }}
                        >
                            Logout
                        </Text>
                    </View>
                </View>
            </Dialog>
        )
    }

    function accountOptions() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 13.0, }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('Notifications')}
                >
                    {optionsShort({
                        icon: <MaterialIcons
                            name="notifications-none"
                            color={Colors.primaryColor}
                            size={35}
                        />,
                        title: 'Notifications'
                    })}
                </TouchableOpacity>
                {divider()}
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('Orders')}
                >
                    {optionsShort({
                        icon: <MaterialIcons
                            name="local-shipping"
                            color={Colors.primaryColor}
                            size={35}
                        />,
                        title: 'My Orders'
                    })}
                </TouchableOpacity>
                {divider()}
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('AccountSetting')}
                >
                    {optionsShort({
                        icon: <MaterialIcons
                            name="settings"
                            color={Colors.primaryColor}
                            size={35}
                        />,
                        title: 'Account Settings'
                    })}
                </TouchableOpacity>
                {divider()}
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('Faq')}
                >
                    {optionsShort({
                        icon: <FontAwesome
                            name="question-circle-o"
                            color={Colors.primaryColor}
                            size={35}
                        />,
                        title: 'FAQ'
                    })}
                </TouchableOpacity>
                {divider()}
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('AboutApp')}
                >
                    {optionsShort({
                        icon: <FontAwesome
                            name="info"
                            color={Colors.primaryColor}
                            size={35}
                        />,
                        title: 'About App'
                    })}
                </TouchableOpacity>
                {divider()}
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { setLogoutDialog(true) }}
                >
                    {optionsShort({
                        icon: <FontAwesome
                            name="sign-out"
                            color={Colors.primaryColor}
                            size={35}
                        />,
                        title: 'Logout'
                    })}
                </TouchableOpacity>
                {divider()}
            </View>
        )
    }

    function optionsShort({ icon, title }) {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: Sizes.fixPadding,
            }}>
                <View style={{ width: 35.0, alignItems: 'center' }}>
                    {icon}
                </View>
                <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.blackColor17Medium }}>
                    {title}
                </Text>
            </View>
        )
    }

    function divider() {
        return (
            <View
                style={{
                    marginLeft: Sizes.fixPadding * 6.0,
                    marginRight: Sizes.fixPadding * 3.0,
                    backgroundColor: '#e0e0e0',
                    height: 1.0,
                    marginVertical: Sizes.fixPadding + 5.0,
                }}
            />
        )
    }

    function profilePic() {
        return (
            <ImageBackground
                source={require('../../assets/images/user_profile/background.jpg')}
                style={{
                    height: 220.0,
                    alignItems: 'center'
                }}
            >
                <View style={{
                    position: 'absolute',
                    bottom: -100.0,
                    alignItems: 'center'
                }}>
                    <Image
                        source={require('../../assets/images/user_profile/user_3.jpg')}
                        style={{
                            width: 110.0,
                            height: 110.0,
                            borderRadius: 65.5,
                            borderWidth: 5.0,
                            borderColor: Colors.backColor,
                        }}
                    />
                    <Text style={{ marginVertical: Sizes.fixPadding - 5.0, ...Fonts.blackColor17SemiBold }}>
                        Allison Perry
                    </Text>
                    <Text style={{ ...Fonts.lightGrayColor14Medium }}>
                        Edit Profile
                    </Text>
                </View>
            </ImageBackground>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    color={Colors.blackColor}
                    size={25}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.blackColor18Bold }}>
                    MY ACCOUNT
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        elevation: 2.0,
    },
    dialogWrapStyle: {
        width: width - 50,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding * 4.0,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    closeAndLogoutTextWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: Sizes.fixPadding * 3.0
    },
})

export default AccountScreen;