import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

interface CapturedImage {
  uri: string;
  name: string;
  type: string;
}

export default function OCRScanScreen() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState<CapturedImage | null>(null);
  const [cameraReady, setCameraReady] = useState(false);

  const handleCaptureFromGallery = async () => {
    try {
      console.log('[OCR_SCAN] User selected: Pick from gallery');
      setLoading(true);

      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('[OCR_SCAN] Permission denied for media library');
          Alert.alert('Yêu cầu cấp quyền', 'Vui lòng cho phép truy cập thư viện ảnh của bạn');
      }

      // Pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        console.log(`[OCR_SCAN] Image selected from gallery: ${asset.uri}`);

        const capturedData: CapturedImage = {
          uri: asset.uri,
          name: asset.fileName || 'receipt.jpg',
          type: asset.type || 'image/jpeg',
        };

        setCapturedImage(capturedData);
        console.log('[OCR_SCAN] Image ready for OCR processing');
      } else {
        console.log('[OCR_SCAN] User cancelled gallery selection');
      }
    } catch (error) {
      console.error('[OCR_SCAN] Error picking image:', error);
      Alert.alert('Lỗi', 'Không thể chọn ảnh từ thư viện');
    } finally {
      setLoading(false);
    }
  };

  const handleCaptureFromCamera = async () => {
    try {
      console.log('[OCR_SCAN] User selected: Take photo with camera');
      setLoading(true);

      // Request permission
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        console.log('[OCR_SCAN] Permission denied for camera');
          Alert.alert('Yêu cầu cấp quyền', 'Vui lòng cho phép truy cập camera của bạn');
      }

      // Take photo
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        console.log(`[OCR_SCAN] Photo taken: ${asset.uri}`);

        const capturedData: CapturedImage = {
          uri: asset.uri,
          name: `receipt_${Date.now()}.jpg`,
          type: asset.type || 'image/jpeg',
        };

        setCapturedImage(capturedData);
        console.log('[OCR_SCAN] Photo ready for OCR processing');
      } else {
        console.log('[OCR_SCAN] User cancelled camera capture');
      }
    } catch (error) {
      console.error('[OCR_SCAN] Error capturing photo:', error);
      Alert.alert('Lỗi', 'Không thể chụp ảnh');
    } finally {
      setLoading(false);
    }
  };

  const handleProcessImage = () => {
    if (!capturedImage) {
      Alert.alert('Lỗi', 'Chưa chọn ảnh');
      return;
    }

    console.log('[OCR_SCAN] Starting OCR processing for image:', capturedImage.uri);
    console.log('[OCR_SCAN] Navigating to OCRResultScreen');

    // Navigate to OCR Result Screen with captured image
    navigation.navigate('OCRResult', {
      image: capturedImage,
    });

    // Reset for next capture
    setCapturedImage(null);
  };

  const handleCancel = () => {
    console.log('[OCR_SCAN] User cancelled OCR flow');
    if (capturedImage) {
      setCapturedImage(null);
      return;
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1">
        {/* Header */}
        <View className="bg-white border-b border-gray-200 px-4 py-4 flex-row items-center justify-between">
          <TouchableOpacity onPress={handleCancel}>
            <Text className="text-blue-500 font-semibold">← Quay lại</Text>
          </TouchableOpacity>
          <Text className="text-lg font-bold text-text">Quét hóa đơn</Text>
          <View className="w-12" />
        </View>

        {/* Main Content */}
        <View className="flex-1 justify-center items-center px-4">
          {!capturedImage ? (
            <>
              {/* Scanning Guide */}
              <View className="mb-8 items-center">
                <View className="w-32 h-32 rounded-2xl bg-gray-100 items-center justify-center mb-6">
                  <Text className="text-5xl">📷</Text>
                </View>
                <Text className="text-2xl font-bold text-text mb-2">Chụp hóa đơn</Text>
                <Text className="text-gray-600 text-center text-base">
                  Chụp ảnh hóa đơn của bạn hoặc nhập từ thư viện
                </Text>
              </View>

              {/* Action Buttons */}
              <View className="w-full gap-4 mb-6">
                <TouchableOpacity
                  onPress={handleCaptureFromCamera}
                  disabled={loading}
                  className="bg-primary rounded-xl py-4 items-center"
                >
                  {loading ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <>
                      <Text className="text-3xl mb-2">📸</Text>
                      <Text className="text-white font-semibold">Chụp ảnh</Text>
                    </>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleCaptureFromGallery}
                  disabled={loading}
                  className="bg-secondary rounded-xl py-4 items-center border-2 border-primary"
                >
                  {loading ? (
                    <ActivityIndicator color="#4F46E5" size="small" />
                  ) : (
                    <>
                      <Text className="text-3xl mb-2">🖼️</Text>
                      <Text className="text-primary font-semibold">Chọn từ thư viện</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>

              {/* Tips */}
              <View className="bg-blue-50 rounded-xl p-4 w-full border border-blue-200">
                <Text className="text-sm font-semibold text-blue-900 mb-2">💡 Mẹo để kết quả tốt nhất:</Text>
                <Text className="text-xs text-blue-800 mb-1">• Đảm bảo hóa đơn được chiếu sáng tốt</Text>
                <Text className="text-xs text-blue-800 mb-1">• Đặt hóa đơn phẳng trên bề mặt</Text>
                <Text className="text-xs text-blue-800">• Chụp toàn bộ hóa đơn bao gồm cả tổng cộng</Text>
              </View>
            </>
          ) : (
            <>
              {/* Captured Image Preview */}
              <View className="mb-6 items-center">
                <View className="w-64 h-80 rounded-xl overflow-hidden border-2 border-gray-300 mb-4">
                  <Image
                    source={{ uri: capturedImage.uri }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                <Text className="text-gray-600 text-sm mb-4">Ảnh được chụp thành công</Text>
              </View>

              {/* Processing Buttons */}
              <View className="w-full gap-3">
                <TouchableOpacity
                  onPress={handleProcessImage}
                  className="bg-primary rounded-xl py-4 items-center"
                >
                  <Text className="text-white font-semibold text-base">Xử lý hóa đơn 🔄</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setCapturedImage(null)}
                  className="bg-gray-200 rounded-xl py-4 items-center"
                >
                  <Text className="text-text font-semibold">Chụp lại</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
