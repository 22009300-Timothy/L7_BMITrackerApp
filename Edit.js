import React, { useState } from 'react';
import { TextInput, View, Text, Button, Alert } from "react-native";
import {datasource} from "./Data";

const Edit = ({ navigation, route }) => {
    const [name, setName] = useState(route.params.name);
    const [height, setHeight] = useState(route.params.height);
    const [weight, setWeight] = useState(route.params.weight);
    const [bmi, setBmi] = useState(((parseFloat(route.params.weight) / ((parseFloat(route.params.height) / 100) ** 2)) || 0).toFixed(2));

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
            
            <View style={{flexDirection: 'row', justifyContent: "space-between", marginTop: 20 }}>
                <View style={{ flex: 1, margin: 10}}>
                    <Button
                        title="SAVE"
                        color="blue"
                        onPress={() => {
                            const heightInMeters = parseFloat(height) / 100;
                            const updatedBMI = parseFloat(weight) / (heightInMeters * heightInMeters);

                            let newCategoryNum = 2;
                            if (updatedBMI < 18.5) {
                                newCategoryNum = 0;
                            } else if (updatedBMI >= 18.5 && updatedBMI < 25) {
                                newCategoryNum = 1;
                            }

                            let currentCategoryNum = 2;
                            if (route.params.category === 'UNDERWEIGHT') {
                                currentCategoryNum = 0;
                            } else if (route.params.category === 'HEALTHY') {
                                currentCategoryNum = 1;
                            }

                            const updatedItem = datasource[currentCategoryNum].data.splice(route.params.index, 1)[0];

                            updatedItem.name = name;
                            updatedItem.height = height.toString();
                            updatedItem.weight = weight.toString();

                            datasource[newCategoryNum].data.push(updatedItem);

                            navigation.navigate("Home");
                        }}
                    />
                </View>
                <View style={{ flex: 1, margin: 10}}>
                    <Button title="DELETE" color="red"
                            onPress={() => {
                                let categoryNum = 2;
                                if (route.params.category == 'UNDERWEIGHT') {
                                    categoryNum = 0;
                                } else if (route.params.category == 'HEALTHY') {
                                    categoryNum = 1;
                                }
                                Alert.alert("Are you sure?", '',
                                    [{text: 'Yes', onPress: () => {
                                            datasource[categoryNum].data.splice(route.params.index, 1);
                                            navigation.navigate("Home");
                                        }},
                                        {text: 'No'}])
                            }}
                    />
                </View>
            </View>
        </View>
    );
};

export default Edit;
