import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from "react";
import { BackHandler, Dimensions, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Carousel from 'react-native-snap-carousel-v4';
import { Colors, Fonts, Sizes } from "../../constants/styles";

const width = Dimensions.get('window').width;

const itemWidth = Math.round(width * 0.76);

const bannerSliderList = [
    {
        bannerImage: require('../../assets/images/home_slider/slider_1.jpg')
    },
    {
        bannerImage: require('../../assets/images/home_slider/slider_2.jpg')
    },
    {
        bannerImage: require('../../assets/images/home_slider/slider_3.jpg')
    },
]

const shoppingCategoriesList = [
    {
        id: '1',
        categoryImage: require('../../assets/images/shopping_categories/men_category.jpg'),
    },
    {
        id: '2',
        categoryImage: require('../../assets/images/shopping_categories/women_category.jpg'),
    },
    {
        id: '3',
        categoryImage: require('../../assets/images/shopping_categories/beauty_category.jpg'),
    },
    {
        id: '4',
        categoryImage: require('../../assets/images/shopping_categories/kids_category.jpg'),
    },
    {
        id: '5',
        categoryImage: require('../../assets/images/shopping_categories/home_category.jpg'),
    },
    {
        id: '6',
        categoryImage: require('../../assets/images/shopping_categories/jewellery_category.jpg'),
    },
];

const safetyCheckListData = [
    {
        id: '1',
        safetyImage: require('../../assets/images/safety_checklist/safety_1.jpg')
    },
    {
        id: '2',
        safetyImage: require('../../assets/images/safety_checklist/safety_2.jpg')
    },
    {
        safetyImage: require('../../assets/images/safety_checklist/safety_3.jpg')
    },
    {
        id: '3',
        safetyImage: require('../../assets/images/safety_checklist/safety_4.jpg')
    },
    {
        id: '4',
        safetyImage: require('../../assets/images/safety_checklist/safety_5.jpg')
    },
];

const topCategoriesList = [
    {
        id: '1',
        categoryImage: require('../../assets/images/top_category/top_category_1.jpg')
    },
    {
        id: '2',
        categoryImage: require('../../assets/images/top_category/top_category_2.jpg')
    },
    {
        id: '3',
        categoryImage: require('../../assets/images/top_category/top_category_3.jpg')
    },
    {
        id: '4',
        categoryImage: require('../../assets/images/top_category/top_category_4.jpg')
    },
    {
        id: '5',
        categoryImage: require('../../assets/images/top_category/top_category_5.jpg')
    },
    {
        id: '6',
        categoryImage: require('../../assets/images/top_category/top_category_6.jpg')
    },
    {
        id: '7',
        categoryImage: require('../../assets/images/top_category/top_category_7.jpg')
    },
    {
        id: '8',
        categoryImage: require('../../assets/images/top_category/top_category_8.jpg')
    },
    {
        id: '9',
        categoryImage: require('../../assets/images/top_category/top_category_9.jpg')
    }
];

const summerEditsList = [
    {
        id: '1',
        summerEditImage: require('../../assets/images/summer_edit/summer_edit_1.jpg'),
    },
    {
        id: '2',
        summerEditImage: require('../../assets/images/summer_edit/summer_edit_2.jpg'),
    },
    {
        id: '3',
        summerEditImage: require('../../assets/images/summer_edit/summer_edit_3.jpg'),
    },
    {
        id: '4',
        summerEditImage: require('../../assets/images/summer_edit/summer_edit_4.jpg'),
    },
];

const exploreBrandsList = [
    {
        id: '1',
        brandImage: require('../../assets/images/explore_brands/explore_brands_1.jpg')
    },
    {
        id: '2',
        brandImage: require('../../assets/images/explore_brands/explore_brands_2.jpg')
    },
    {
        id: '3',
        brandImage: require('../../assets/images/explore_brands/explore_brands_3.jpg')
    },
    {
        id: '4',
        brandImage: require('../../assets/images/explore_brands/explore_brands_4.jpg')
    },
    {
        id: '5',
        brandImage: require('../../assets/images/explore_brands/explore_brands_5.jpg')
    },
    {
        id: '6',
        brandImage: require('../../assets/images/explore_brands/explore_brands_6.jpg')
    },
    {
        id: '7',
        brandImage: require('../../assets/images/explore_brands/explore_brands_7.jpg')
    },
    {
        id: '8',
        brandImage: require('../../assets/images/explore_brands/explore_brands_8.jpg')
    },
    {
        id: '9',
        brandImage: require('../../assets/images/explore_brands/explore_brands_9.jpg')
    },
];

const kidsApparelsList = [
    {
        id: '1',
        kidsApparelsImage: require('../../assets/images/kids_apparels/kids_apparels_1.jpg')
    },
    {
        id: '2',
        kidsApparelsImage: require('../../assets/images/kids_apparels/kids_apparels_2.jpg')
    },
];

const HomeScreen = ({ navigation }) => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0)
        }, 1000)
    }

    const [backClickCount, setBackClickCount] = useState(0);
    const [bannerSliderData, setBannerSliderData] = useState(bannerSliderList);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {shoppingCategories()}
                            {bannerSlider()}
                            {safetyCheckList()}
                            {topCategories()}
                            {summerEdit()}
                            {exploreBrands()}
                            {kidsApparels()}
                        </>
                    }
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 5.0, }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor14SemiBold }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </SafeAreaView>
    )

    function kidsApparels() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Products')}
            >
                <Image
                    source={item.kidsApparelsImage}
                    style={styles.kidsApparelsImageStyle}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        )
        return (
            <View>
                <Text style={styles.kidsApparelsTextStyle}>
                    KIDS APPARELS
                </Text>
                <FlatList
                    horizontal
                    data={kidsApparelsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }

    function exploreBrands() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Products')}
            >
                <Image
                    source={item.brandImage}
                    style={{ ...styles.brandsImageStyle }}
                    resizeMode="stretch"
                />
            </TouchableOpacity>
        )
        return (
            <View>
                <Text style={styles.exploreBrandsTextStyle}>
                    EXPLORE BRANDS
                </Text>
                <FlatList
                    listKey={`brandList`}
                    data={exploreBrandsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={3}
                    scrollEnabled={false}
                    contentContainerStyle={{ backgroundColor: 'red' }}
                    columnWrapperStyle={{
                        paddingHorizontal: Sizes.fixPadding - 5.0,
                        flexDirection: 'row',
                    }}
                />
            </View>
        )
    }

    function summerEdit() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Products')}
            >
                <Image
                    source={item.summerEditImage}
                    style={styles.summerEditImageStyle}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        )
        return (
            <View>
                <Text style={styles.summerEditTextStyle}>
                    SUMMER EDIT
                </Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={summerEditsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding }}
                />
            </View>
        )
    }

    function topCategories() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => navigation.push('CategoryDetail')}
            >
                <Image
                    source={item.categoryImage}
                    style={styles.topCategoriesImageStyle}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        )
        return (
            <View style={{ flex: 1, }}>
                <Text style={styles.topCategoriesTextStyle}>
                    TOP CATEGORIES
                </Text>
                <FlatList
                    listKey={`categoryList`}
                    data={topCategoriesList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    scrollEnabled={false}
                    numColumns={3}
                    columnWrapperStyle={{
                        paddingHorizontal: Sizes.fixPadding - 5.0,
                        flexDirection: 'row',
                    }}
                />
            </View>
        )
    }

    function safetyCheckList() {

        const renderItem = ({ item }) => (
            <Image
                source={item.safetyImage}
                style={{
                    width: width - 120,
                    height: 80,
                    marginRight: Sizes.fixPadding,
                }}
                resizeMode="contain"
            />
        )
        return (
            <View>
                <FlatList
                    horizontal
                    data={safetyCheckListData}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingLeft: Sizes.fixPadding,
                        paddingVertical: Sizes.fixPadding
                    }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }

    function bannerSlider() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Products')}
            >
                <Image
                    source={item.bannerImage}
                    style={{
                        width: width - 100,
                        height: 250,
                    }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        )

        return (
            <View style={{ backgroundColor: Colors.whiteColor }}>
                <Carousel
                    data={bannerSliderData}
                    sliderWidth={width}
                    itemWidth={itemWidth}
                    renderItem={renderItem}
                    autoplay={true}
                    loop={true}
                    autoplayInterval={4000}
                    showsHorizontalScrollIndicator={false}
                    onSnapToItem={(index) => { }}
                />
            </View>
        )
    }

    function shoppingCategories() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('CategoryDetail')}
            >
                <Image
                    source={item.categoryImage}
                    style={{
                        width: 85.0,
                        height: 100.0,
                        marginRight: Sizes.fixPadding - 5.0,
                    }}
                />
            </TouchableOpacity>
        )
        return (
            <View>
                <FlatList
                    horizontal
                    data={shoppingCategoriesList}
                    renderItem={renderItem}
                    keyExtractor={(item) => `${item.id}`}
                    contentContainerStyle={{
                        paddingVertical: Sizes.fixPadding,
                        paddingLeft: Sizes.fixPadding - 5.0,
                    }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1.5,
                }}>
                    <MaterialIcons
                        name="menu"
                        size={25}
                        color="black"
                        style={{ marginRight: Sizes.fixPadding * 2.0 }}
                        onPress={() => navigation.openDrawer()}
                    />
                    <Image
                        source={require('../../assets/images/logo/stylo_transparent.png')}
                        style={{ width: 30.0, height: 30.0, }}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.headerIconsWrapStyle}>
                    <MaterialIcons
                        name="search"
                        color={Colors.blackColor}
                        size={25}
                        onPress={() => navigation.push('Search')}
                    />
                    <View>
                        <MaterialIcons
                            name="notifications-none"
                            color={Colors.blackColor}
                            size={25}
                            onPress={() => navigation.push('Notifications')}
                        />
                        <View style={styles.notificationsFavoritsAndShoppingsCountStyle}>
                            <Text style={{ ...Fonts.whiteColor12Medium }}>
                                2
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push('Wishlist')}
                    >
                        <MaterialIcons
                            name="favorite-border"
                            color={Colors.blackColor}
                            size={25}
                        />
                        <View style={styles.notificationsFavoritsAndShoppingsCountStyle}>
                            <Text style={{ ...Fonts.whiteColor12Medium }}>
                                2
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push('Bag')}
                    >
                        <FontAwesome5
                            name="shopping-bag"
                            size={24}
                            color={Colors.blackColor}
                        />
                        <View style={styles.notificationsFavoritsAndShoppingsCountStyle}>
                            <Text style={{ ...Fonts.whiteColor12Medium }}>
                                3
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: Sizes.fixPadding * 2.0,
        paddingRight: Sizes.fixPadding + 1.0,
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        elevation: 2.0,
    },
    notificationsFavoritsAndShoppingsCountStyle: {
        position: 'absolute',
        right: -10.0,
        top: -5.0,
        width: 18.0, height: 18.0,
        borderRadius: 9.0,
        backgroundColor: Colors.redColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIconsWrapStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    kidsApparelsTextStyle: {
        marginTop: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding,
        ...Fonts.blackColor15SemiBold
    },
    kidsApparelsImageStyle: {
        width: 230,
        height: 290,
        borderColor: '#e0e0e0',
        borderWidth: 2.0,
        marginRight: Sizes.fixPadding - 3.0,
    },
    summerEditImageStyle: {
        width: 230,
        height: 290,
        borderColor: '#e0e0e0',
        borderWidth: 2.0,
        marginRight: Sizes.fixPadding - 3.0,
    },
    summerEditTextStyle: {
        marginTop: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding,
        ...Fonts.blackColor15SemiBold
    },
    topCategoriesImageStyle: {
        height: 160.0,
        marginHorizontal: Sizes.fixPadding - 5.0,
        width: width / 3.34,
        marginBottom: Sizes.fixPadding - 5.0,
        alignSelf: 'center',
    },
    exploreBrandsTextStyle: {
        marginTop: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding + 2.0,
        marginHorizontal: Sizes.fixPadding,
        ...Fonts.blackColor15SemiBold
    },
    topCategoriesTextStyle: {
        marginTop: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding,
        ...Fonts.blackColor15SemiBold
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 40,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    brandsImageStyle: {
        height: 150.0,
        width: width / 3.35,
        marginHorizontal: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding,
    }
})

export default HomeScreen;