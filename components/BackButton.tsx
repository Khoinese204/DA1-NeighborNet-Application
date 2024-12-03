import { View, Text, Pressable} from 'react-native'
import React from 'react'
import Icon from '@/assets/icons'
import { Router } from 'expo-router'

type BackButton = {
  router: Router
}

const BackButton = ({router}: BackButton) => {
  return (
    <Pressable onPress={() => router.back()}>
      <Icon name='backButton' strokeWidth={2.5}></Icon>
    </Pressable>
  )
}

export default BackButton