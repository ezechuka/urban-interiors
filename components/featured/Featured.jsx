import { Box, Button, Flex, Grid, Skeleton, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { addToCart } from '../../store/cartReducer'
import { getProductsBySubCategory } from '../../store/productsReducer'

const LoadingSkeleton = () => {
    return (
        <Grid
            gridTemplateColumns={'repeat(5, 1fr)'}
            gap={8}
            marginY={8}>
            {
                [...Array(10).keys()].map(item => (
                    <VStack
                        key={item}
                        justifyContent={'start'}
                        alignItems={'start'}>
                        <Skeleton
                            width={'220px'}
                            height={'100px'}
                            rounded={'lg'}
                            fadeDuration={2}
                        />
                        <Skeleton
                            width={'140px'}
                            height={'10px'}
                            rounded={'lg'}
                            fadeDuration={2}
                        />
                        <Skeleton
                            width={'70px'}
                            height={'10px'}
                            rounded={'lg'}
                            fadeDuration={2}
                        />
                    </VStack>
                ))
            }
        </Grid>
    )
}

const FeaturedItem = ({ productId, productName, productPrice,
    productImg, addToCart }) => {

    const router = useRouter()
    const cart = useSelector((state) => state.persistFirebase.profile.cart)

    return (
        <Flex
            as={'button'}
            rounded={'lg'}
            boxShadow={'lg'}
            overflow={'hidden'}
            flexDirection={'column'}
            justifyContent={'center'}
            transition={'all'}
            p={2}
            bgColor={'blackAlpha.200'}
            position={'relative'}
            _hover={{ shadow: 'md' }}>

            <Box
                boxSize={'200px'}
                rounded={'lg'}
                alignSelf={'center'}
                position={'relative'}>
                <Image
                    src={productImg}
                    fill
                    alt={productName} />
            </Box>

            <Text
                fontWeight={'normal'}
                fontSize={'sm'}
                textColor={'black'}
                overflow={'hidden'}
                whiteSpace={'nowrap'}
                paddingTop={2}
                textOverflow={'ellipsis'}>
                {productName}
            </Text>

            <Text
                fontWeight={'semibold'}
                fontSize={'md'}
                textColor={'gray.900'}
                paddingStart={2}
                paddingBottom={2}>
                {`₦${new Intl.NumberFormat().format(productPrice)}`}
            </Text>

            {
                Object.keys(cart ? cart.items : {}).includes(productId) ?
                    <Button
                        variant={'secondary'}
                        rounded={'lg'}
                        borderWidth={1}
                        paddingY={6}
                        fontWeight={'bold'}
                        w={'full'}
                        backgroundColor={'gold.500'}
                        textTransform={'uppercase'}
                        letterSpacing={'wider'}
                        _hover={{
                            color: 'white',
                            shadow: 'lg'
                        }}
                        onClick={() => router.push('/cart')}>
                        Go to cart
                    </Button>
                    :
                    <Button
                        variant={'secondary'}
                        rounded={'lg'}
                        paddingY={6}
                        w={'full'}
                        fontWeight={'bold'}
                        backgroundColor={'blackAlpha.800'}
                        textTransform={'uppercase'}
                        letterSpacing={'wider'}
                        _hover={{
                            bgColor: 'blackAlpha.500'
                        }}
                        onClick={() => addToCart(productId, productPrice, cart)}>
                        Add to cart
                    </Button>
            }

        </Flex>
    )
}

const ProductCollection = ({ productState, addToCart }) => {
    const { isLoading, isFetching, isLoaded, error, data }
        = productState

    if (isFetching) return <LoadingSkeleton />

    return (
        <Grid
            gridTemplateColumns={'repeat(5, 1fr)'}
            gap={8}
            marginTop={8}>

            {
                Object.values(data).map((product, index) => (
                    <FeaturedItem
                        key={index}
                        productId={product.pid}
                        productName={product.productName}
                        productPrice={product.productPrice}
                        productImg={product.images[0]}
                        addToCart={addToCart}
                    />
                ))
            }
        </Grid>
    )
}

const Featured = ({ getProductsBySubCategory, addToCart }) => {
    const subCategory = ['Trending', 'Featured', 'On Sale', 'New Arrival']

    const productState = useSelector((state) => state.products)

    const fetchSubCategory = (index) => {
        switch (index) {
            case 0:
                getProductsBySubCategory(subCategory[index].toLowerCase())
                break
            case 1:
                getProductsBySubCategory(subCategory[index].toLowerCase())
                break
            case 2:
                getProductsBySubCategory(subCategory[index].toLowerCase())
                break
            case 3:
                getProductsBySubCategory(subCategory[index].toLowerCase())
                break
        }
    }

    useEffect(() => {
        fetchSubCategory(0)
    }, [])

    return (
        <Flex
            as={'section'}
            paddingX={12}
            paddingY={16}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}>
            <ToastContainer />

            <Flex
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}>
                <Text
                    fontWeight={'bold'}
                    fontSize={'3xl'}
                    textAlign={'center'}
                    textColor={'black'}>
                    Our Products
                </Text>
                <Text
                    fontWeight={'medium'}
                    fontSize={'sm'}
                    textColor={'gray.700'}
                    marginTop={1}>
                    Discover varieties of selected amazing products collection
                </Text>

                <Tabs
                    align={'center'}
                    marginTop={4}
                    colorScheme={'orange'}
                    variant={'soft-rounded'}
                    onChange={(index) => fetchSubCategory(index)}>
                    <TabList>
                        {
                            subCategory.map((item, index) =>
                                <Tab key={index}>{item}</Tab>
                            )
                        }
                    </TabList>
                    <TabPanels>
                        {
                            subCategory.map((item, index) =>
                                <TabPanel key={index}>
                                    <ProductCollection
                                        productState={productState}
                                        addToCart={addToCart}
                                    />
                                </TabPanel>
                            )}
                    </TabPanels>
                </Tabs>
            </Flex>

        </Flex>
    )
}


export const matchDispatchToProps = dispatch => {
    return {
        getProductsBySubCategory: (subCategory) =>
            dispatch(getProductsBySubCategory(subCategory)),
        addToCart: (productId, productPrice, prevCart) =>
            dispatch(addToCart(productId, productPrice, prevCart))
    }
}

export default connect(null, matchDispatchToProps)(Featured)