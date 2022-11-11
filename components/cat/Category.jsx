import { Flex, Stack, Text } from '@chakra-ui/react'
import Image from 'next/image'

import couch from '../../public/couch.png'
import console from '../../public/console.png'
import shelf from '../../public/shelf.png'
import shoeRack from '../../public/shoe_rack.png'
import wardrobe from '../../public/wardrobe.png'
import pallet from '../../public/pallet.png'

const CategoryItem = ({ catImg, catTitle }) => {
    return (
        <Flex
            rounded={'lg'}
            bgColor={'gray.50'}
            boxShadow={'md'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            paddingX={6}
            paddingY={4}
            transition={'all'}
            transitionDuration={'.2s'}
            transitionTimingFunction={'linear'}
            _hover={{
                bg: 'hsla(38, 58%, 47%, 0.2)',
                transform: 'scale(1.2)',
                cursor: 'pointer'
            }}
            _active={{
                shadow: 'inner'
            }}>

            <Flex
                transform={'scale(0.8)'}>
                <Image
                    src={catImg}
                    width={80}
                    alt={catTitle} />
            </Flex>

            <Text
                fontWeight={'semibold'}
                fontSize={'xs'}
                textColor={'black'}
                textAlign={'center'}
                textTransform={'uppercase'}
                letterSpacing={'wider'}
                marginTop={4}>
                {catTitle}
            </Text>

        </Flex>
    )
}

const Category = () => {
    return (
        <Flex
            id={'products'}
            as={'section'}
            flexDirection={'column'}
            paddingX={12}
            paddingY={16}
            justifyContent={'space-between'}
            alignItems={'center'}>

            <Flex
                flexDirection={'column'}>
                <Text
                    fontWeight={'bold'}
                    fontSize={'xl'}
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
                direction={'row'}
                marginTop={8}
                spacing={5}
                justifyContent={'space-between'}>
                <CategoryItem catImg={couch} catTitle={'couch'} />
                <CategoryItem catImg={pallet} catTitle={'pallet bed'} />
                <CategoryItem catImg={shoeRack} catTitle={'shoe rack'} />
                <CategoryItem catImg={wardrobe} catTitle={'ward robe'} />
                <CategoryItem catImg={shelf} catTitle={'shelf'} />
                <CategoryItem catImg={console} catTitle={'tv console'} />
                <CategoryItem catImg={couch} catTitle={'table & chair'} />
            </Stack>


        </Flex>
    )
}

export default Category