import React, { useState, useRef } from "react";
import { SafeAreaView, View, Animated, TouchableOpacity, Dimensions, Image, StatusBar, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';

const { width } = Dimensions.get('window');

const wishlistsData = [
    {
        key: '1',
        productImage: require('../../assets/images/products/product_21.jpg'),
        productTitle: 'Solid Round Neck T-shirt',
        productPrice: 49,
        productSize: 'L',
    },
    {
        key: '2',
        productImage: require('../../assets/images/products/product_11.jpg'),
        productTitle: 'Men Slim Fit Casual Shirt',
        productPrice: 39,
        productSize: 'M',
    },
];

const rowTranslateAnimatedValues = {};

const WishlistScreen = ({ navigation }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [listData, setListData] = useState(wishlistsData);

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
                setListData(newData);
                setShowSnackBar(true);
                animationIsRunning.current = false;
            });
        }
    };

    function updateWishlist({ key }) {
        const newList = listData.filter((product) => product.key != key)
        setListData(newList);
        setShowSnackBar(true);
    }

    const renderItem = data => (
        <Animated.View
            style={[
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 170],
                    }),
                },
            ]}
        >
            <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
                <View style={styles.productWrapStyle}>
                    <Image
                        source={data.item.productImage}
                        style={styles.productImageStyle}
                    />
                    <View style={{ marginVertical: Sizes.fixPadding, marginLeft: Sizes.fixPadding, }}>
                        <Text style={{
                            maxWidth: width - 150,
                            ...Fonts.blackColor15SemiBold
                        }}>
                            {data.item.productTitle}
                        </Text>
                        <View style={{ marginVertical: Sizes.fixPadding - 2.0, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ marginRight: Sizes.fixPadding, ...Fonts.lightGrayColor13Medium }}>
                                Price:
                            </Text>
                            <Text style={{ ...Fonts.blueColor13SemiBold }}>
                                {`$`}{data.item.productPrice}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...Fonts.lightGrayColor13Medium }}>
                                Size:
                            </Text>
                            <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.blueColor13SemiBold }}>
                                {data.item.productSize}
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => updateWishlist({ key: data.item.key })}
                                style={styles.removeButtonStyle}
                            >
                                <Text style={{ ...Fonts.whiteColor12SemiBold }}>
                                    Remove
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Animated.View>
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
        </View>
    );

    function wishlistEmptyInfo() {
        return (
            <View style={styles.noWishlistItemsWrapStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    WISHLIST EMPTY
                </Text>
                <Text style={{
                    marginVertical: Sizes.fixPadding - 5.0,
                    textAlign: 'center',
                    ...Fonts.lightGrayColor13Medium
                }}>
                    {`Save your favorite pleces of clothing in one\nplace. Add now, buy later.`}
                </Text>
                <Image
                    source={(require('../../assets/images/empty_wishlist.png'))}
                    style={styles.wishlistEmptyImageStyle}
                    resizeMode="contain"
                />
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('Home')}
                    style={styles.continueShoppingButtonStyle}
                >
                    <Text style={{ ...Fonts.primaryColor16Bold }}>
                        CONTINUE SHOPPING
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
                    {listData.length == 0 ?
                        <>
                            {wishlistEmptyInfo()}
                        </>
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
                            Item Removed
                        </Text>
                    </Snackbar>
                </View>
            </View>
        </SafeAreaView>
    );

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
                    MY WISHLIST
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
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333'
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        flex: 1,
    },
    productWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding - 5.0,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding - 5.0,
    },
    productImageStyle: {
        height: 160.0,
        width: 120.0,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomLeftRadius: Sizes.fixPadding - 5.0
    },
    removeButtonStyle: {
        backgroundColor: '#9E9E9E',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Sizes.fixPadding - 6.0,
        paddingVertical: Sizes.fixPadding - 7.0,
    },
    continueShoppingButtonStyle: {
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center', justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    noWishlistItemsWrapStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.backColor
    },
    wishlistEmptyImageStyle: {
        marginTop: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding + 5.0,
        width: 130.0,
        height: 130.0,
    }
})

export default WishlistScreen;