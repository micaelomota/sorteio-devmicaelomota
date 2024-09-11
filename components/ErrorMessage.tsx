import { Text } from "@rneui/themed";

export const ErrorMessage = ({ error }: { error?: string }) => {
  if (error) {
    return <Text style={{ color: "red", fontSize: 12 }}>{error}</Text>;
  }

  return null;
};
