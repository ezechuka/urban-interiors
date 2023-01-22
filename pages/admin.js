import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import UploadProduct from "../components/upload/UploadProduct"

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Meta from "../components/meta/Meta";

const Admin = () => {
	return (
		<Flex
			width={'full'}
			minHeight={'60vh'}
			paddingX={12}
			paddingY={8}
			flexDirection={'column'}>
			<Meta title={'Admin | Fobath Woodwork'}/>
			<ToastContainer />

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