import {View, StyleSheet} from "react-native"
import React, {useState} from "react"
import Switch from "@components/Switch"
import Slider from "@components/Slider"
import SliderView from "@projects/carousalSlider/SliderView"
import ControlSection from "@components/control"


const data = [
  {
    title: "Explore Nature",
    description: "Discover the beauty of nature with breathtaking landscapes and stunning views.",
    image: "image",
    color: "#f72585",
  },
  {
    title: "Adventure Awaits",
    description: "Embark on thrilling adventures and create unforgettable memories.",
    image: "image",
    color: "#4361ee",
  },
  {
    title: "Relax and Unwind",
    description: "Indulge in relaxation and find inner peace in serene and tranquil environments.",
    image: "image",
    color: "#4cc9f0",
  },
]

const CarousalSlider = () => {
  const [controlConfig, setControlConfig] = useState({
    pagingEnabled: true,
    disablePagingInteraction: false,
    titleScrollSpeed: 20,
    paginSpacing: 10,
  })

  return (
    <View>

      {/* Main Slider Component */}
      <SliderView
        data={data}
        showPagingIndicator={controlConfig.pagingEnabled}
        disablePagingInteraction={controlConfig.disablePagingInteraction}
        titleScrollSpeed={controlConfig.titleScrollSpeed}
        paginSpacing={controlConfig.paginSpacing}
      />

      {/* Controls */}
      <View style={styles.controlWrapper}>
        <ControlSection>
          <Switch
            label="Paging Enabled"
            value={controlConfig.pagingEnabled}
            onValueChange={(value) => setControlConfig({...controlConfig, pagingEnabled: value})}
          />
          <Switch
            label="Disable Paging Interaction"
            value={controlConfig.disablePagingInteraction}
            onValueChange={(value) => setControlConfig({...controlConfig, disablePagingInteraction: value})}
          />
        </ControlSection>
        <ControlSection>
          <Slider
            label={`Title Scroll Speed (${controlConfig.titleScrollSpeed})`}
            value={controlConfig.titleScrollSpeed}
            onValueChange={(value) => setControlConfig({...controlConfig, titleScrollSpeed: value})}
          />
          <Slider
            label={`Paging Spacing (${controlConfig.paginSpacing})`}
            value={controlConfig.paginSpacing}
            onValueChange={(value) => setControlConfig({...controlConfig, paginSpacing: value})}
          />
        </ControlSection>
      </View>
    </View>
  )
}

export default CarousalSlider

const styles = StyleSheet.create({
  container: {},
  controlWrapper: {},
})
