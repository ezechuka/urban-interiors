import { Box, Circle, Flex, Grid, Stack, keyframes, Text } from '@chakra-ui/react'

import couch from '../../public/couch.png'
import console from '../../public/console.png'
import shelf from '../../public/shelf.png'
import shoeRack from '../../public/shoe_rack.png'
import wardrobe from '../../public/wardrobe.png'
import bed from '../../public/bed.png'
import chair from '../../public/chair.png'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const rotateKeyFrames = keyframes`
    from { 
        transform: rotate(0deg)
    }
    to {
        transform: rotate(360deg)
    }
`
const rotateAnimation = `${rotateKeyFrames} 10s ease-in-out infinite`

const CategoryItem = ({ catImg, catTitle }) => {
    const category = catTitle.toLowerCase().replace(' ', '-')

    return (
        <Link
            href={`/${category}`}>
            <Circle
                size={'150px'}
                position={'relative'}>
                <Box
                    as={motion.div}
                    borderWidth={'2px'}
                    borderColor={'gray.300'}
                    borderStyle={'solid'}
                    _hover={{
                        borderStyle: 'dashed',
                        borderColor: 'accent.500',
                        animation: rotateAnimation,
                        animationTimingFunction: 'linear'
                    }}
                    transition={'all .6s'}
                    inset={0}
                    borderRadius={'50%'}
                    position={'absolute'}></Box>
                <Flex
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    _active={{
                        shadow: 'inner'
                    }}>

                    <Image
                        src={catImg}
                        alt={catTitle}
                        width={60}
                    />

                    <Text
                        fontWeight={'semibold'}
                        fontSize={'xs'}
                        textColor={'black'}
                        textAlign={'center'}
                        textTransform={'uppercase'}
                        letterSpacing={'wider'}
                        marginTop={2}>
                        {catTitle}
                    </Text>

                </Flex>
            </Circle>
        </Link>
    )
}

const Category = () => {
    return (
        <Flex
            id={'products'}
            as={'section'}
            flexDirection={'column'}
            paddingX={{ base: 6, lg: 12 }}
            paddingY={{base: 8, lg: 16}}
            justifyContent={'space-between'}
            alignItems={'center'}>

            <Flex
                flexDirection={'column'}
                alignItems={'center'}>
                <Text
                    fontWeight={'bold'}
                    fontSize={{ base: '2xl', lg: '3xl' }}
                    textAlign={'center'}
                    textColor={'black'}>
                    Browse by Category
                </Text>
                <Text
                    fontWeight={'medium'}
                    fontSize={'sm'}
                    textColor={'gray.700'}
                    marginTop={1}>
                    Choose from wide variety of items
                </Text>
            </Flex>

            <Stack
                display={{ base: 'none', lg: 'flex' }}
                direction={'row'}
                marginTop={8}
                spacing={5}
                justifyContent={'space-between'}>
                <CategoryItem catImg={couch} catTitle={'Sofa'} />
                <CategoryItem catImg={bed} catTitle={'Bed'} />
                <CategoryItem catImg={shoeRack} catTitle={'Shoe rack'} />
                <CategoryItem catImg={wardrobe} catTitle={'Ward robe'} />
                <CategoryItem catImg={shelf} catTitle={'Shelf'} />
                <CategoryItem catImg={console} catTitle={'TV console'} />
                <CategoryItem catImg={chair} catTitle={'Table and chair'} />
            </Stack>

            <Grid
                display={{ base: 'grid', lg: 'none' }}
                marginTop={8}
                gap={4}
                gridTemplateColumns={{
                    base: 'repeat(1, 1fr)',
                    md: 'repeat(2, 1fr)'
                }}>
                <CategoryItem catImg={couch} catTitle={'Sofa'} />
                <CategoryItem catImg={bed} catTitle={'Bed'} />
                <CategoryItem catImg={shoeRack} catTitle={'Shoe rack'} />
                <CategoryItem catImg={wardrobe} catTitle={'Ward robe'} />
                <CategoryItem catImg={shelf} catTitle={'Shelf'} />
                <CategoryItem catImg={console} catTitle={'TV console'} />
                <CategoryItem catImg={chair} catTitle={'Table and chair'} />
            </Grid>


        </Flex>
    )
}

export default Category