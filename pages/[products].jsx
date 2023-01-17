import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Breadcrumb, BreadcrumbItem, Button, Checkbox, Circle, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Grid, HStack, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Skeleton, SkeletonCircle, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { CaretRight, FunnelSimple } from 'phosphor-react'
import { useEffect, useRef, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import Link from 'next/link'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import noFilter from '../public/no_filter.png'
import ProductItem from '../components/product/ProductItem'
import { getProducts, getProductsByPrice } from '../store/productsReducer'
import Image from 'next/image'

const LoadingSkeleton = () => {
    return (
        <Grid
            gridTemplateColumns={'repeat(5, 1fr)'}
            gap={8}
            w={'full'}
            marginY={8}>
            {
                [...Array(10).keys()].map(item => (
                    <VStack
                        key={item}
                        justifyContent={'start'}
                        alignItems={'start'}>
                        <Skeleton
                            width={'220px'}
                            height={'200px'}
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

const FilterAccordionItem = ({ accordionTitle, items }) => {
    return (
        <AccordionItem>
            <h2>
                <AccordionButton>
                    <Box flex='1' textAlign='left' textColor={'black'} fontWeight={'medium'}>
                        {accordionTitle}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                <VStack
                    justifyContent={'start'}
                    alignItems={'start'}>
                    {
                        items.map((item, i) => (
                            <Checkbox key={i} colorScheme={'orange'}>
                                {item}
                            </Checkbox>
                        ))
                    }
                </VStack>
            </AccordionPanel>
        </AccordionItem>
    )
}

const FilterDrawer = ({ isOpen, onClose, btnRef, cat, filterByPrice }) => {

    const [priceRange, setPriceRange] = useState([100000, 250000])

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement={'left'}
                onClose={onClose}
                finalFocusRef={btnRef}>

                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader mt={6}>
                        <HStack spacing={3}
                            alignItems={'center'}>
                            <FunnelSimple size={24} />
                            <Text>Filter items by</Text>
                        </HStack>
                    </DrawerHeader>

                    <DrawerBody>
                        <Accordion defaultIndex={[0]} allowMultiple>

                            <FilterAccordionItem
                                accordionTitle={'Colors'}
                                items={['White', 'Black', 'Velvet', 'Matte', 'Brown']}
                            />

                            <Text
                                textColor={'black'}
                                fontWeight={'semibold'}
                                marginTop={4}>
                                Price (Naira)
                            </Text>

                            <RangeSlider aria-label={['min', 'max']}
                                defaultValue={[100000, 250000]}
                                marginTop={2}
                                onChange={(val) => setPriceRange(val)}
                                min={10000}
                                max={500000}>
                                <RangeSliderTrack>
                                    <RangeSliderFilledTrack bgColor={'gold.500'} />
                                </RangeSliderTrack>

                                <RangeSliderThumb boxSize={5} index={0} bgColor={'gray.100'} />
                                <RangeSliderThumb boxSize={5} index={1} bgColor={'gray.100'} />
                            </RangeSlider>
                            <Flex
                                justifyContent={'space-between'}>
                                <Text
                                    textColor={'gray.900'}
                                    fontSize={'xs'}
                                    fontWeight={'medium'}>
                                    {`₦${new Intl.NumberFormat().format(priceRange[0])}`}
                                </Text>

                                <Text
                                    textColor={'gray.900'}
                                    fontSize={'xs'}
                                    fontWeight={'medium'}>
                                    {`₦${new Intl.NumberFormat().format(priceRange[1])}`}
                                </Text>
                            </Flex>

                            <Button
                                variant={'ghost'}
                                borderWidth={1}
                                marginTop={4}
                                paddingX={18}
                                paddingY={2}
                                _hover={{ bgColor: 'blackAlpha.100', color: 'gold.500' }}
                                onClick={() => filterByPrice(cat, priceRange[0], priceRange[1])}>
                                Apply
                            </Button>
                        </Accordion>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

const Products = ({ getProducts, getProductsByPrice }) => {
    const router = useRouter()
    const path = router.asPath.replace('/', '')

    const { isOpen, onOpen, onClose } = useDisclosure()
    const buttonDrawerRef = useRef()

    useEffect(() => {
        getProducts(path)
    }, [path])

    const { isLoading, isFetching, isLoaded, error, data }
        = useSelector((state) => state.products)

    // if (isLoading) return <LoadingSkeleton />

    if (error) return <Text>An error occurred.</Text>

    return (
        <Flex
            as={'section'}
            paddingX={12}
            paddingY={8}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}>

            <ToastContainer />

            <Flex
                alignItems={'center'}
                w={'full'}>
                <IconButton
                    variant={'ghost'}
                    ref={buttonDrawerRef}
                    onClick={onOpen}
                    marginEnd={8}
                    icon={<FunnelSimple size={24} weight={'regular'} />}
                    _hover={{ background: 'gray.100', color: 'gold.500' }} />

                <Breadcrumb
                    spacing={2}
                    separator={<CaretRight color={'#3e3e3e'} weight={'bold'} size={14} />}
                    fontWeight={'medium'}
                    fontSize={'sm'}
                    textDecoration={'none'}>
                    <BreadcrumbItem textColor={'gray.600'} transition={'all .2s'} _hover={{ color: 'gold.500' }}>
                        <Link href='/'>Home</Link>
                    </BreadcrumbItem>

                    <BreadcrumbItem textColor={'gray.900'} textTransform={'capitalize'} isCurrentPage>
                        <Text>{path.replaceAll('-', ' ')}</Text>
                    </BreadcrumbItem>
                </Breadcrumb>

            </Flex>

            {
                isLoaded && Object.values(data).length === 0 &&
                <VStack
                    width={'full'}
                    height={'60vh'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    flexDirection={'column'}>

                    <Circle
                        bgColor={'gray.200'}
                        size={'140px'}>
                        <Image
                            src={noFilter}
                            alt={'Not match found'}
                            width={85}
                        />
                    </Circle>

                    <Text
                        fontWeight={'medium'}
                        fontSize={'md'}
                        textColor={'black'}>
                        No product match!
                    </Text>

                    <Text
                        fontWeight={'normal'}
                        fontSize={'sm'}
                        textColor={'black'}>
                        No product found within the price range
                    </Text>

                    <Button
                        variant={'solid'}
                        marginTop={10}
                        onClick={() => router.reload()}>
                        Refresh page
                    </Button>
                </VStack>
            }

            {
                isFetching ?
                    <LoadingSkeleton />
                    :
                    <Grid
                        gridTemplateColumns={'repeat(5, 1fr)'}
                        gap={8}
                        w={'full'}
                        marginY={8}>
                        {
                            Object.values(data).map(product => (
                                <ProductItem
                                    key={product.pid}
                                    productId={product.pid}
                                    productTitle={product.productName}
                                    productImg={product.images[0]}
                                    productPrice={product.productPrice}
                                />))
                        }
                    </Grid>
            }
            {/* <Flex
                flexDirection={'column'}
                alignItems={'start'}
                width={'full'}
                marginTop={8}>

                <Text
                    fontSize={'xl'}
                    textColor={'black'}>
                    Recently Viewed
                </Text>

                <Grid
                    gridTemplateColumns={'repeat(5, 1fr)'}
                    gap={8}
                    w={'full'}
                    marginY={8}>

                    {
                        [1, 2, 3, 4, 5].map(i => (
                            <ProductItem
                                featTitle={'Three seater sofa with an elongated end'}
                                featImg={sofa}
                                featPrice={'₦3,000'}
                            />))
                    }
                </Grid> 

                </Flex> */}

            <FilterDrawer
                isOpen={isOpen}
                onClose={onClose}
                btnRef={buttonDrawerRef}
                cat={path}
                filterByPrice={getProductsByPrice}
            />

        </Flex>
    )
}

export const matchDispatchToProps = dispatch => {
    return {
        getProducts: (path) =>
            dispatch(getProducts(path)),
        getProductsByPrice: (cat, minPrice, maxPrice) =>
            dispatch(getProductsByPrice(cat, minPrice, maxPrice))
    }
}

export default connect(null, matchDispatchToProps)(Products)