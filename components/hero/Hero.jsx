import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image"

import hero from '../../public/hero.png'

const slideLeftVariant = {
    fromLeft: {
        x: '-50vw'
    },
    toRight: {
        x: 0,
        transition: {
            delay: 0.6,
            type: 'spring',
            stiffness: 85,
            when: 'beforeChildren'
        }
    }
}

const slideRightVariant = {
    fromRight: {
        x: '100vw'
    },
    toLeft: {
        x: 0,
        transition: {
            delay: 1,
            type: 'spring',
            stiffness: 85
        }
    }
}

const fadeInVariant = {
    hidden: {
        opacity: 0,
        y: 10
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'tween',
            duration: 1
        }
    }
}

const Hero = () => {
    return (
        <Flex
            as={'section'}
            minHeight={'85vh'}
            paddingX={12}
            justifyContent={'space-between'}
            alignItems={'center'}>

            <VStack
                as={motion.div}
                flexDirection={'column'}
                alignItems={'start'}
                justifyContent={'space-evenly'}
                maxWidth={'45%'}
                spacing={8}
                variants={slideLeftVariant}
                initial={'fromLeft'}
                animate={'toRight'}>

                <Text
                    as={'h1'}
                    fontWeight={'black'}
                    fontSize={'5xl'}
                    textColor={'black'}
                    lineHeight={'shorter'}>
                    Discover innovative ways to <Text as={'span'} fontStyle={'italic'}>decorate</Text>
                </Text>

                <Text
                    textColor={'gray.700'}
                    maxWidth={'md'}
                    fontWeight={'medium'}>
                    We are known for bringing out the beauty in every space.
                    Shop with us to get amazing offers.
                </Text>

                <Button
                    as={motion.div}
                    variants={fadeInVariant}
                    initial={'hidden'}
                    animate={'visible'}
                    variant={'solid'}
                    onClick={() => {
                        const element = document.getElementById('products')
                        element?.scrollIntoView({
                            behavior: 'smooth'
                        })
                    }}>
                    Start shopping
                </Button>
            </VStack>

            <Flex
                as={motion.div}
                rounded={'20%'}
                minW={'55%'}
                justifyContent={'end'}
                variants={slideRightVariant}
                initial={'fromRight'}
                animate={'toLeft'}>
                <Image
                    src={hero}
                    alt={''}
                    priority={true}
                />
            </Flex>

        </Flex>
    )
}

export default Hero