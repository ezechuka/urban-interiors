import { Box } from "@chakra-ui/react";
import Category from "../components/cat/Category";
import Featured from "../components/featured/Featured";
import Hero from "../components/hero/Hero";

export default function Home() {
  return (
    <Box>
      <Hero />
      <Category />
      <Featured />
    </Box>
  )
}
