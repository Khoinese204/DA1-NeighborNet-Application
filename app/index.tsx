
import { useRouter } from "expo-router"
import { Button, View, Text } from "react-native"

const index = () => {
    const router = useRouter()
    return (
     <View>
        <Button title="Newsfeed" onPress={() => router.push('create-post')}></Button>
 
     </View>
    )
}

export default index