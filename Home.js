import React from 'react';
import { Text, View, Button, Alert, SectionList, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import {datasource} from "./Data";

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    opacityStyle: {
        padding: 10,
        borderBottomWidth: 1,
        backgroundColor: '#f0f8ff',
        borderWidth: 1,
    },
    textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'left',
    }
});

const Home = ({navigation}) => {

    const renderItem = ({item, index, section}) => {

        const heightInMeters = parseFloat(item.height) / 100;
        const bmi = (parseFloat(item.weight) / (heightInMeters * heightInMeters)).toFixed(2);

        return (
            <TouchableOpacity style = {styles.opacityStyle} onPress={() =>{navigation.navigate("Edit", {index: index, category: section.category, name: item.name, height: item.height, weight: item.weight})}}>
                <View>
                    <Text style = {[styles.textStyle, {fontFamily: 'ArialCustom' }]}>{item.name}</Text>
                    <Text>Height: {item.height} cm | Weight: {item.weight} kg | BMI: {bmi}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const checkStatistics = () => {
        let totalBMI = 0;
        let totalCount = 0;

        datasource.forEach((category) => {
            category.data.forEach((item) => {
                const heightInMeters = parseFloat(item.height) / 100;
                const bmi = parseFloat(item.weight) / (heightInMeters * heightInMeters);
                totalBMI += bmi;
                totalCount++;
            });
        });

        const averageBMI = (totalBMI / totalCount).toFixed(2);

        let bmiMessage = "";
        if (averageBMI < 18.5) {
            bmiMessage = "The people in average are underweight!";
        } else if (averageBMI >= 18.5 && averageBMI < 25) {
            bmiMessage = "The people in average are healthy!";
        } else if (averageBMI >= 25) {
            bmiMessage = "The people in average are overweight!";
        }

        Alert.alert("BMI Statistics", "Legend: " + "\n" +
            "- Underweight: Less than 18.5 " + "\n" +
            "- Healthy: 18.5 to less than 25" + "\n" +
            "- Overweight: More than 25" + "\n\n" +
            "Average BMI: " + averageBMI + "\n\n" +
            bmiMessage,
            [{ text: "OK" }]);
    };

    return (
        <View style={{flex: 1, margin: 10, paddingTop: 50}}>
            <View style={{flexDirection: 'row', justifyContent: "space-between" }}>
                <View style={{ flex: 1, marginRight: 10, borderWidth: 1, padding: 10}}>
                    <Button title='Add Person' onPress={() => {navigation.navigate("Add")}} color="blue" />
                </View>
                <View style={{ flex: 1, marginLeft: 10, borderWidth: 1, padding: 10}}>
                    <Button title='Check Statistics' onPress={checkStatistics} color="green" />
                </View>
            </View>
            <View style={{flex: 1, paddingBottom: 20}}>
                <StatusBar hidden={true}/>
                <SectionList
                    sections={datasource}
                    renderItem={renderItem}
                    renderSectionHeader={({ section: { category, bgColor, textColor } }) => (
                        <View style={[styles.sectionHeader, { backgroundColor: bgColor, marginTop: 20 }]}>
                            <Text style={[styles.headerText, { color: textColor }]}>{category}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

export default Home;
