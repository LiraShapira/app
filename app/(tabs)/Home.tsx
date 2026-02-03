import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import TransactionsList from '../../components/transactions/TransactionsList';
import Dashboard from '../../components/home/Dashboard';
import i18n from '../../translationService';
import { selectUser } from '../../store/userSlice';
import { useAppSelector } from '../../hooks';
import GradientContainer from '../../components/utils/GradientContainer';
import RequestCard from '../../components/requests/RequestCard';
import { User } from '../../types/User';
import { useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import { useState, useEffect } from 'react';
import { fetchVerificationMessage } from '../../API/verificationMessageAPI';

export default function Home() {
  const user = useAppSelector<User>(selectUser);
  const colorScheme = useColorScheme();
  const [verifyMessageInfo, setVerifyMessageInfo] = useState<string>('');
  const [isLoadingMessage, setIsLoadingMessage] = useState<boolean>(true);
  
  // Diagnostics: log the user object and transactions (on tab load)
  console.log('Home.tsx - user object:', user);

  useEffect(() => {
    const loadVerificationMessage = async () => {
      try {
        setIsLoadingMessage(true);
        const response = await fetchVerificationMessage(user.communityId);
        if ('data' in response && response.data) {
          setVerifyMessageInfo(response.data.message);
        } else {
          // Fallback to default message if API fails
          setVerifyMessageInfo(`חברי קהילה יקרים, 
ברוכים הבאים לאפליקצית לירה שפירא! 
על מנת להפעיל את חשבונכם יש ליצור קשר עם אחד מאנשי הקהילה לשיחת הכירות.`);
        }
      } catch (error) {
        console.error('Error fetching verification message:', error);
        // Fallback to default message on error
        setVerifyMessageInfo(`חברי קהילה יקרים, 
ברוכים הבאים לאפליקצית לירה שפירא! 
על מנת להפעיל את חשבונכם יש ליצור קשר עם אחד מאנשי הקהילה לשיחת הכירות.`);
      } finally {
        setIsLoadingMessage(false);
      }
    };

    // Only fetch if user is not verified
    if (user.isVerified !== true) {
      loadVerificationMessage();
    }
  }, [user.isVerified, user.communityId]);

  // Check if user is banned
  if (user.isBanned === true) {
    return (
      <View style={[styles.container, styles.messageContainer]}>
        <Text style={[styles.messageText, { color: Colors[colorScheme ?? 'light'].text }]}>
          This account is banned.
        </Text>
      </View>
    );
  }

  // Check if user is not verified (isVerified is false or null)
  if (user.isVerified !== true) {
    return (
      <View style={[styles.container, styles.messageContainer]}>
        {isLoadingMessage ? (
          <Text style={[styles.messageText, { color: Colors[colorScheme ?? 'light'].text }]}>
            Loading...
          </Text>
        ) : (
          <Text style={[styles.messageText, { color: Colors[colorScheme ?? 'light'].text }]}>
            {verifyMessageInfo}
          </Text>
        )}
      </View>
    );
  }

  // User is verified and not banned - show normal dashboard
  return (
    <View style={styles.container}>
      <GradientContainer styles={{ height: 'auto' }}>
        <Dashboard />
      </GradientContainer>

      <View
        style={{
          paddingTop: 75,
          paddingBottom: 10,
          zIndex: 0,
          width: '100%',
          position: 'relative',
          height: 'auto',
        }}
      >
        <RequestCard />
      </View>
      <Text style={{ fontSize: 40 }}>{i18n.t('home_transactions_title')}</Text>
      <ScrollView style={{ width: '100%' }}>
        <TransactionsList currentUser={user} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  messageContainer: {
    justifyContent: 'center',
    padding: 20,
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
  },
  dashboardContainer: {
    width: '100%',
  },
  icon: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: 'grey',
    borderRadius: 50,
    fontSize: 40,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
