import { Button, Divider, Flex, HStack, Input, Menu, MenuGroup, MenuItem, MenuList, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react"
import UploadProduct from "../components/upload/UploadProduct"

const Admin = () => {
	return (
		<Flex
			width={'full'}
			minHeight={'60vh'}
			paddingX={12}
			paddingY={8}
			flexDirection={'column'}>

			<Text
				fontWeight={'bold'}
				fontSize={'xl'}
				textColor={'black'}
				mb={5}>
				Admin
			</Text>

			<Tabs variant='enclosed' isFitted>
				<TabList>
					<Tab>Upload Product</Tab>
					<Tab>View Products</Tab>
					<Tab>Orders</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<UploadProduct />
					</TabPanel>
					<TabPanel>
						<p>Two</p>
					</TabPanel>
				</TabPanels>
			</Tabs>

			{/* Side bar */}
			{/* <Flex
				flexDirection={'column'}
				flexGrow={2}>
				<Text
					fontWeight={'bold'}
					fontSize={'xl'}
					textColor={'black'}>
					Admin
				</Text>

				<Divider my={2} orientation={'horizontal'} height={'1'} />

				<VStack
					justifyContent={'start'}
					alignItems={'start'}
					spacing={3}>
					<Text
						fontWeight={'semibold'}
						fontSize={'xs'}
						textColor={'gray.500'}>
						Products
					</Text>

					<Button
						variant={'ghost'}
						textTransform={'none'}
						justifyContent={'start'}
						textColor={'black'}
						pl={4}
						borderWidth={1}
						width={'full'}>
						Upload product
					</Button>

					<Button
						variant={'ghost'}
						textTransform={'none'}
						justifyContent={'start'}
						textColor={'black'}
						pl={4}
						borderWidth={1}
						width={'full'}>
						View products
					</Button>
				</VStack>

				<VStack
					justifyContent={'start'}
					alignItems={'start'}
					spacing={3}
					mt={6}>
					<Text
						fontWeight={'semibold'}
						fontSize={'xs'}
						textColor={'gray.500'}>
						Orders
					</Text>

					<Button
						variant={'ghost'}
						textTransform={'none'}
						justifyContent={'start'}
						textColor={'black'}
						pl={4}
						borderWidth={1}
						width={'full'}>
						View orders
					</Button>
				</VStack>

			</Flex> */}

		</Flex>
	)
}

export default Admin