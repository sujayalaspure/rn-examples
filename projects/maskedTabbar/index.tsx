import {View, FlatList} from "react-native"
import React, {useRef, useState} from "react"
import ListView from "@projects/maskedTabbar/components/ListView"
import TabsViews from "@projects/maskedTabbar/components/TabsViews"
import {useSharedValue} from "react-native-reanimated"
import {TABS} from "@projects/maskedTabbar/data"

const MaskedTabbar = () => {
  const slideRef = useRef<FlatList>(null)
  const [scrollX, setScrollX] = useState(0)
  const currentIndex = useSharedValue(0)

  const scrollTo = (i: number) => {
    currentIndex.value = i
    slideRef.current?.scrollToIndex({index: i})
  }

  return (
    <View style={{flex: 1}}>
      <TabsViews onPress={scrollTo} scrollX={scrollX} />
      <FlatList
        ref={slideRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={TABS}
        renderItem={({item}) => <ListView bgColor={item.color} label={item.label} />}
        keyExtractor={(_, index) => index.toString()}
        pagingEnabled
        bounces={false}
        scrollEventThrottle={16}
        onScroll={(e) => {
          setScrollX(e.nativeEvent.contentOffset.x)
        }}
      />
      <View style={{height: 50, borderWidth: 1}} />
    </View>
  )
}

export default MaskedTabbar
