import { Button, Flex, HStack, Input, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Text, Textarea, VStack } from "@chakra-ui/react"
import { CaretDoubleDown, Circle } from "phosphor-react"

const UploadProduct = () => {
    return (
        <Flex
            rounded={'md'}
            paddingY={4}
            flexDirection={'column'}>

            <Text
                fontWeight={'bold'}
                fontSize={'xl'}
                textColor={'black'}>
                Add new product
            </Text>

            <Flex
                width={'full'}>
                <VStack
                    spacing={4}
                    alignItems={'start'}
                    width={'full'}>
                    <VStack
                        alignItems={'start'}
                        marginTop={4}
                        spacing={'2px'}>
                        <Text
                            textColor={'black'}
                            fontWeight={'medium'}
                            fontSize={'sm'}>
                            Product name
                        </Text>

                        <Input
                            name={'title'}
                            type={'text'}
                            placeholder={'L-shaped 4 seater couch'}
                            _placeholder={{ fontSize: 'sm' }}
                            // value={userData.email}
                            focusBorderColor={'gold.500'}
                            _focus={{ transform: 'scale(1.01)' }}
                            size={'md'}
                        />

                        {/* {errors.email &&
						<Text
							textColor={'red.500'}
							fontWeight={'light'}
							fontSize={'xs'}>
							{errors.email}
						</Text>
					} */}
                    </VStack>

                    <VStack
                        alignItems={'start'}
                        marginTop={4}
                        spacing={'2px'}>
                        <Text
                            textColor={'black'}
                            fontWeight={'medium'}
                            fontSize={'sm'}>
                            Product price (NGN)
                        </Text>

                        <Input
                            name={'price'}
                            type={'number'}
                            placeholder={'140,000'}
                            _placeholder={{ fontSize: 'sm' }}
                            // value={userData.email}
                            focusBorderColor={'gold.500'}
                            _focus={{ transform: 'scale(1.01)' }}
                            size={'md'}
                        />

                        {/* {errors.email &&
						<Text
							textColor={'red.500'}
							fontWeight={'light'}
							fontSize={'xs'}>
							{errors.email}
						</Text>
					} */}
                    </VStack>

                    <Text
                        textColor={'black'}
                        fontWeight={'medium'}
                        fontSize={'sm'}>
                        Category and sub category
                    </Text>
                    <Menu closeOnSelect={false}>
                        <MenuButton as={Button} width={'45%'} variant={'ghost'} fontSize={'md'} borderWidth={1} textTransform={'none'}
                            rightIcon={<CaretDoubleDown weight={'bold'} />}>
                            Choose category
                        </MenuButton>
                        <MenuList minWidth='240px' fontSize={'sm'}>
                            <MenuOptionGroup defaultValue={'bed'} title='Choose furniture type' type='radio'>
                                <MenuItemOption value={'sofa'}>Sofa</MenuItemOption>
                                <MenuItemOption value={'bed'}>Bed</MenuItemOption>
                                <MenuItemOption value={'shoe-rack'}>Shoe Rack</MenuItemOption>
                                <MenuItemOption value={'ward-roble'}>Ward Robe</MenuItemOption>
                                <MenuItemOption value={'shelf'}>Shelf</MenuItemOption>
                                <MenuItemOption value={'tv-console'}>TV Console</MenuItemOption>
                                <MenuItemOption value={'table-and-chair'}>Table and chair</MenuItemOption>
                            </MenuOptionGroup>
                        </MenuList>
                    </Menu>

                    <Menu closeOnSelect={false}>
                        <MenuButton as={Button} width={'45%'} fontSize={'md'} variant={'ghost'} borderWidth={1} textTransform={'none'}
                            rightIcon={<CaretDoubleDown weight={'bold'} />}>
                            Choose sub category
                        </MenuButton>
                        <MenuList minWidth='240px' fontSize={'sm'}>
                            <MenuOptionGroup title='Sub category' type='checkbox'>
                                <MenuItemOption value={'trending'}>Trending</MenuItemOption>
                                <MenuItemOption value={'featured'}>Featured</MenuItemOption>
                                <MenuItemOption value={'on-sale'}>On Sale</MenuItemOption>
                                <MenuItemOption value={'new-arrival'}>New Arrival</MenuItemOption>
                            </MenuOptionGroup>
                        </MenuList>
                    </Menu>

                    <Text
                        textColor={'black'}
                        fontWeight={'medium'}
                        fontSize={'sm'}>
                        Color
                    </Text>

                    <Menu closeOnSelect={false}>
                        <MenuButton as={Button} width={'45%'} fontSize={'md'} variant={'ghost'} borderWidth={1} textTransform={'none'}
                            rightIcon={<CaretDoubleDown weight={'bold'} />}>
                            Choose furniture color
                        </MenuButton>
                        <MenuList minWidth='240px' fontSize={'sm'}>
                            <MenuOptionGroup defaultValue={'#FFFFFF'} title='Sub category' type='radio'>
                                <MenuItemOption value={'#FFFFFF'}
                                    icon={<Circle weight={'regular'} size={24} color={'black'} />}>White</MenuItemOption>
                                <MenuItemOption value={'black'}
                                    icon={<Circle weight={'fill'} size={24} color={'#902C3E'} />}>Velvet</MenuItemOption>
                                <MenuItemOption value={'matte'}
                                    icon={<Circle weight={'fill'} size={24} color={'#090909'} />}>Matte Black</MenuItemOption>
                                <MenuItemOption value={'#8B4513'}
                                    icon={<Circle weight={'fill'} size={24} color={'#8B4513'} />}>Brown</MenuItemOption>
                            </MenuOptionGroup>
                        </MenuList>
                    </Menu>

                    <Text
                        textColor={'black'}
                        fontWeight={'medium'}
                        fontSize={'sm'}>
                        Product images
                    </Text>

                    <Input
                        type={'file'}
                        name={'image-one'}
                        width={'50%'}
                        accept={'image/png, image/jpg, image/jpeg'}
                    />
                    <Input
                        type={'file'}
                        name={'image-two'}
                        width={'50%'}
                        accept={'image/png, image/jpg, image/jpeg'}
                    />
                    <Input
                        type={'file'}
                        name={'image-three'}
                        width={'50%'}
                        accept={'image/png, image/jpg, image/jpeg'}
                    />

                    <Textarea
                        placeholder={'Product description'}
                        _placeholder={{ fontSize: 'sm' }}
                        focusBorderColor={'gold.500'}
                        _focus={{ transform: 'scale(1.01)' }} />
                </VStack>

                <VStack
                    spacing={4}
                    alignItems={'start'}
                    width={'full'}>
                    <VStack
                        alignItems={'start'}
                        marginTop={4}
                        spacing={'2px'}>
                        <Text
                            textColor={'black'}
                            fontWeight={'medium'}
                            fontSize={'sm'}>
                            Width
                        </Text>

                        <Input
                            name={'width'}
                            type={'number'}
                            placeholder={'3'}
                            _placeholder={{ fontSize: 'sm' }}
                            // value={userData.email}
                            focusBorderColor={'gold.500'}
                            _focus={{ transform: 'scale(1.01)' }}
                            size={'md'}
                        />

                        {/* {errors.email &&
						<Text
							textColor={'red.500'}
							fontWeight={'light'}
							fontSize={'xs'}>
							{errors.email}
						</Text>
					} */}
                    </VStack>

                    <VStack
                        alignItems={'start'}
                        marginTop={4}
                        spacing={'2px'}>
                        <Text
                            textColor={'black'}
                            fontWeight={'medium'}
                            fontSize={'sm'}>
                            Length
                        </Text>

                        <Input
                            name={'length'}
                            type={'number'}
                            placeholder={'4'}
                            _placeholder={{ fontSize: 'sm' }}
                            // value={userData.email}
                            focusBorderColor={'gold.500'}
                            _focus={{ transform: 'scale(1.01)' }}
                            size={'md'}
                        />

                        {/* {errors.email &&
						<Text
							textColor={'red.500'}
							fontWeight={'light'}
							fontSize={'xs'}>
							{errors.email}
						</Text>
					} */}
                    </VStack>

                    <VStack
                        alignItems={'start'}
                        marginTop={4}
                        spacing={'2px'}>
                        <Text
                            textColor={'black'}
                            fontWeight={'medium'}
                            fontSize={'sm'}>
                            Height
                        </Text>

                        <Input
                            name={'height'}
                            type={'number'}
                            placeholder={'5'}
                            _placeholder={{ fontSize: 'sm' }}
                            // value={userData.email}
                            focusBorderColor={'gold.500'}
                            _focus={{ transform: 'scale(1.01)' }}
                            size={'md'}
                        />

                        {/* {errors.email &&
						<Text
							textColor={'red.500'}
							fontWeight={'light'}
							fontSize={'xs'}>
							{errors.email}
						</Text>
					} */}
                    </VStack>

                </VStack>
            </Flex>

            <Button mt={10} width={'30%'}>
                Upload
            </Button>
        </Flex>
    )
}

export default UploadProduct