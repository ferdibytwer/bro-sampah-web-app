import React, { useState } from 'react';
import { View, Text, TextInput, Platform, TextInputProps, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  required: {
    fontSize: 14,
    fontWeight: '600',
    color: 'red',
    marginLeft: 2,
  },
  input: {
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 0,
  },
});



interface BaseInputProps extends TextInputProps {
  label: string;
  required?: boolean;
  focused: boolean;
  errorMsg?: string | null;
  Colors: {
    text: string;
    primary: string;
    error: string;
    muted: string;
  };
}

export const BaseTextInput: React.FC<BaseInputProps> = ({
  label,
  required,
  focused,
  errorMsg,
  Colors,
  style,
  ...props
}) => {
  const borderColor = !!errorMsg
    ? (Colors.error ?? 'red')
    : focused
    ? Colors.primary
    : Colors.muted;

  return (
    <View style={{ gap: 4 }}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.label, { color: Colors.text }]}>
          {label}
        </Text>
        {required && <Text style={styles.required}>*</Text>}
      </View>

        <TextInput
          {...props}
          placeholderTextColor={Colors.muted}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          style={[
            styles.input,
            { color: Colors.text, borderBottomColor: borderColor, borderBottomWidth: 1.5  },
            Platform.OS === 'web' && ({ outlineStyle: 'none' } as any),
            style,
          ]}
        />

      {!!errorMsg && (
        <Text
          style={{
            color: Colors.error ?? 'red',
            fontSize: 12,
            marginTop: 2,
          }}
        >
          {errorMsg}
        </Text>
      )}
    </View>
  );
};

export const PasswordTextInput: React.FC<BaseInputProps> = (props) => {
  const [secure, setSecure] = useState(true);

  return (
    <View style={{ position: 'relative' }}>
      <BaseTextInput
        {...props}
        secureTextEntry={secure}
      />

      <TouchableOpacity
        onPress={() => setSecure(!secure)}
        style={{
          position: 'absolute',
          right: 0,
          top: 25, 
          padding: 4,
        }}
      >
        <Ionicons
          name={secure ? 'eye-off-outline' : 'eye-outline'}
          size={20}
          color= {Colors.muted}
        />
      </TouchableOpacity>
    </View>
  );
};
