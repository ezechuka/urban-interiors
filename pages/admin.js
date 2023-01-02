import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
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

		</Flex>
	)
}

export default Admin