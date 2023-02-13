import { Button, Flex, Input, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Text, Textarea, VStack } from "@chakra-ui/react"
import { CaretDoubleDown, Circle } from "phosphor-react"
import { useState } from "react"
import { connect } from "react-redux"
import firebase from 'firebase/compat/app'

import { addNewProduct } from "../../store/addProductReducer"

import { AddProductValidation } from '../../utils/validate'

const UploadProduct = ({ uploadNewProduct }) => {

    const [product, setProduct] = useState({
        productName: '',
        productPrice: '',
        category: 'bed',
        subcategory: [],
        color: [],
        width: '',
        length: '',
        height: '',
        images: [],
        desc: ''
    })

    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setProduct((prevProd) => ({ ...prevProd, [name]: value }))
    }

    const handleFileChange = (e, pos) => {
        const { name, files } = e.target

        setProduct((prevProd) => {
            var tempImgs = prevProd.images
            tempImgs[pos] = files[0]

            return { ...prevProd, [name]: [...tempImgs] }
        })
    }

    const changeLoadState = () => {
        setIsLoading(prev => !prev)
    }

    const uploadProduct = () => {
        let errors = AddProductValidation(
            product.productName,
            Number(product.productPrice),
            product.category,
            product.subcategory,
            product.color,
            Number(product.width),
            Number(product.length),
            Number(product.height),
            product.images,
            product.desc
        )
        if (Object.keys(errors).length === 0) {
            const colors = {
                '#FFFFFF': 'white',
                '#902C3E': 'velvet',
                '#090909': 'matte black',
                '#8B4513': 'brown'
            }

            let selectedColorName = []
            let selectedColorValue = []
            product.color.forEach(c => {
                if (colors[c]) {
                    selectedColorName.push(colors[c])
                    selectedColorValue.push(c)
                }
            })
            const newProd = {
                ...product,
                productPrice: Number(product.productPrice),
                width: Number(product.width),
                length: Number(product.length),
                height: Number(product.height),
                color: selectedColorName,
                colorValue: selectedColorValue,
                createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
            }

            changeLoadState()
            uploadNewProduct(newProd, changeLoadState)
        } else {
            setErrors(errors)
        }
    }

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
                            name={'productName'}
                            type={'text'}
                            placeholder={'L-shaped 4 seater couch'}
                            _placeholder={{ fontSize: 'sm' }}
                            value={product.productName}
                            focusBorderColor={'gold.500'}
                            _focus={{ transform: 'scale(1.01)' }}
                            size={'md'}
                            onChange={handleFormChange}
                        />

                        {errors.productName &&
                            <Text
                                textColor={'red.500'}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                {errors.productName}
                            </Text>
                        }
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
                            name={'productPrice'}
                            type={'number'}
                            placeholder={'140,000'}
                            _placeholder={{ fontSize: 'sm' }}
                            value={product.productPrice}
                            focusBorderColor={'gold.500'}
                            _focus={{ transform: 'scale(1.01)' }}
                            size={'md'}
                            onChange={handleFormChange}
                        />

                        {errors.productPrice &&
                            <Text
                                textColor={'red.500'}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                {errors.productPrice}
                            </Text>
                        }
                    </VStack>

                    <VStack
                        alignItems={'start'}
                        marginTop={4}
                        spacing={'2px'}
                        width={'50%'}>
                        <Text
                            textColor={'black'}
                            fontWeight={'medium'}
                            fontSize={'sm'}>
                            Category and sub category
                        </Text>
                        <Menu closeOnSelect={false}>
                            <MenuButton as={Button} variant={'ghost'} fontSize={'md'} borderWidth={1} textTransform={'none'}
                                rightIcon={<CaretDoubleDown weight={'bold'} />}>
                                Choose category
                            </MenuButton>
                            <MenuList minWidth='240px' fontSize={'sm'}>
                                <MenuOptionGroup defaultValue={'bed'} title='Choose furniture type' type='radio'
                                    onChange={(e) => setProduct(prevProd => ({ ...prevProd, category: e }))}>
                                    <MenuItemOption value={'sofa'}>Sofa</MenuItemOption>
                                    <MenuItemOption value={'bed'}>Bed</MenuItemOption>
                                    <MenuItemOption value={'shoe-rack'}>Shoe Rack</MenuItemOption>
                                    <MenuItemOption value={'ward-robe'}>Ward Robe</MenuItemOption>
                                    <MenuItemOption value={'shelf'}>Shelf</MenuItemOption>
                                    <MenuItemOption value={'tv-console'}>TV Console</MenuItemOption>
                                    <MenuItemOption value={'table-and-chair'}>Table and chair</MenuItemOption>
                                </MenuOptionGroup>
                            </MenuList>
                        </Menu>
                        {errors.category &&
                            <Text
                                textColor={'red.500'}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                {errors.category}
                            </Text>
                        }
                    </VStack>

                    <VStack
                        alignItems={'start'}
                        marginTop={4}
                        spacing={'2px'}
                        width={'50%'}>
                        <Menu closeOnSelect={false}>
                            <MenuButton as={Button} fontSize={'md'} variant={'ghost'} borderWidth={1} textTransform={'none'}
                                rightIcon={<CaretDoubleDown weight={'bold'} />}>
                                Choose sub category
                            </MenuButton>
                            <MenuList minWidth='240px' fontSize={'sm'}>
                                <MenuOptionGroup title='Sub category' type='checkbox'
                                    onChange={(e) => setProduct(prevProd => ({ ...prevProd, subcategory: e }))}>
                                    <MenuItemOption value={'trending'}>Trending</MenuItemOption>
                                    <MenuItemOption value={'featured'}>Featured</MenuItemOption>
                                    <MenuItemOption value={'on sale'}>On Sale</MenuItemOption>
                                    <MenuItemOption value={'new arrival'}>New Arrival</MenuItemOption>
                                    <MenuItemOption value={'none'}>None</MenuItemOption>
                                </MenuOptionGroup>
                            </MenuList>
                        </Menu>
                        {errors.category &&
                            <Text
                                textColor={'red.500'}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                {errors.subcategory}
                            </Text>
                        }
                    </VStack>

                    <VStack
                        alignItems={'start'}
                        marginTop={4}
                        spacing={'2px'}
                        width={'50%'}>
                        <Text
                            textColor={'black'}
                            fontWeight={'medium'}
                            fontSize={'sm'}>
                            Color
                        </Text>

                        <Menu closeOnSelect={false}>
                            <MenuButton as={Button} fontSize={'md'} variant={'ghost'} borderWidth={1} textTransform={'none'}
                                rightIcon={<CaretDoubleDown weight={'bold'} />}>
                                Choose furniture color
                            </MenuButton>
                            <MenuList minWidth='240px' fontSize={'sm'}>
                                <MenuOptionGroup title='Color' type='checkbox'
                                    onChange={(e) => setProduct(prevProd => ({ ...prevProd, color: e }))}>
                                    <MenuItemOption value={'#FFFFFF'}
                                        icon={<Circle weight={'regular'} size={24} color={'black'} />}>White</MenuItemOption>
                                    <MenuItemOption value={'#902C3E'}
                                        icon={<Circle weight={'fill'} size={24} color={'#902C3E'} />}>Velvet</MenuItemOption>
                                    <MenuItemOption value={'#090909'}
                                        icon={<Circle weight={'fill'} size={24} color={'#090909'} />}>Matte Black</MenuItemOption>
                                    <MenuItemOption value={'#8B4513'}
                                        icon={<Circle weight={'fill'} size={24} color={'#8B4513'} />}>Brown</MenuItemOption>
                                </MenuOptionGroup>
                            </MenuList>
                        </Menu>
                        {errors.color &&
                            <Text
                                textColor={'red.500'}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                {errors.color}
                            </Text>
                        }
                    </VStack>

                    <VStack
                        alignItems={'start'}
                        marginTop={4}
                        spacing={3}
                        width={'full'}>
                        <Text
                            textColor={'black'}
                            fontWeight={'medium'}
                            fontSize={'sm'}>
                            Product images
                        </Text>

                        <Input
                            type={'file'}
                            name={'images'}
                            width={'50%'}
                            accept={'image/png, image/jpg'}
                            onChange={(e) => handleFileChange(e, 0)}
                        />
                        <Input
                            type={'file'}
                            name={'images'}
                            width={'50%'}
                            accept={'image/png, image/jpg'}
                            onChange={(e) => handleFileChange(e, 1)}
                        />
                        <Input
                            type={'file'}
                            name={'images'}
                            width={'50%'}
                            accept={'image/png, image/jpg'}
                            onChange={(e) => handleFileChange(e, 2)}
                        />
                        {errors.image &&
                            <Text
                                textColor={'red.500'}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                {errors.image}
                            </Text>
                        }
                    </VStack>

                    <VStack
                        alignItems={'start'}
                        marginTop={4}
                        spacing={2}
                        width={'full'}>
                        <Textarea
                            name={'desc'}
                            placeholder={'Product description'}
                            _placeholder={{ fontSize: 'sm' }}
                            focusBorderColor={'gold.500'}
                            _focus={{ transform: 'scale(1.01)' }}
                            onChange={handleFormChange} />
                        {errors.desc &&
                            <Text
                                textColor={'red.500'}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                {errors.desc}
                            </Text>
                        }
                    </VStack>
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
                            value={product.width}
                            focusBorderColor={'gold.500'}
                            _focus={{ transform: 'scale(1.01)' }}
                            size={'md'}
                            onChange={handleFormChange}
                        />

                        {errors.width &&
                            <Text
                                textColor={'red.500'}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                {errors.width}
                            </Text>
                        }
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
                            value={product.length}
                            focusBorderColor={'gold.500'}
                            _focus={{ transform: 'scale(1.01)' }}
                            size={'md'}
                            onChange={handleFormChange}
                        />

                        {errors.length &&
                            <Text
                                textColor={'red.500'}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                {errors.length}
                            </Text>
                        }
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
                            value={product.height}
                            focusBorderColor={'gold.500'}
                            _focus={{ transform: 'scale(1.01)' }}
                            size={'md'}
                            onChange={handleFormChange}
                        />

                        {errors.height &&
                            <Text
                                textColor={'red.500'}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                {errors.height}
                            </Text>
                        }
                    </VStack>

                </VStack>
            </Flex>

            <Button
                loadingText={'Uploading product...'}
                isLoading={isLoading}
                mt={10}
                width={'30%'}
                onClick={uploadProduct}>
                Upload
            </Button>
        </Flex>
    )
}

export const matchDispatchToProps = dispatch => {
    return {
        uploadNewProduct: (product, changeLoadState) => dispatch(addNewProduct(product, changeLoadState))
    }
}
export default connect(null, matchDispatchToProps)(UploadProduct)