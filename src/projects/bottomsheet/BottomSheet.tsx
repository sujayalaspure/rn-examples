import { View, StyleSheet, Dimensions } from 'react-native';
import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

type BottomSheetProps = {
  onTopReached?: (value: boolean) => void;
  children: any;
};
export type BottomSheetRef = {
  scrollTo: (y: number) => void;
  isActive: () => boolean;
};
let oldTop: boolean;
let newTop: boolean;

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(({ children, onTopReached }, ref) => {
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const isSheetVisible = useSharedValue(false);

  const scrollTo = useCallback((y: number) => {
    'worklet';

    isSheetVisible.value = y !== 0;
    translateY.value = withSpring(y, { damping: 15 });
  }, []);

  const isActive = useCallback(() => isSheetVisible.value, []);
  const isAtTop = useCallback(() => translateY.value === MAX_TRANSLATE_Y, []);

  useImperativeHandle(ref, () => ({ scrollTo, isActive, isAtTop }), [scrollTo, isActive, isAtTop]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate(({ translationY }: any) => {
      translateY.value = (translationY as number) + context.value.y;
      translateY.value = Math.max(MAX_TRANSLATE_Y, translateY.value);
      if (onTopReached) {
        newTop = translateY.value === MAX_TRANSLATE_Y;
        if (oldTop !== newTop) {
          oldTop = newTop;
          runOnJS(onTopReached)(newTop);
        }
      }
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 3) {
        scrollTo(0);
      } else if (translateY.value < -SCREEN_HEIGHT / 1.2) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP
    );
    const height = interpolate(translateY.value, [0, MAX_TRANSLATE_Y], [0, -MAX_TRANSLATE_Y], Extrapolate.CLAMP);
    return {
      transform: [{ translateY: translateY.value }],
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      height
    };
  });

  const rBackDropStyle = useAnimatedStyle(() => ({ opacity: isSheetVisible.value ? 1 : 0 }));
  const rBackdropProps = useAnimatedProps(() => ({ pointerEvents: isSheetVisible.value ? 'auto' : 'none' } as any));

  return (
    <>
      <Animated.View
        onTouchStart={() => {
          scrollTo(0);
        }}
        animatedProps={rBackdropProps}
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.5)'
          },
          rBackDropStyle
        ]}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, rBottomSheetStyle]}>
          <View style={styles.topBar}>
            <View style={styles.line} />
          </View>
          {children}
        </Animated.View>
      </GestureDetector>
    </>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    height: 500,
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    overflow: 'hidden'
  },
  line: {
    height: 5,
    width: 50,
    backgroundColor: '#ccc',
    borderRadius: 5
  },
  topBar: {
    height: 40,
    width: '100%',
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
