import { TouchableWithoutFeedback, Keyboard } from "react-native"

export const HideKeyboard = ({ children }: {children: React.ReactNode}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
  )