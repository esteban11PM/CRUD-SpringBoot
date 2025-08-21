// src/components/SelectList.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export type SelectOption = { label: string; value: number };

export function SelectList({
    options,
    value,
    onChange,
    placeholder = "Selecciona una opción",
    maxVisible = 6, // si tienes muchas opciones, limita la altura
}: {
    options: SelectOption[];
    value: number | null;
    onChange: (v: number) => void;
    placeholder?: string;
    maxVisible?: number;
}) {
    // Filtrar opciones inválidas y garantizar keys únicas/estables
    const data = React.useMemo(
        () =>
            options
                .filter(o => o && o.label && o.value !== null && o.value !== undefined)
                .map(o => ({ ...o, key: String(o.value) })),
        [options]
    );

    // Si hay muchas opciones, recorta la altura del contenedor (permite scroll del form)
    const limitedHeight =
        data.length > maxVisible ? { maxHeight: maxVisible * 48 } : undefined;

    return (
        <View style={{ marginTop: 6 }}>
            <Text style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>
                {placeholder}
            </Text>

            <View style={[{ width: "100%" }, limitedHeight]}>
                {data.map((item) => {
                    const isSelected = value != null && value === item.value;
                    return (
                        <TouchableOpacity
                            key={item.key}
                            onPress={() => onChange(item.value)}
                            style={{
                                padding: 10,
                                borderWidth: 1,
                                borderColor: isSelected ? "#2563eb" : "#d1d5db",
                                borderRadius: 10,
                                marginBottom: 8,
                                backgroundColor: isSelected ? "#eff6ff" : "#fff",
                            }}
                        >
                            <Text style={{ color: "#111827" }}>{item.label}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}
