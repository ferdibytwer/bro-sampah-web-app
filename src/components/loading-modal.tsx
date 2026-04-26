import { Modal, View, ActivityIndicator } from 'react-native';

interface LoadingModalProps {
  visible: boolean;
  Colors: {
    primary: string;
    background: string;
    [key: string]: string;
  };
}

export default function LoadingModal({ visible, Colors }: LoadingModalProps) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      statusBarTranslucent
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.45)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 90,
            height: 90,
            borderRadius: 16,
            backgroundColor: Colors.background,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 12,
          }}
        >
          <ActivityIndicator
            size="large"
            color={Colors.primary}
          />
        </View>
      </View>
    </Modal>
  );
}
