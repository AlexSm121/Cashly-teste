import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { themas } from "../theme/themes";

type Opcoes = {
  icone: keyof typeof MaterialIcons.glyphMap;
  label: string;
};

export default function ExpenseScreen({ icone, label }: Opcoes) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [number, setNumber] = useState("");
  const [value, setValue] = useState(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<Opcoes | null>(null);

  const opcoes: Opcoes[] = [
    { label: "Pix", icone: "currency-exchange" },
    { label: "Crédito", icone: "credit-card" },
    { label: "Débito", icone: "credit-card" },
    { label: "Dinheiro", icone: "money" },
  ];

  function activeOpcao(opcao: Opcoes) {
    setActive(opcao);
    setVisible(false);
  }

  const data = [
    { label: "Alimentação", value: 1 },
    { label: "Transporte", value: 2 },
    { label: "Assinatura", value: 3 },
    { label: "Pessoal", value: 4 },
    { label: "Saúde", value: 5 },
    { label: "Moradia", value: 6 },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.text1}> Nova </Text>
            <Text style={styles.text2}> Despesa </Text>
          </View>
        </View>
        <Text style={styles.text3}>Nome da Despesa</Text>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="Adicionar Nome"
        />
        <Text style={styles.text3}>Valor da Despesa</Text>
        <View style={styles.containerInput}>
          <Text style={styles.prefix}>R$</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNumber}
            value={number}
            placeholder="R$ 0,00"
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.text3}>Categoria</Text>
        <Dropdown
          data={data}
          labelField="label"
          valueField="value"
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          maxHeight={150}
          value={value}
          placeholder="Selecione a Categoria"
          containerStyle={styles.containerStyle}
          onChange={(item) => {
            setValue(item.value);
          }}
        />
        <Text style={styles.text3}>Método</Text>
        <View style={styles.modal}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: themas.colors.bgScreen,
  },
  container: {
    margin: 20,
  },
  header: {
    justifyContent: "center",
  },
  textContainer: {
    flexDirection: "row",
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
  },
  text1: {
    color: themas.colors.secundary,
    fontSize: 15,
    fontWeight: "400",
  },
  text2: {
    color: themas.colors.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  text3: {
    color: themas.colors.secundary,
    fontSize: 15,
    fontWeight: "600",
    paddingTop: 25,
  },
  input: {
    height: "50%",
    borderRadius: 13,
    padding: 10,
    marginTop: 12,
    backgroundColor: themas.colors.bgInputs,
    color: themas.colors.primary,
  },
  prefix: {
    fontSize: 16,
    marginRight: 5,
    color: "white",
  },
  text4: {
    color: themas.colors.primary,
    fontWeight: "400",
  },
  dropdown: {
    margin: 16,
    height: "8%",
    borderBottomWidth: 0.5,
    borderBottomColor: themas.colors.primary,
  },
  placeholderStyle: {
    fontSize: 16,
    color: themas.colors.primary,
    fontWeight: "600",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: themas.colors.primary,
  },
  containerStyle: {
    backgroundColor: themas.colors.bgInputs,
    borderRadius: 10,
    paddingVertical: 5,
  },
  modal: {
    backgroundColor: themas.colors.bgInputs,
    height: "15%",
    marginTop: 8,
    padding: 5,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});
