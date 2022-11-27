import { Flex, Stack, Text } from '@chakra-ui/react'
import Image from 'next/image'

import couch from '../../public/couch.png'
import console from '../../public/console.png'
import shelf from '../../public/shelf.png'
import shoeRack from '../../public/shoe_rack.png'
import wardrobe from '../../public/wardrobe.png'
import pallet from '../../public/pallet.png'
import Link from 'next/link'

const CategoryItem = ({ catImg, catTitle }) => {
    const category = catTitle.toLowerCase().replace(' ', '-')

    return (
        <Link
            href={`/${category}`}>
            <Flex
                rounded={'lg'}
                bgColor={'blackAlpha.100'}
                shadow={'inner'}
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'center'}
                paddingX={6}
                paddingY={4}
                transition={'all'}
                transitionDuration={'.2s'}
                transitionTimingFunction={'linear'}
                _hover={{
                    shadow: 'md'
                }}
                _active={{
                    shadow: 'inner'
                }}>

                <Image
                    src={catImg}
                    width={80}
                    alt={catTitle} />

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
        </Link>
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