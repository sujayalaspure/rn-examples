import {View, Text, FlatList, Dimensions} from "react-native"
import React from "react"
import Box from "@projects/maskedTabbar/components/Box"
import {TabType} from "@projects/maskedTabbar/data"

const {width} = Dimensions.get("window")

type Props = {
  bgColor: string
  label: string
}

const ListView = ({bgColor, label}: Props) => {
  const DATA = Array.from(Array(10).keys())
  return (
    <View
      style={{
        width,
        padding: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          style={{flex: 1}}
          data={DATA}
          renderItem={({item}) => <Box bgColor={bgColor} label={label} />}
          keyExtractor={(item) => item.toString()}
        />
      </View>
    </View>
  )
}

export default ListView
