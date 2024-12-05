
import { useRouter } from "expo-router"
import { Button, View, Text } from "react-native"

const index = () => {
    const router = useRouter()
    return (
     <View>
        <Button title="Main Page" onPress={() => router.push('mainpagev1')}></Button>
 
     </View>
    )
}

export default index