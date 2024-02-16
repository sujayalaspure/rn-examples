import {FlatList, View} from "react-native"
import React, {useCallback, useRef, useState} from "react"
import PagingIndicator from "@projects/carousalSlider/component/PagingIndicator"
import Preview from "@projects/carousalSlider/component/Preview"
import {useSharedValue} from "react-native-reanimated"

type Props = {
  data: any[]
  showPagingIndicator?: boolean
  disablePagingInteraction?: boolean
  titleScrollSpeed?: number
  paginSpacing?: number
}

const SliderView = ({
  data,
  showPagingIndicator = true,
  disablePagingInteraction = false,
  titleScrollSpeed = 0,
  paginSpacing = 10,
}: Props) => {
  const slideRef = useRef<FlatList>(null)
  const scrollX = useSharedValue(0)
  const [scrollX2, setScrollX2] = useState(0)

  const [activeIndex, setActiveIndex] = useState(0)

  const onViewableItemsChanged = React.useRef(({viewableItems}: any) => {
    // console.log(viewableItems)
    setActiveIndex(viewableItems[0].index)
  }).current

  const scrollTo = useCallback(
    (i: number) => {
      if (disablePagingInteraction) return
      setActiveIndex(i)
      slideRef.current?.scrollToIndex({index: i})
    },
    [disablePagingInteraction]
  )
  return (
    <>
      <FlatList
        onScroll={(e) => {
          scrollX.value = e.nativeEvent.contentOffset.x
          setScrollX2(e.nativeEvent.contentOffset.x)
        }}
        scrollEventThrottle={16}
        ref={slideRef}
        pagingEnabled
        bounces={false}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => (
          <Preview item={item} scrollX={scrollX2} index={index} titleScrollSpeed={titleScrollSpeed} />
        )}
        keyExtractor={(_, index) => index.toString()}
        onViewableItemsChanged={onViewableItemsChanged}
      />

      {showPagingIndicator && (
        <View style={{marginTop: paginSpacing}}>
          <PagingIndicator activeIndex={activeIndex} count={data.length} onChange={scrollTo} />
        </View>
      )}
    </>
  )
}

export default SliderView
