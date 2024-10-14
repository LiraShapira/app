import { Text, View,StyleSheet } from 'react-native';

interface StepsHeaderProps {
  steps: {
    label: string;
    current: boolean;
    completed: boolean;
  }[];
}


const StepsHeader = ({ steps }: StepsHeaderProps) => {


  return (
    <View style={styles.container}>
      {steps.map((s, index) => (
        <View key={index} style={{ margin: 5 }}>
          {s.current ? (
            <Text style={{ color: 'green' , fontSize:30}}>{s.label}</Text>
          ) : (
            <Text>{s.label}</Text>
          )}
        </View>
      ))}
      
    </View>
  );
};

export default StepsHeader;

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'lightblue',
    }
})