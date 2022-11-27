import { Flex, Text } from "@chakra-ui/react"
import Image from "next/image"
import { useRouter } from "next/router"

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
            _hover={{ shadow: 'md'}}
            onClick={() => {
                router.push(`${catPath}/${featTitle.toLowerCase().replaceAll(' ', '-')}`)
            }}>

            <Image
                src={featImg}
                alt={featTitle} />

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
                fontSize={'lg'}
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