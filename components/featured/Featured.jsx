import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react'
import Image from 'next/image'

import sofa from '../../public/sofa.jpg'

const FeaturedItem = ({ featImg, featTitle, featPrice }) => {

    return (
        <Flex
            as={'button'}
            rounded={'lg'}
            shadow={'inner'}
            overflow={'hidden'}
            flexDirection={'column'}
            justifyContent={'center'}
            transition={'all'}
            bgColor={'blackAlpha.100'}
            position={'relative'}
            _hover={{ shadow: 'lg'}}>

            <Image
                src={featImg}
                alt={featTitle}
                width={'100%'} />

            <Text
                fontWeight={'normal'}
                fontSize={'sm'}
                textColor={'black'}
                overflow={'hidden'}
                whiteSpace={'nowrap'}
                paddingStart={2}
                paddingTop={2}
                textOverflow={'ellipsis'}>
                {featTitle}
            </Text>

            <Text
                fontWeight={'medium'}
                fontSize={'md'}
                textColor={'gray.900'}
                textAlign={'start'}
                paddingStart={2}
                paddingBottom={2}>
                {featPrice}
            </Text>

            <Button
                variant={'secondary'}
                borderColor={'gold.500'}
                roundedTopLeft={'none'}
                roundedTopRight={'none'}
                paddingY={6}
                w={'full'}
                backgroundColor={'blackAlpha.800'}
                textTransform={'uppercase'}
                letterSpacing={'wider'}
                _hover={{
                    bgColor: 'blackAlpha.500'
                }}>
                Add to cart
            </Button>

        </Flex>
    )
}

const Featured = () => {
    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    return (
        <Flex
            as={'section'}
            paddingX={12}
            paddingY={16}
            flexDirection={'column'}
            justifyContent={'space-between'}
            alignItems={'center'}>

            <Flex
                flexDirection={'column'}>
                <Text
                    fontWeight={'bold'}
                    fontSize={'xl'}
                    textAlign={'center'}
                    textColor={'black'}>
                    Featured Items
                </Text>
                <Text
                    fontWeight={'medium'}
                    fontSize={'sm'}
                    textColor={'gray.700'}
                    marginTop={1}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem
                </Text>
            </Flex>

            <Grid
                gridTemplateColumns={'repeat(5, 1fr)'}
                gap={8}
                marginTop={8}>

                {
                    array.map(i => (
                        <FeaturedItem
                            key={i}
                            featTitle={'Lorem ipsum, dolor sit amet consectetur'}
                            featPrice={'₦5,000'}
                            featImg={sofa}
                        />
                    ))
                }
            </Grid>


        </Flex>
    )
}

export default Featured