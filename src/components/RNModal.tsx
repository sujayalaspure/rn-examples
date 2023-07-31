import { View, Text, Modal, SafeAreaView, ModalProps } from 'react-native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

type Props = {
  children?: any;
};

type RNModalProps = {
  open: (node: any, config: object) => void;
  close: () => void;
} & ModalProps;

export const RNModalRef = React.createRef<RNModalProps>();

const RNModal = forwardRef((props: Props, ref: any) => {
  const [visible, setVisible] = useState(false);
  const [RNNode, setRNNode] = useState(() => () => null);
  useImperativeHandle(ref, () => ({
    open: (node: any, config: any) => {
      ref.current = { ...ref.current, ...config };
      setRNNode(() => node);
      setVisible(true);
    },
    close: () => {
      console.log('close');
      setVisible(false);
    },
  }));

  return (
    <Modal ref={ref} {...ref.current} visible={visible} animationType="fade" onRequestClose={() => setVisible(false)}>
      <SafeAreaView>
        <View>
          <Text>Modal</Text>
        </View>
        {RNNode()}
      </SafeAreaView>
    </Modal>
  );
});

export default RNModal;
