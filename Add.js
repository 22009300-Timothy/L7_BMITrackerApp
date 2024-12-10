import React, {useState} from 'react';
import {datasource} from "./Data";
import {TextInput, View, Text, Button, Alert} from "react-native";

const Add = ({navigation}) => {
    const [name, setName] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState('');

    const calculateBmi = (height, weight) => {
        if (height && weight) {
            const heightInMeters = parseFloat(height) / 100;
            const calculatedBmi = parseFloat(weight) / (heightInMeters * heightInMeters);
            setBmi(calculatedBmi.toFixed(2));
        } else {
            setBmi(null);
        }
    };

    return (
        <View style={{padding: 10, flex: 1, justifyContent: 'center'}}>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Name:</Text>
                <TextInput
                    style={{ borderWidth: 1, height: 40, paddingHorizontal: 5 }}
                    onChangeText={(text) => setName(text.replace(/[0-9]/g, ''))}
                    value={name}
                />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Height (cm):</Text>
                <TextInput
                    style={{ borderWidth: 1, height: 40, paddingHorizontal: 5 }}
                    onChangeText={(text) => {
                        setHeight(text.replace(/[^0-9]/g, ''));
                        calculateBmi(text, weight);
                    }}
                    value={height}
                />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Weight (kg):</Text>
                <TextInput
                    style={{ borderWidth: 1, height: 40, paddingHorizontal: 5 }}
                    onChangeText={(text) => {
                        setWeight(text.replace(/[^0-9]/g, ''));
                        calculateBmi(height, text);
                    }}
                    value={weight}
                />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>BMI:</Text>
                <TextInput
                    style={{ borderWidth: 1, height: 40, paddingHorizontal: 5 }}
                    editable={false}
                    value={(function () {
                        let displayValue = "";
                        if (bmi !== null && !isNaN(bmi)) {
                            displayValue = bmi.toString();
                        } else {
                            displayValue = "";
                        }
                        return displayValue;
                    })()}
                />
            </View>

            <View style={{ marginTop: 20, borderWidth: 1, margin: 10 }}>
                <Button
                    title="SUBMIT"
                    color="blue"
                    onPress={() => {
                        if (!name || !height || !weight) {
                            Alert.alert("Error", "Please fill in all fields");
                            return;
                        }

                        const heightInMeters = parseFloat(height) / 100;
                        const bmi = parseFloat(weight) / (heightInMeters * heightInMeters);

                        let categoryNum = 2;
                        if (bmi < 18.5) {
                            categoryNum = 0;
                        } else if (bmi >= 18.5 && bmi < 25) {
                            categoryNum = 1;
                        }
                        let item = {
                            name: name,
                            height: height.toString(),
                            weight: weight.toString(),
                            bmi: bmi.toFixed(2),
                        };
                        datasource[categoryNum].data.push(item);
                        navigation.navigate("Home");
                    }}
                />
            </View>
        </View>
    );
};

export default Add;
