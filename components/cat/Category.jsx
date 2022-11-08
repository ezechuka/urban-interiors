import { Flex, Stack, Text } from '@chakra-ui/react'
import Image from 'next/image'

import couch from '../../public/couch.png'
import console from '../../public/console.png'
import shelf from '../../public/shelf.png'
import shoeRack from '../../public/shoe_rack.png'
import wardrobe from '../../public/wardrobe.png'
import pallet from '../../public/pallet.png'

const CategoryItem = ({catImg, title}) => {
    return (
        <Flex
            rounded={''}
            shadow={'lg'}
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
                shadow:'inner'
            }}>

            <Flex
                transform={'scale(0.8)'}>
                <Image
                    src={catImg}
                    width={80} />
            </Flex>

            <Text
                fontWeight={'semibold'}
                fontSize={'xs'}
                textColor={'black'}
                textAlign={'center'}
                textTransform={'uppercase'}
                letterSpacing={'wider'}
                marginTop={4}>
                {title}
            </Text>

        </Flex>
    )
}

const Category = () => {
    return (
        <Flex
            as={'section'}
            flexDirection={'column'}
            padding={12}>

            <Flex
                flexDirection={'column'}>
                <Text
                    fontWeight={'bold'}
                    fontSize={'xl'}
                    textColor={'black'}>
                    Browse by Category
                </Text>
                <Text
                    fontWeight={'medium'}
                    fontSize={'md'}
                    textColor={'gray.700'}
                    marginTop={1}>
                    Choose from wide variety of items
                </Text>
            </Flex>

            <Stack
                direction={'row'}
                marginTop={12}
                justifyContent={'space-between'}>
                <CategoryItem catImg={couch} title={'couch'}/>
                <CategoryItem catImg={pallet} title={'pallet bed'}/>
                <CategoryItem catImg={shoeRack} title={'shoe rack'}/>
                <CategoryItem catImg={wardrobe} title={'ward robe'}/>
                <CategoryItem catImg={shelf} title={'shelf'}/>
                <CategoryItem catImg={console} title={'tv console'}/>
                <CategoryItem catImg={couch} title={'table & chair'}/>
            </Stack>


        </Flex>
    )
}

export default Category