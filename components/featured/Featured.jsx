import { Button, Flex, Grid, Text } from '@chakra-ui/react'
import Image from 'next/image'

import sofa from '../../public/sofa.jpg'

const FeaturedItem = ({ featImg, featTitle, featPrice }) => {

    return (
        <Flex
            rounded={'lg'}
            shadow={'inner'}
            overflow={'hidden'}
            flexDirection={'column'}
            alignItems={'start'}
            justifyContent={'center'}
            transition={'all'}
            backgroundColor={'blackAlpha.200'}
            role={'group'}>

            <Image
                src={featImg}
                alt={featTitle} />

            <Text
                fontWeight={'semibold'}
                fontSize={'md'}
                textColor={'black'}
                textAlign={'start'}
                marginStart={4}
                marginTop={2}>
                {featTitle}
            </Text>

            <Text
                fontWeight={'medium'}
                fontSize={'sm'}
                textColor={'gray.800'}
                textAlign={'start'}
                marginStart={4}
                marginTop={'px'}>
                {featPrice}
            </Text>

            <Button
                variant={'secondary'}
                borderColor={'gold.500'}
                roundedTopLeft={'md'}
                roundedBottomLeft={'md'}
                roundedTopRight={'none'}
                roundedBottomRight={'none'}
                backgroundColor={'blackAlpha.800'}
                margin={3}
                textTransform={'uppercase'}
                letterSpacing={'wide'}
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
                gridTemplateColumns={'repeat(6, 1fr)'}
                gap={8}
                marginTop={8}>

                {
                    array.map(i => (
                        <FeaturedItem
                            featTitle={'Sofa'}
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