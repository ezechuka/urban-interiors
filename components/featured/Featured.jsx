import { Button, Flex, Grid, GridItem, Stack, Text } from '@chakra-ui/react'
import Image from 'next/image'

import couch from '../../public/couch.png'

const FeaturedItem = ({ featImg, featTitle, featPrice }) => {
    return (
        <Flex
            roundedTop={'lg'}
            boxShadow={'md'}
            overflow={'hidden'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            paddingTop={10}
            transition={'all'}
            bgColor={'blackAlpha.100'}>

            <Flex
                transform={'scale(0.8)'}>
                <Image
                    src={featImg}
                    alt={featTitle} />
            </Flex>

            <Text
                fontWeight={'semibold'}
                fontSize={'sm'}
                textColor={'black'}
                textAlign={'center'}
                paddingX={16}
                marginTop={4}>
                {featTitle}
            </Text>

            <Text
                fontWeight={'medium'}
                fontSize={'xs'}
                textColor={'gray.700'}
                textAlign={'center'}
                marginTop={'px'}>
                {featPrice}
            </Text>

            <Button
                variant={'secondary'}
                roundedTop={'none'}
                roundedBottom={'lg'}
                width={'100%'}
                marginTop={10}>
                Add to cart
            </Button>

        </Flex>
    )
}

const Featured = () => {
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
                gridTemplateColumns={'repeat(4, 1fr)'}
                gap={6}
                marginTop={8}>

                <FeaturedItem
                    featTitle={'Couch (velvet)'}
                    featImg={couch}
                    featPrice={'NGN5,000'}
                />

                <FeaturedItem
                    featTitle={'Couch (velvet)'}
                    featImg={couch}
                    featPrice={'NGN5,000'}
                />
                <FeaturedItem
                    featTitle={'Couch (velvet)'}
                    featImg={couch}
                    featPrice={'NGN5,000'}
                />
                <FeaturedItem
                    featTitle={'Couch (velvet)'}
                    featImg={couch}
                    featPrice={'NGN5,000'}
                />
                <FeaturedItem
                    featTitle={'Couch (velvet)'}
                    featImg={couch}
                    featPrice={'NGN5,000'}
                />
                <FeaturedItem
                    featTitle={'Couch (velvet)'}
                    featImg={couch}
                    featPrice={'NGN5,000'}
                />
                <FeaturedItem
                    featTitle={'Couch (velvet)'}
                    featImg={couch}
                    featPrice={'NGN5,000'}
                />
                <FeaturedItem
                    featTitle={'Couch (velvet)'}
                    featImg={couch}
                    featPrice={'NGN5,000'}
                />

            </Grid>


        </Flex>
    )
}

export default Featured