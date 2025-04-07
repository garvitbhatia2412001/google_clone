// import { BackHandler } from "react-native";
// import { EVENT_TYPES } from "src/constants/eventTypes";
// import { useAppNavigation } from "src/navigation/hooks";

// const useBackHandler = (handler: () => boolean) => {
//   const { onFocus } = useAppNavigation();

//   const handleBackPress = () => {
//     try {
//       return handler(); // Ensure it's always a boolean
//     } catch (error) {
//       console.error("Error handling back press:", error);
//       return true; // Default to preventing back action in case of error
//     }
//   };

//   const handleFocus = () => {
//     BackHandler.addEventListener(
//       EVENT_TYPES.HARDWARE_BACK_PRESS,
//       handleBackPress
//     );
//   };

//   const handleCleanup = () => {
//     BackHandler.removeEventListener(
//       EVENT_TYPES.HARDWARE_BACK_PRESS,
//       handleBackPress
//     );
//   };

//   onFocus(handleFocus, [handler], handleCleanup);
// };

// export default useBackHandler;
