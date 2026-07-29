import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

export default function App() {
  const skills = ['قدرت', 'سرعت', 'استقامت', 'پرش', 'تکنیک', 'تاکتیک'];

  const [currentData, setCurrentData] = useState({
    قدرت: 5,
    سرعت: 5,
    استقامت: 5,
    پرش: 5,
    تکنیک: 5,
    تاکتیک: 5,
  });

  const [history, setHistory] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // بارگذاری داده‌ها
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const saved = await AsyncStorage.getItem('volleyballData');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (error) {
      console.error('خطا در بارگذاری:', error);
    }
  };

  // ذخیره‌ی داده‌ها
  const saveData = async () => {
    try {
      const newEntry = {
        date,
        ...currentData,
        average: Math.round(
          (Object.values(currentData).reduce((a, b) => a + b) / 6) * 10
        ) / 10,
      };

      const updated = [...history, newEntry];
      setHistory(updated);
      await AsyncStorage.setItem('volleyballData', JSON.stringify(updated));
      Alert.alert('✅ موفق', 'داده‌های امروز ذخیره شد!');
      setDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      Alert.alert('❌ خطا', 'مشکل در ذخیره‌ی داده‌ها');
    }
  };

  const average = Math.round(
    (Object.values(currentData).reduce((a, b) => a + b) / 6) * 10
  ) / 10;

  const chartData = {
    labels: history.slice(-7).map((h) => h.date.slice(5)),
    datasets: [
      {
        data: history.slice(-7).map((h) => h.average),
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* هدر */}
      <View style={styles.header}>
        <Text style={styles.title}>📊 ردیاب والیبال</Text>
        <Text style={styles.subtitle}>اطلاعات خودت رو وارد کن و پیشرفتت رو ببین</Text>
      </View>

      {/* ورودی تاریخ */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>تاریخ</Text>
        <TextInput
          style={styles.dateInput}
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
        />
      </View>

      {/* ورودی مهارت‌ها */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>مهارت‌های امروز</Text>

        {skills.map((skill) => (
          <View key={skill} style={styles.skillCard}>
            <Text style={styles.skillLabel}>{skill}</Text>
            <View style={styles.sliderContainer}>
              <Text style={styles.valueText}>{currentData[skill]}/10</Text>
            </View>
            <View style={styles.buttonGroup}>
              {[...Array(11)].map((_, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.numberBtn,
                    currentData[skill] === idx && styles.activeBtnNumber,
                  ]}
                  onPress={() =>
                    setCurrentData({ ...currentData, [skill]: idx })
                  }
                >
                  <Text
                    style={[
                      styles.numberBtnText,
                      currentData[skill] === idx && styles.activeBtnTextNumber,
                    ]}
                  >
                    {idx}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* نمایش میانگین */}
      <View style={styles.averageCard}>
        <Text style={styles.averageLabel}>میانگین کلی</Text>
        <Text style={styles.averageValue}>{average}/10</Text>
      </View>

      {/* دکمه ذخیره */}
      <TouchableOpacity style={styles.saveBtn} onPress={saveData}>
        <Text style={styles.saveBtnText}>💾 ذخیره‌ی امروز</Text>
      </TouchableOpacity>

      {/* نمودار */}
      {history.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📈 پیشرفت</Text>
          <LineChart
            data={chartData}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: () => '#667eea',
              strokeWidth: 2,
              propsForDots: {
                r: '5',
                strokeWidth: '2',
                stroke: '#667eea',
              },
            }}
            bezier
            style={styles.chart}
          />

          {/* جدول تاریخچه */}
          <Text style={styles.historyTitle}>تاریخچه‌ی ورودی‌ها</Text>
          {history.slice().reverse().map((entry, idx) => (
            <View key={idx} style={styles.historyItem}>
              <Text style={styles.historyDate}>{entry.date}</Text>
              <View style={styles.historyValues}>
                <Text style={styles.historySkill}>قدرت: {entry.قدرت}</Text>
                <Text style={styles.historySkill}>سرعت: {entry.سرعت}</Text>
                <Text style={styles.historySkill}>استقامت: {entry.استقامت}</Text>
                <Text style={styles.historySkill}>پرش: {entry.پرش}</Text>
                <Text style={styles.historySkill}>تکنیک: {entry.تکنیک}</Text>
                <Text style={styles.historySkill}>تاکتیک: {entry.تاکتیک}</Text>
              </View>
              <Text style={styles.historyAverage}>میانگین: {entry.average}</Text>
            </View>
          ))}
        </View>
      )}

      {/* دکمه پاک کردن */}
      {history.length > 0 && (
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => {
            Alert.alert(
              'هشدار',
              'آیا از پاک کردن همه‌ی داده‌ها مطمئن‌ی؟',
              [
                { text: 'لغو', style: 'cancel' },
                {
                  text: 'پاک کردن',
                  style: 'destructive',
                  onPress: async () => {
                    setHistory([]);
                    await AsyncStorage.removeItem('volleyballData');
                  },
                },
              ]
            );
          }}
        >
          <Text style={styles.deleteBtnText}>🗑️ پاک کردن همه‌ی داده‌ها</Text>
        </TouchableOpacity>
      )}

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#667eea',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#eee',
  },
  section: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 15,
    textAlign: 'right',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlign: 'right',
  },
  skillCard: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  skillLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
    marginBottom: 10,
    textAlign: 'right',
  },
  sliderContainer: {
    marginBottom: 10,
  },
  valueText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#667eea',
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  numberBtn: {
    width: '9%',
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  activeBtnNumber: {
    backgroundColor: '#667eea',
  },
  numberBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  activeBtnTextNumber: {
    color: '#fff',
  },
  averageCard: {
    backgroundColor: '#f0f4ff',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  averageLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  averageValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#667eea',
  },
  saveBtn: {
    backgroundColor: '#667eea',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  chart: {
    marginVertical: 10,
    borderRadius: 10,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'right',
  },
  historyItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderRightWidth: 3,
    borderRightColor: '#82ca9d',
  },
  historyDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 8,
    textAlign: 'right',
  },
  historyValues: {
    marginBottom: 8,
  },
  historySkill: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
    textAlign: 'right',
  },
  historyAverage: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#82ca9d',
    textAlign: 'right',
  },
  deleteBtn: {
    backgroundColor: '#ff6b6b',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  spacer: {
    height: 20,
  },
});

