import { Flex, IconButton, Text } from "@chakra-ui/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { Heart } from "phosphor-react"

const ProductItem = ({ featImg, featTitle, featPrice }) => {
    const router = useRouter()
    const catPath = router.query.products

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
            _hover={{ shadow: 'md' }}
            onClick={() => {
                router.push(`${catPath}/${featTitle.toLowerCase().replaceAll(' ', '-')}`)
            }}>

            <Image
                src={featImg}
                width={100}
                height={100}
                alt={featTitle} />

            <IconButton
                variant={'ghost'}
                position={'absolute'}
                top={2}
                right={2}
                bgColor={'white'}
                rounded={'full'}
                icon={<Heart size={24} color={'black'} alt={'Add to wishlist'} />}
                onClick={(e) => {
                    e.stopPropagation()
                    alert('fav')
                }}
                _hover={{
                    bgColor: 'gold.500'
                }}
            />

            <Text
                fontWeight={'normal'}
                fontSize={'sm'}
                textColor={'gray.800'}
                textAlign={'start'}
                padding={2}
                w={'full'}
                overflow={'hidden'}
                whiteSpace={'nowrap'}
                textOverflow={'ellipsis'}>
                {featTitle}
            </Text>

            <Text
                fontWeight={'medium'}
                fontSize={'md'}
                textAlign={'start'}
                textColor={'black'}
                paddingStart={2}
                paddingBottom={4}>
                {featPrice}
            </Text>

        </Flex>
    )
}

export default ProductItem