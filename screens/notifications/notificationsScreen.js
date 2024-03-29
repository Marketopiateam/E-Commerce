import React, { useState, useRef } from 'react';
import { Fonts, Colors, Sizes, } from "../../constants/styles";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';

const { width } = Dimensions.get('window');

const notificationsList = [
    {
        key: '1',
        title: 'Biggest Offers on Men\'s Fashion!',
        description: 'Bestselling Men\'s Fashion Product at Lowest Prices. Avail 10% Instant Discount* on HDFC Cards. Only till June 5th!',
    },
    {
        key: '2',
        title: 'Biggest Sale Of The Year!',
        description: 'Biggest Sale of the year started now only on Stylo. Browse product and start shopping now. Hurry!',
    },
];

const rowTranslateAnimatedValues = {};

const NotificationScreen = ({ navigation }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [snackBarMsg, setSnackBarMsg] = useState('');

    const [listData, setListData] = useState(notificationsList);

    Array(listData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);

    const onSwipeValueChange = swipeData => {

        const { key, value } = swipeData;

        if ((value < -width || value > width) && !animationIsRunning.current) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = listData.find(item => item.key === key);

                setSnackBarMsg(`${removedItem.title} dismissed`);

                setListData(newData);

                setShowSnackBar(true);

                animationIsRunning.current = false;
            });
        }
    };

    const renderItem = data => (
        <Animated.View
            style={[
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 120],
                    }),
                },
            ]}
        >
            <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
                <View style={styles.notificationWrapStyle}>
                    <View style={styles.notificationIconWrapStyle}>
                        <MaterialIcons name="notifications-none" color={Colors.whiteColor} size={40} />
                    </View>
                    <View style={styles.notificationDescriptionStyle}>
                        <Text
                            numberOfLines={1}
                            style={{ ...Fonts.blackColor15SemiBold }}
                        >
                            {data.item.title}
                        </Text>
                        <Text numberOfLines={3}
                            style={{
                                ...Fonts.lightGrayColor12Medium,
                                marginTop: Sizes.fixPadding - 5.0
                            }}>
                            {data.item.description}
                        </Text>
                    </View>
                </View>
            </View>
        </Animated.View>
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack} />
    );

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <MaterialIcons
                        name="arrow-back"
                        size={24} color="black"
                        onPress={() => navigation.pop()}
                    />
                    <Text style={{
                        ...Fonts.blackColor18Bold,
                        marginLeft: Sizes.fixPadding + 5.0
                    }}>
                        MY NOTIFICATIONS
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('Bag')}
                >
                    <FontAwesome5
                        name="shopping-bag"
                        size={24}
                        color={Colors.blackColor}
                    />
                    <View style={styles.shoppingsCountStyle}>
                        <Text style={{ ...Fonts.whiteColor12Medium }}>
                            3
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={styles.container}>
                {header()}
                {listData.length == 0 ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.backColor }}>
                        <Ionicons name="ios-notifications-off-outline" size={70} color={Colors.lightGrayColor} />
                        <Text style={{ ...Fonts.lightGrayColor14SemiBold, marginTop: Sizes.fixPadding }}>
                            No Notifications
                        </Text>
                    </View>
                    :
                    <SwipeListView
                        data={listData}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        rightOpenValue={-width}
                        leftOpenValue={width}
                        onSwipeValueChange={onSwipeValueChange}
                        useNativeDriver={false}
                    />
                }
                <Snackbar
                    style={styles.snackBarStyle}
                    visible={showSnackBar}
                    onDismiss={() => setShowSnackBar(false)}
                >
                    <Text style={{ ...Fonts.whiteColor12Medium }}>
                        {snackBarMsg}
                    </Text>
                </Snackbar>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.whiteColor,
        paddingLeft: Sizes.fixPadding + 5.0,
        paddingRight: Sizes.fixPadding + 1.0,
        elevation: 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    notificationWrapStyle: {
        height: 110.0,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginHorizontal: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding - 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: Sizes.fixPadding,
        elevation: 2.0,
        paddingLeft: Sizes.fixPadding,
    },
    notificationIconWrapStyle: {
        height: 85.0,
        width: 85.0,
        backgroundColor: '#C2185B',
        borderRadius: 42.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: Colors.backColor,
        flex: 1,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        flex: 1,
    },
    notificationDescriptionStyle: {
        marginLeft: Sizes.fixPadding * 2.0,
        width: width - 140,
        justifyContent: 'center',
        height: 120.0,
        paddingVertical: Sizes.fixPadding + 3.0
    },
    shoppingsCountStyle: {
        position: 'absolute',
        right: -10.0,
        top: -5.0,
        width: 18.0, height: 18.0,
        borderRadius: 9.0,
        backgroundColor: Colors.redColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333'
    }
});

export default NotificationScreen;