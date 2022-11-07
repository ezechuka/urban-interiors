import { Button, Flex, Text, VStack } from "@chakra-ui/react"
import Image from "next/image"

import hero from '../../public/hero.png'

const Hero = () => {
    return (
        <Flex
            as={'section'}
            minHeight={'85vh'}
            paddingX={12}
            justifyContent={'space-between'}
            alignItems={'center'}>

            <VStack
                flexDirection={'column'}
                alignItems={'start'}
                justifyContent={'space-evenly'}
                maxWidth={'45%'}
                spacing={8}>

                <Text
                    as={'h1'}
                    fontWeight={'black'}
                    fontSize={'5xl'}
                    textColor={'black'}
                    lineHeight={'shorter'}>
                    Discover innovative ways to decorate
                </Text>

                <Text
                    textColor={'gray.700'}
                    maxWidth={'md'}
                    fontWeight={'medium'}>
                    We are known for bringing out the beauty in every space.
                    Shop with us to get amazing offers.
                </Text>

                <Button variant={'solid'}>
                    Start shopping
                </Button>
            </VStack>

            <Flex
                rounded={'20%'}
                minW={'55%'}
                justifyContent={'end'}>

                <Image
                    src={hero}
                    width={550} />

            </Flex>

        </Flex>
    )
}

export default Hero